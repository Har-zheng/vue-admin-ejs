var express = require('express');
var app = new express();
var session = require("express-session");
//  配置中间件  固定格式
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000*60*30
    },
    rolling:true
}));

var admin = require('./routes/admin');

var index = require('./routes/index');


// 使用ejs模板引擎 默认找views这个目录
app.set('view engine', 'ejs');
//配置 public 目录为我们的静态资源目录
app.use(express.static('public'));
// 配置虚拟目录  upload /  图片地址
app.use('/upload',express.static('upload'));

app.use('/',index);


app.use('/admin',admin);
app.listen(3000,'127.0.0.1');