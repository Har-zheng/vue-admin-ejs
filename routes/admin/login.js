var express = require('express');
var bodyParser = require('body-parser');
var md5 = require('md5-node'); //md5加密

var DB = require('../../modules/db.js'); //
var router = express.Router();//可以使用express Rouetr类创建模块化 可挂载的路由句柄
// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
router.use(bodyParser.json());



router.get('/',function (req,res) {
    console.log('123')
    res.render('admin/login');
});

router.post('/doLogin',function (req,res) {
    // 获取登录提交的数据

        // res.send('login');
        // console.log(req.body); //获取提交的数据
        // req.body = { username: '123456', password: 'qqqqqqrrrrrrrrrr' }
        //  1获取数据
        // 2  连接数据库
        console.log(req.body);
        var username = req.body.username;
        var password = md5(req.body.password);/* 要对用户输入的密码加密*/
        DB.find('user',{
            username:username,
            password:password
        },function (err,data) {
            console.log(err);
            if ( data.length >=1 ) {
                console.log('登录成功');
                // 保存用户信息
                req.session.userinfo = data[0];
                res.redirect('/admin/product'); //登录成功跳转 列表页面
                // console.log(req.session);
            }else {
                alert(JSON.stringify(err));
                // console.log("登录失败");
                res.send("<script >alert('登录失败！'); location.href = '/admin/login'</script>")
            }
        });
});
module.exports = router;