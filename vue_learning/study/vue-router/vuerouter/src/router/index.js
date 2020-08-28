// 配置路由相关的信息

import VueRouter from 'vue-router'
import Vue from 'vue'
import home from '../components/Home'
import about from '../components/About'

// 1. 通过Vue.use(插件)，安装插件（以后用到的任何插件都要使用这个方式来安装）
Vue.use(VueRouter);


// 2.创建VueRouter对象，这里是类似于new Vue()实例的创建过程的
const routes = [
  {
    path:'',
    // redirect重定向
    redirect:'/home'
  },
  {
    path:'/home',
    component: home
  },
  {
    path:'/about',
    component: about
  }
];

const router = new VueRouter({
  // 配置路径和组件之间的映射关系
  routes, // ES6增强写法
  mode:'history'
});

// 3.将router对象挂载到vue实例中
export default router;
