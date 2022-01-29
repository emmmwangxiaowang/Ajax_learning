//1.引入express
const { json } = require('body-parser');
const { response } = require('express');
const express = require('express');

//2.创建应用对象
const app = express();

//3.创建路由规则
//request 是对请求报文的封装
//response 是对响应报文的封装
app.get('/server', (request, response) => {
    //设置响应头  设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*')
        //设置响应体
    response.send('hello ajax get - 2')
});

//延时响应
app.all('/delay', (request, response) => {
    //设置响应头  设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.setHeader('Access-Control-Allow-Headers', '*')

    setTimeout(() => {
        //设置响应体
        response.send('hello ajax get - 2')
    }, 3000);

});

app.all('/server', (request, response) => {
    //设置响应头  设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*')

    response.setHeader('Access-Control-Allow-Headers', '*')

    //响应一个数据
    const data = {
        name: 'wang'
    }

    //对对象进行字符串转换
    let str = JSON.stringify(data);
    //设置响应体
    response.send(str)
});

app.all('/getscript', (request, response) => {
    //设置响应头  设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*')

    response.setHeader('Access-Control-Allow-Headers', '*')

    let data = {
        name: 'jyy',
        age: '20',
        gender: 'female'
    };
    let str = JSON.stringify(data);

    let scriptStr = request.query.callback + `(${str})`;
    // response.sent 发送给客户端, 客户端去把这个字符串,当作JS迪马去解析执行

    //设置响应体
    response.send(scriptStr)
});

app.all('/jquery-server', (request, response) => {
    //设置响应头  设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.setHeader('Access-Control-Allow-Headers', '*')

    //设置响应体
    const data = { name: "蒋莹莹" }
    response.send(JSON.stringify(data))
});

//axios服务
app.all('/axios-server', (request, response) => {
    //设置响应头  设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.setHeader('Access-Control-Allow-Headers', '*')

    //设置响应体
    const data = { name: "蒋莹莹" }
    response.send(JSON.stringify(data))
});


app.all('/jquery-jsonp-server', (request, response) => {

    //设置响应体
    const data = { name: "蒋莹莹", city: ['遵义', '重庆'] }
    let str = JSON.stringify(data)
        //接收callback函数
        //callback: jQuery36005905969641950319_1638265005191
    let cb = request.query.callback;
    response.end(`${cd}(${str})`)
});


//4.监听端口启动服务
app.listen(8000, () => {
    console.log("服务已经启动  8000端口")
})