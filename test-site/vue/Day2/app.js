const http = require("http");
// 这个核心模块能够帮助我们解析URL地址，从而拿到pathname query
const urlModule = require('url')

// 创建一个http服务器
const server = http.createServer();

// 监听http服务器的request请求
server.on('request', function (req, res) {
    // const url = req.url;
    // true表示对后面的query语句进行解析
    const { pathname:url, query } = urlModule.parse(req.url, true)
    if(url === '/getscript'){
        let data={
            name:"黄波",
            age:25,
            university:"复旦大学"
        };
        // 拼接一个合法的JS脚本，这里拼接的是一个方法的调用
        // 传递的是一个数据实体，而不应该是一个变量，所以应该用JSON字符串的形式给出
        let scriptStr = `${query.callback}(${JSON.stringify(data)})`;
        // res.end发送给客户端，客户端去把这个字符串当作JS代码去解析执行
        res.end(scriptStr);
    }else{
        res.end('404');
    }
});

server.listen(3000, function () {
    console.log('server listen at http://127.0.0.1:3000')
});