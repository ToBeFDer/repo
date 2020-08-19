/**
 * 将timer设置成全局变量的话，可能产生关闭不想关闭的定时器的问题
 * 这里的解决办法是将timer设置成与对象绑定的一个属性
 */
// let timer;
window.onload = function () {
    let box1 = document.getElementById("box1");
    let box2 = document.getElementById("box2");

    let btn1 = document.getElementById("btn1");
    btn1.onclick = function () {
        move(box1, "left", 800, 10, 50)
    };

    let btn2 = document.getElementById("btn2");
    btn2.onclick = function () {
        move(box1, "left", 0, 10, 50);
    };

    let btn3 = document.getElementById("btn3");
    btn3.onclick = function () {
        move(box2, "left", 800, 10, 60);
    };

    let btn4 = document.getElementById("btn4");
    btn4.onclick = function () {
        move(box2, "width", 800, 10, 50, function () {
            move(box2, "height", 600, 8, 50, function () {
                move(box2, "top", 0, 5, 50)
            })
        });
    }
};
function getStyle(obj, name) {
    if(window.getComputedStyle){
        // 正常的浏览器方式
        return getComputedStyle(obj,null)[name];
    }
    else {
        // IE8的样式获取方式
        return obj.currentStyle[name];
    }
}

/**
 *
 * @param obj - 要执行的对象
 * @param attr - 要修改动画的样式，比如left，top等
 * @param target - 执行动画的目标位置
 * @param speed - 移动的速度
 * @param step  - 更新的间隔
 * @param callback - 定时器执行结束之后要执行的回调函数
 */
function move(obj, attr, target, speed, step, callback) {
    clearInterval(obj.timer);
    let  currentValue = parseInt(getStyle(obj, attr));
    // 判断速度的正负值
    if(currentValue > target){
        // 如果目标位置小于目前的位置，则应该取负值
        speed = -speed;
    }
    /**
     * 向obj添加了一个属性，属性名就为timer定时器
     */
    obj.timer = setInterval(function () {
        let oldValue = parseInt(getStyle(obj, attr));
        let newValue = oldValue + speed;
        if((speed<0 && newValue<target) || (speed>0 && newValue>target))
            newValue = target;
        obj.style[attr] = newValue + "px";
        if(newValue === target){
            clearInterval(obj.timer);
            // callback存在再执行
            // 这里使用这句话就可以轻易实现这一点
            callback && callback();
        }
    }, step)

}