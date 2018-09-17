var express = require('express');
var router = express.Router();//可以使用express Rouetr类创建模块化 可挂载的路由句柄

var fs = require('fs');
var DB = require('../../modules/db.js'); //
var multiparty = require('multiparty');// 既可以获取提交的数据   也可上传图片

router.get('/',function (req,res) {
    console.log('123')//链接数据库查询数据
    // DB.find('product',{},function (err,data) {
    //     res.render('admin/product',{
    //         list:data
    //     })
    // });
    DB.find('product',{},function (err, data) {
        res.render('admin/product/driver_list',{
            list:data
        });//这里读取的是ejs driver_list
    })

});
module.exports = router;

