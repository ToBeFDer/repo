<template>
  <div>
    <h2>我是用户界面</h2>
    <p>听说你想用我？？</p>
<!--    <h2>{{userId}}</h2>-->
    <h2>{{this.$route.params.userId}}</h2>
  </div>
</template>

<script>
    export default {
      name: "User",
      computed:{
          userId(){
            // 这里的$route返回的是处于活跃状态的路由
            // 最后的.后面的参数名应该和路由表当中:后面的名称保持一致
            return this.$route.params.userId
          }
      },
      created() {
        console.log("用户created");
      },
      destroyed() {
        console.log("用户destroyed");
      },
    }
</script>

<style scoped>

</style>
