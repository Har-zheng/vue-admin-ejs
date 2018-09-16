var express = require('express');
var router = express.Router();//可以使用express Rouetr类创建模块化 可挂载的路由句柄

// 自定义中间件 判断登录状态
// esj 中设置全局数据  所有的页面都可以使用
// app.locals['userinfo'] ='123'
// app.locals['userinfo'] = '111111';
//权限判断
router.use(function(req,res,next) {
    if (req.url == '/login' || req.url =='/login/doLogin'){
        next();
    }else {
        if ( req.session.userinfo && req.session.userinfo.username != '' ){
            // console.log(router.property);
            req.app.locals["userinfo"] = req.session.userinfo; //配置全局变量  全局使用
            next();
        } else {
            console.log(req.session.userinfo);
            res.redirect('/admin/login');
        }
    }
});

var login = require('./admin/login');
var product = require('./admin/product');
var user = require('./admin/user');
var  driver_list = require('./admin/driver_list')

//配置路由

router.use('/login',login);
router.use('/product',product);
router.use('/user',user);
router.use('/driver_list',driver_list);

// 销毁session
router.get('/loginOut',function (req,res){
    // res.send('login');
    // res.render('login');
    req.session.destroy(function (err) {
        if (err){
            console.log(err);
        } else {
            res.redirect('/admin/login');
        }
    })
});

module.exports = router;