<template>
    <div>用户页面</div>
</template>

<script setup lang="ts">
definePage({
    meta:{
        requiresAuth: true
    }
})
console.log("进入用户页面")
</script>
