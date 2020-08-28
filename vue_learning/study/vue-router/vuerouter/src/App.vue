<template>
  <div id="app">
    <router-link to="/home" tag="button">首页</router-link>
    <router-link to="/about" tag="button">关于</router-link>
    <router-link :to="'/user/' + userId" tag="button">用户</router-link>
<!--    <router-link to="/profile">档案</router-link>-->
<!--    <router-link :to="{-->
<!--      path: '/profile',-->
<!--      query: {-->
<!--        name: 'Mr.Huang',-->
<!--        age: '25',-->
<!--      }-->
<!--    }">档案</router-link>-->
<!--    <button @click="homeClick">首页</button>-->
<!--    <button @click="aboutClick">关于</button>-->
    <button @click="profileClick">档案</button>
    <keep-alive exclude="Profile">
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data(){
      return {
        'userId':'huang'
      }
    },
    methods:{
      // vue-router给所有的组件增加了一个$router属性
      // 通过代码的方式修改路径
      // 依然使用vue-router，不要试图绕过vue-router
      homeClick(){
        this.$router.push('/home');
        console.log("home");
      },
      aboutClick(){
        // 也可以采用replace方法，屏蔽返回
        this.$router.replace('/about');
        // console.log('about');
      },
      profileClick(){
        this.$router.push({
          path:'/profile',
          query:{
            name:"Jay Chou",
            age:18
          }
        })
      }
    }
  }
</script>

<style>

</style>
