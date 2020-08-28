<template>
  <div id="app">
<!--    <router-link to="/home" tag="button">首页</router-link>-->
<!--    <router-link to="/about" tag="button">关于</router-link>-->
    <button @click="homeClick">首页</button>
    <button @click="aboutClick">关于</button>
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App',
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
        console.log('about');
      }
    }
  }
</script>

<style>

</style>
