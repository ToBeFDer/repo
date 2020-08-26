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