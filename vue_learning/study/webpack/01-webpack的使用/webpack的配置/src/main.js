// 使用CommonJS的模块化规范
const {add,mul} = require("./js/mathUtils.js");

console.log(add(20, 30));
console.log(mul(3, 5));

// 使用ES6的模块化规范
import {name,age,height} from "./js/info.js"

console.log(name);
console.log(age);
console.log(height);

// 依赖css文件
require('./css/normal.css');

// 依赖less文件
require('./css/special.less');
document.writeln('<h2>Hello,Pangping哈哈哈~</h2>');

//default导出的方式不需要使用{}
//import App from './vue/app'
import App from "./vue/App.vue";

// 使用vue进行开发
import Vue from 'vue'
new Vue({
    el: "#app",
    // 下面的template中的代码会被直接放到id为app的div中去。
    template:`<App />`,
    components:{
        App
    }
});