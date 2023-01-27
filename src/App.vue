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
  @delete="removeBlockApp"
  ></component>

  <div class="loader" v-if="loading"></div>
  <h3 v-if="myBlockList.length === 0"> Добавьте первый блок, чтобы начать создавать резюме </h3>
  </div>
  </div>

  <AppCommentsList
  :myComments="myComments"
  :loading="loading"
  @openComments="loadComments"
  @closeComments="clearComments"
  ></AppCommentsList>

</template>

<script>
import AppTitle from './components/AppTitle.vue'
import AppAvatar from './components/AppAvatar.vue'
import AppSubtitle from './components/AppSubtitle.vue'
import AppText from './components/AppText.vue'
import AppCommentsList from './components/AppCommentsList.vue'
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
  components:{AppTitle,AppAvatar, AppSubtitle, AppText, AppCommentsList},

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
  
.loader {
    font-size: 10px;
    margin: 50px auto;
    text-indent: -9999em;
    width: 11em;
    height: 11em;
    border-radius: 50%;
    background: #ffffff;
    background: -moz-linear-gradient(left, #ffffff 10%, rgba(255, 255, 255, 0) 42%);
    background: -webkit-linear-gradient(left, #ffffff 10%, rgba(255, 255, 255, 0) 42%);
    background: -o-linear-gradient(left, #ffffff 10%, rgba(255, 255, 255, 0) 42%);
    background: -ms-linear-gradient(left, #ffffff 10%, rgba(255, 255, 255, 0) 42%);
    background: linear-gradient(to right, #ffffff 10%, rgba(255, 255, 255, 0) 42%);
    position: relative;
    -webkit-animation: load3 1.4s infinite linear;
    animation: load3 1.4s infinite linear;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
}

.loader:before {
    width: 50%;
    height: 50%;
    background: #ffffff;
    border-radius: 100% 0 0 0;
    position: absolute;
    top: 0;
    left: 0;
    content: '';
}

.loader:after {
    background: #2c3e50;
    width: 75%;
    height: 75%;
    border-radius: 50%;
    content: '';
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
}

.btn {
    color: #42b983;
    position: relative;
    place-content: center;
    place-items: center;
    width: fit-content;
    border-radius: 99px;
    letter-spacing: 0.05em;
    border: 1px solid #42b983;
    text-decoration: none;
    text-transform: uppercase;
    margin-right: 10px;
    padding: 0.5rem 0.5rem;
    white-space: nowrap;
    font-weight: 700;
    outline: none;
    background: #fff;
    transition: all 0.22s;
}

@media (min-width: 250px) and (max-width: 720px){ 
    .card.card-w70{
        width: 100%;
    }

    .btn{
        width: -webkit-fill-available;
        margin-right: 0px;
    }

    .container.column{
        display: block;
    }

    .card.card-w30 {
    width: 100%;
    margin-right: 0px;
    }
}

</style>
