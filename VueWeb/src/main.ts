import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
// 自动生成的 routes（插件会提供）
import {routes} from 'vue-router/auto-routes'  // 注意这里的路径，插件会生成一个虚拟模块
import { createPinia } from 'pinia' 
import Login from "./pages/Login.vue"

const router = createRouter({
  history: createWebHistory(),
  routes : [
    {
      path : "/",
      redirect : "/Login"
    },...routes
  ],
})

//设置路由守卫
router.beforeEach((to,from,next) =>{
  const token = localStorage.getItem("token");
  console.log(to.meta.pageName);
  if(to.meta.requiresAuth && !token){
    next("/Login");
  } else if(to.meta.pageName == "Lagin"){
    next("/Users");
  }
  else{
    next();
  }
});

// console.log(routes)
const pinia = createPinia();

createApp(App).use(router).use(pinia).mount('#app')
