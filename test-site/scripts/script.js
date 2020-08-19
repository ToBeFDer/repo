
function createParagraph(){
    let para = document.createElement('p');
    para.textContent="你点了这个按钮";
    document.body.appendChild(para);
    /* 在文档的body级别增加子节点，节点内容是para的文本 */
}

const buttons = document.querySelectorAll('button');

for(let i=0;i<buttons.length;i++){
    /* 每次点击之后都会执行一次createParagraph函数 */
    // document.body.appendChild(buttons.length)
    buttons[i].addEventListener("click", createParagraph)
}