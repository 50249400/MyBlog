var express = require('express'); //加载express构造函数
var app = express(); //生成创建服务的实例
var bodyParser = require('body-parser'); //获取post请求参数
const result = require('./libs/result');
const statusObj = require('./libs/statusCode');

app.use(express.static('static')); //指定资源路径
app.use(bodyParser.json()); //处理以json格式的提交
app.use(bodyParser.urlencoded({ //处理以form表单提交的数据
    extended: true
}));

// 处理跨域，包含简单参数（非标准参数）
const cors = require('cors');
app.use(cors());

const { checkToken } = require("./src/index/constroller/Login");
app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", req.headers.origin || '*');
    // //允许的header类型
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
    // //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    if ("OPTIONS" === req.method) return res.sendStatus(200);
    next();
    // const { token } = req.headers;

    // if(!checkToken(token)){
    //     res.send(result.fail(statusObj.statusArr[2].code, false, '登录凭证失效请重新登录!'));
    // }else{
    //     next();
    // }
});

app.use('/', require('./src/index/index'));

app.listen(3000, () => {
    console.log('serve running....');
});
