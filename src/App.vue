<template>
  <div class="container column" >
    <form class="card card-w30" @submit.prevent="submit()">
      <div class="form-control">
        <label for="type">Тип блока</label>
        <select id="type" v-model="selected">
          <option value="Title">Заголовок</option>
          <option value="Subtitle">Подзаголовок</option>
          <option value="Avatar">Аватар</option>
          <option value="Text">Текст</option>
        </select>
      </div>
      <div class="form-control">
        <label for="value">Значение</label>
        <textarea id="value" rows="3" v-model.trim="valueTextArea"></textarea>
      </div>
      <button class="btn primary" :disabled="valueTextArea.length < 4" @click="BlockAdd()">Добавить</button>
    </form>

    <div class="card card-w70"  :style="{background: loading === true ? '#2c3e50' : '' }">   

      <component 
      v-for="item in myBlockList"
      :key="item.id"
      :item="item"
      :is="'app-' + item.select"      
      @delete = "removeBlockApp"
      ></component>

    <div class="loader" v-if="loading"></div>
    <h3 v-if="myBlockList.length === 0"> Добавьте первый блок, чтобы начать создавать резюме </h3>
    </div>
  </div>

  <div class="container">
    <p>
      <button class="btn primary" @click="loadComments()" v-if="myComments.length === 0">Загрузить комментарии</button>
      <button class="btn danger" @click="clearComments()" v-if="myComments.length > 0">Закрыть комментарии</button>
    </p>
    <div class="card" v-if="myComments.length > 0">
      <h2>Комментарии</h2>
      <ul class="list">
        
    <component
    v-for="item in myComments"
    :key="item.id"
    :item="item"
    :is="'AppComments'"
    ></component>

      </ul>
    </div>
    <div class="loader" v-if="loading"></div>
  </div>

</template>

<script>
import AppTitle from './components/AppTitle.vue'
import AppAvatar from './components/AppAvatar.vue'
import AppSubtitle from './components/AppSubtitle.vue'
import AppText from './components/AppText.vue'
import AppComments from './components/AppComments.vue'
import axios from 'axios'

export default {
  data(){
    return{
      valueTextArea: '',
      selected: 'Title',
      myBlockList:[],
      myBlockItems: [],
      myComments:[],
      loading: false,
    }
  },
  methods: {

    BlockAdd(){
      this.myBlockItems.select = this.selected
      this.myBlockItems.value = this.valueTextArea
      this.myBlockList.push(this.myBlockItems)
      setTimeout(() => {this.loadBlocks()}, 1500)
    },

    async submit(){
      const response = await fetch('https://my-resume-0230-default-rtdb.firebaseio.com/myBlockItems.json',{
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          select: this.myBlockItems.select,
          value: this.myBlockItems.value,
        })
      })
      const firebaseData = await response.json()
      console.log(firebaseData)
      this.valueTextArea = ""
    },

    async loadBlocks(){
      if(this.myBlockList.length === 0){
        this.loading = true
      }
      try{
      const {data} = await axios.get('https://my-resume-0230-default-rtdb.firebaseio.com/myBlockItems.json')
      this.myBlockList = Object.keys(data).map(key=>{
        return{
          id: key,
          ...data[key]
        }
      })
      this.loading = false
    } catch(e){
      this.loading = false
      console.log(" У нас ошибка: " + e.message + " т.е. нет данных на сервере")
    }
    },

   async removeBlockApp(id){    
    await axios.delete(`https://my-resume-0230-default-rtdb.firebaseio.com/myBlockItems/${id}.json`)
    this.myBlockList = this.myBlockList.filter(item => item.id !== id)
    },

    async loadComments(){   
      const {data} = await axios.get('https://jsonplaceholder.typicode.com/comments?_limit=42')
      this.myComments = Object.keys(data).map(key=>{
        return{
          id: key,
          ...data[key]
        }
      })
      console.log(this.myComments) 
    },

    clearComments(){
      this.myComments = []
    },

  },

  components:{AppTitle,AppAvatar, AppSubtitle, AppText, AppComments},

  mounted(){
    this.loadBlocks()
  },

}
</script>

<style>

  .flex{
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .btnDelete {
    border-radius: 15px;
    color: white;
    background: red;
    margin-left: 1rem;
  }

  .avatar {
    display: flex;
    justify-content: center;
  }

  .avatar img {
    width: 150px;
    height: auto;
    border-radius: 50%;
  }
</style>
