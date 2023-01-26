<template>
<span class="flex">
<p>{{ item.value }}</p><button class="btnDelete" @click="$emit('delete', item.id)">x</button>
</span>
</template>

<script>
    export default{
        emits:['delete'],
        props:['item']
    }
</script>