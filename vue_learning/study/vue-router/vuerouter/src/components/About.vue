<template>
  <div>
    <h2>看啥看！我是About页面！</h2>
    <p>楼上的，别那么暴躁！</p>
  </div>
</template>

<script>
    export default {
        name: "About",
      beforeCreate() {
        // console.log("About马上要被创建了");
      },
      // created() {
      //     // 生命周期函数
      //   // console.log("About被创建了");
      // }
      created() {
        console.log("关于created");
      },
      destroyed() {
        console.log("关于destroyed");
      },
    }
</script>

<style scoped>

</style>
