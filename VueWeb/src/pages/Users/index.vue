<template>
    <div>存储用户信息</div>
</template>

<script setup lang="ts">
definePage({
    meta:{
        requiresAuth: true,
        pageName : "Users"
    }
})
console.log("进入用户页面")
</script>
