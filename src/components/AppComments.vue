<template>
        <li class="list-item">
          <div>
            <p><strong>{{ item.email }}</strong></p>
            <small>{{ item.body }}</small>
          </div>
        </li>
</template>

<script>
export default{
    props:['item'],
}

</script>