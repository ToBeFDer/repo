<template>
  <div>
    <p>我就是你，你也是我~</p>
    <p>{{this.$route.query.name}}</p>
    <p>{{this.$route.query.age}}</p>
    <p>使用beforeRouteUpdate获取到的数据：{{age}}</p>
  </div>
</template>

<script>
    export default {
      name: "Profile",
      data(){
        return {
          age:0
        }
      },
      created() {
        console.log("档案created");
      },
      destroyed() {
        console.log("档案destroyed");
      },
      // beforeRouteUpdate:((to,from,next)=>{
      //   this.age = to.query.age;
      //   alert("X");
      //   console.log("更新前：age=");
      //   next();
      // }),
      // beforeRouteLeave(to, from, next){
      //   const answer = window.confirm("y/n");
      //   if(answer){
      //     next();
      //   }
      //   else {
      //     next(false);
      //   }
      // }
    }
</script>

<style scoped>

</style>
