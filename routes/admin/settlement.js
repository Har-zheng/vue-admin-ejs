
var express = require('express');
var router = express.Router();//可以使用express Rouetr类创建模块化 可挂载的路由句柄

router.get('/',function (req,res) {
    res.render('admin/product/settlement');//这里读取的是ejs settlement
});
module.exports = router;