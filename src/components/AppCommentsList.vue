<template>
<div class="container">
    <p>
      <button class="btn primary" @click="$emit('openComments')" v-if="myComments.length === 0">Загрузить комментарии</button>
      <button class="btn danger" @click="$emit('closeComments')" v-if="myComments.length > 0">Закрыть комментарии</button>
    </p>
    <div class="card" v-if="myComments.length > 0">
      <h2>Комментарии</h2>
      <ul class="list">
        
    <AppComments
    v-for="item in myComments"
    :key="item.id"
    :item="item"
    ></AppComments>

      </ul>
    </div>
    <div class="loader" v-if="loading"></div>
  </div>
</template>

<script>

import AppComments from './AppComments.vue';

export default{
    data(){
        return{
            
        }
    },
    props:['myComments', 'loading' ],
    emits:['closeComments','openComments'],
    components:{AppComments}
}

</script>