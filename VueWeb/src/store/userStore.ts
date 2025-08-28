//全局状态管理pinia
import { defineStore } from "pinia"
import { ref } from "vue";
export const useUserStore = defineStore("alldata",() =>{
    //state
    const token = ref<string|null>();

    //action
    //通过loalStorage 设置过期时间
    const logout = ()=>{
        token.value = null;
        localStorage.removeItem("token");
        localStorage.removeItem("token_expire");
    };
    const loadFromStorage = ()=>{
        token.value = localStorage.getItem("token")
    };

    const getterToken = (newToken:string,expireTime:number) =>{
        token.value = newToken;
        localStorage.setItem("token",newToken);
        const expireAt = Date.now() + expireTime * 10000;
        localStorage.setItem("token_expire",expireAt.toString());
    }
    return {token,logout,loadFromStorage,getterToken}
});