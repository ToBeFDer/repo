import Vue from 'vue'
import App from './App'
//如果这里是一个文件夹，会自动寻找其中的index文件，所以这里的index不是必须的
import router from './router'

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // 设置了路由，那么重定向就会生效
  router,
  render: h => h(App)
});
