<template>
    <div class="tab-bar-item" @click="itemClick">
      <div v-if="notActive">
        <slot name="item-icon"></slot>
      </div>
      <div v-else>
        <slot name="item-icon-active"></slot>
      </div>
      <div :style="activeStyle">
        <slot name="item-text"></slot>
      </div>
<!--      <img src="../../assets/img/tabbar/home.svg" alt="">-->
      <div>首页</div>
    </div>
</template>

<script>
    export default {
      name: "TabBarItem",
      props:{
        // 父传子都用props变量
        path:String,
        activeColor:{
          type:String,
          default:'red'
        }
      },
      computed:{
        notActive(){
          return this.$route.path.indexOf(this.path)===-1
        },
        activeStyle(){
          // 该计算属性
          return !this.notActive ? {color: this.activeColor}:{}
        }
      },
      data(){
          return {
            // isActive:true
          }
      },

      methods:{
        itemClick(){
          this.$router.push(this.path).catch(()=>{})
        }
      }
    }
</script>

<style scoped>
  .tab-bar-item{
    /*border: red solid 1px;*/
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }

  .tab-bar-item img{
    /*图片和文字分行使用的是<div>的嵌套*/
    /* 上一级设置了text-align居中，在下面就自动居中了 */
    /*margin-left: auto;*/
    /*margin-right: auto;*/
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }
</style>
