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
// 导入js文件
var login = require('./admin/login');
var product = require('./admin/product');
var user = require('./admin/user');
var  driver_list = require('./admin/driver_list');//司机
var  customer_list = require('./admin/customer_list');// 客户
var  recruitment = require('./admin/recruitment');// 招聘
var  management = require('./admin/management');// 管理
var  settlement = require('./admin/settlement');// 结算

//配置路由  这里匹配路由 admin下的一些路径
router.use('/login',login); //登录
router.use('/product',product); //
router.use('/',product); //
router.use('/user',user);//用户
router.use('/driver_list',driver_list);//司机
router.use('/customer_list',customer_list);//客户
router.use('/recruitment',recruitment);//招聘
router.use('/management',management);//管理
router.use('/settlement',settlement);//结算

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