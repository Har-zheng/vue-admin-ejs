var express = require('express');
var router = express.Router();//可以使用express Rouetr类创建模块化 可挂载的路由句柄

router.get('/',function (req,res) {
//pathname pathname baseUrl
    res.render('admin/product/management',{});//这里读取的是ejs recruitment
});
module.exports = router;