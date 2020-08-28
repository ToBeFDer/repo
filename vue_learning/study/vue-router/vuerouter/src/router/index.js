// 配置路由相关的信息

import VueRouter from 'vue-router'
import Vue from 'vue'
// import home from '../components/Home'
// import about from '../components/About'
// import user from '../components/User'

// 使用懒加载的方式
const home = ()=>import('../components/Home');
const about = ()=>import('../components/About');
const user = ()=>import('../components/User');
const profile = ()=>import('../components/Profile');

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
    component: home,
    meta:{
      title:'首页'
    },
    children:[
      // {
      //   path:'',
      //   redirect:'news'
      // }
      // ,
      {
        path:'news',
        component:()=>import('../components/news')
      },
      {
        path: 'message',
        component:()=>import('../components/Message')
      }
    ]
  },
  {
    path:'/about',
    component: about,
    meta:{
      title: "关于"
    },
    beforeEnter:(to, from, next)=>{
      // console.log("About的前置守卫");
      next();
    }
  },
  {
    path:'/user/:userId',
    component:user,
    meta:{
      title:"用户"
    }
  },
  {
    path:'/profile',
    component:profile,
    meta:{
      title:"档案"
    }
  }
];

const router = new VueRouter({
  // 配置路径和组件之间的映射关系
  routes, // ES6增强写法
  mode:'history'
});

// 前置钩子
// 在跳转之前进行修改，这样跳转之后就会呈现出修改的结果了
router.beforeEach(
  (to,from,next)=>{
    document.title = to.matched[0].meta.title;
    // console.log(to);
    // console.log("全局前置守卫");
    next();
  }
);

router.afterEach((to,from)=>{
  // console.log("全局后置守卫");
});

// 3.将router对象挂载到vue实例中
export default router;
