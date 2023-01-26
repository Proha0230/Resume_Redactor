<template>
<span class="flex">
<h2>{{ item.value }}</h2>
<button class="btnDelete" @click="$emit('delete', item.id)"> x </button>
</span>
</template>

<script>
export default{
    emits:['delete'],
    props:['item'],
}
</script>