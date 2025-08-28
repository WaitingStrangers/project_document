<template>
    <div>
        <div>{{ title }}</div>
        <div>
            <span>用户名：</span><input type="text" placeholder="请输入用户名..." v-model="userName"/>
            <br>
            <span>密 码：</span><input type="text" placeholder="请输入密码..." v-model="pwd"/>
            <br>
            <button @click="getUsersMag()">登录</button>
        </div>


    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { userService } from "../service/userService"
import { useRouter,useRoute } from "vue-router";
import { useUserStore } from "../store/userStore"

definePage({
    meta:{
        requiresAuth: true,
        pageName : "Lagin"
    }
})

const title = ref();
title.value = "登录页面";
const userName = ref<string>();
const pwd = ref<string>();
const router = useRouter();
const userToken = useUserStore();

const getUsersMag = async ()=>{
    console.log("调用接口",userName.value,pwd.value,111);
    // 请求数据
    const loginData = {
        username: userName.value,
        password: pwd.value
    };
    //进行异步请求并且获取异常
    try{
        const userData = await userService.login(loginData);
        //请求成功
        //console.log(userData.token);
        userToken.getterToken(userData.token);
        alert("登录成功");
        router.push("/Users");
    }catch (error: any){
        // 捕获 axios 请求异常
        if (error.response) {
            // 服务器返回非 2xx
            console.error("接口访问异常:", error.response.data, "状态码:", error.response.status);
            alert("登录失败：" + (error.response.data.msg || "未知错误"));
        } else if (error.request) {
            // 请求已发送但没有收到响应
            console.error("请求未收到响应:", error.request);
            alert("登录失败：未收到服务器响应");
        } else {
            // 其他错误
            console.error("请求出错:", error.message);
            alert("登录失败：" + error.message);
        }
    }
}




</script>