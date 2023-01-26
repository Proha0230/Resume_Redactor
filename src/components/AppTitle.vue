<template>
<span class="flex">
<h1>{{ item.value }}</h1>
<button class="btnDelete" @click="$emit('delete', item.id)">x</button>
</span>
</template>

<script>

export default{
    emits:['delete'],
    props:['item'],
}

</script>