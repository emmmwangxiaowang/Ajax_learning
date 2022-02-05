//1.引入express
const { json } = require('body-parser');
const { response } = require('express');
const express = require('express');

//2.创建应用对象
const app = express();

var bodyParser = require("body-parser")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
        extended: true
    }))
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
    // response.sent 发送给客户端, 客户端去把这个字符串,当作JS去解析执行

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
    let par = request.query
        //设置响应体
    const data = { name: "蒋莹莹" }
    let res = JSON.stringify(data) + JSON.stringify(par)
    response.send(res)
});

app.all('/axios-vue', (request, response) => {
    //设置响应头  设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.setHeader('Access-Control-Allow-Headers', '*')

    //设置响应体
    let result = [
        { id: 1, name: "奥迪", ctime: new Date() },
        { id: 2, name: "宝马", ctime: new Date() },
        { id: 3, name: "奔驰", ctime: new Date() }
    ]


    // 因为没有连接数据库,所以把前端显示的数据一起传过来更新
    // 当传入参数的时候 默认为post方法, 添加数据
    if (request.body.name) {
        // 获取前端显示的数据
        result = JSON.parse(request.body.list);
        console.log(result);
        // id 必须定义在里面,不然每次都是原始数据长度+1 ----4
        let id = result.length + 1
        result.push({ id: id, name: request.body.name, ctime: new Date() })
        let str = JSON.stringify(result)
        response.end(str)
    } else {
        // 第一次直接返回数据
        let str = JSON.stringify(result)

        response.end(str)
    }


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