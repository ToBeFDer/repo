var flag=true
function sum(num1,num2){
    return num1+num2;
}

if(flag){
    console.log(sum(20, 30));
}

// 1.导出方式一：
export{
    flag, sum
}

// module.exports = {flag, sum}

// 2.导出方式二：
export var num1 = 1000;
export function fun() {
    console.log("this is exported");
}