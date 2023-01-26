<template>
    <div class="avatar flex">
          <img :src="item.value">
          <button class="btnDelete" @click="$emit('delete', item.id)">x</button>
    </div>
</template>

<script>
export default{
    emits:['delete'],
    props:['item'],
}
</script>