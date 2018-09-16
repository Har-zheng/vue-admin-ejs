var express = require('express');
var router = express.Router();//可以使用express Rouetr类创建模块化 可挂载的路由句柄

var fs = require('fs');
var DB = require('../../modules/db.js'); //

var multiparty = require('multiparty');// 既可以获取提交的数据   也可上传图片

router.get('/',function (req,res) {
    //链接数据库查询数据
    DB.find('product',{},function (err,data) {
        res.render('admin/product',{
            list:data
        })
    })
});

router.get('/add',function (req,res) {
// res.send('productadd增加商品');
    res.render('admin/product/add');
});
router.post('/doAdd',function (req,res) {
    //获取表单提交的数据， 以及post过来的图片
    var form = new multiparty.Form();
    form.uploadDir ='upload',  //上传图片保存的地址 目录必须存在
        form.parse(req, function(err, fields, files) {
            //获取提交的数据以及图片上传成返回
            // console.log(fields); //获取表单的数据
            // console.log(files); // 图片上传成功 返回的信息
            var title = fields.title[0];
            var price = fields.price[0];
            var fee = fields.fee[0];
            var description = fields.description[0];
            var pic = files.pic[0].path;
            // console.log(pic);
            DB.isnert('product',{
                title:title,
                price:price,
                fee,
                description,
                pic
            },function (err,data) {
                if (!err){
                    res.redirect('/admin/product'); //上传成功跳转到首页
                }
            })
        });
});
router.get('/edit',function (req,res) {
    // res.send('productedit编辑商品');
    var id = req.query.id;

    // var id = mongoose.Types.ObjectId(id)
    // 去数据库查询这个id 对应的数据  获取自增长的id  要用"_id":new DB.ObjectID(id)}
    DB.find('product',{ "_id": new DB.ObjectID(id) },function (err,data) {
        // console.log(data);
        res.render('admin/product/edit',{
            list: data[0]
        })
    });
});
router.post('/doEdit',function(req,res){

    var form = new multiparty.Form();

    form.uploadDir='upload'  // 上传图片保存的地址

    form.parse(req, function(err, fields, files) {

        //获取提交的数据以及图片上传成功返回的图片信息

        //console.log(fields);
        console.log(files);

        var _id=fields._id[0];   /*修改的条件*/
        var title=fields.title[0];
        var price=fields.price[0];
        var fee=fields.fee[0];
        var description=fields.description[0];
        var originalFilename=files.pic[0].originalFilename;
        var pic=files.pic[0].path;
        if(originalFilename){  /*修改了图片*/
            var setData={
                title,
                price,
                fee,
                description,
                pic
            };
        }else{ /*没有修改图片*/
            var setData={
                title,
                price,
                fee,
                description
            };
            //删除生成的临时文件
            fs.unlink(pic,function (err,data) {
            });
        }
        DB.update('product',{"_id":new DB.ObjectID(_id)},setData,function(err,data){

            if(!err){
                res.redirect('/admin/product');
            }
        })

    });

})

router.get('/delete',function (req,res) {
    //获取id
    var id = req.query.id

    DB.deleteOne('product',{"_id":new DB.ObjectID(id)},function (err,data) {
        if (!err){
            res.redirect('/admin/product');
        }
    });
})
module.exports = router;