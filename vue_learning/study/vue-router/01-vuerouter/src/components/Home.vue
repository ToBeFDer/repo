<template>
  <div>
    <h2>我是Home页面！！</h2>
    <p>我是home的内容~~</p>
    <router-link to="/home/news">新闻</router-link>
    <router-link to="/home/message"> 消息</router-link>
    <router-view/>
  </div>
</template>

<script>
    export default {
      name: "Home",
      data(){
        return{
          path:'/home/news'
        }
      },
      created() {
        console.log("首页created");
      },
      destroyed() {
        console.log("首页destroyed");
      },
      activated() {
        // console.log("activated被执行")
        this.$router.push(this.path);
      },
      // deactivated() {
      // 该方案不行，因为到deactivated阶段之时，当前路由已经变成了下一个路由
      //   this.path = this.$route.path;
      // }
      beforeRouteLeave(to,from,next){
        // 组件导航守卫，在离开路由之前执行
        this.path = this.$route.path;
        next();
      }
    }
</script>

<style scoped>

</style>
