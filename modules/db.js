// 数据库操作
var MongoClient=require('mongodb').MongoClient;

var DbUrl = 'mongodb://localhost:27017/productmanage';

var  ObjectID = require('mongodb'). ObjectId;

function __connectDb(callback) {

    MongoClient.connect(DbUrl,function (err,client) {
        if (err){
            console.log(err)
            console.log('数据库连接失败')
            return;
        }
        // console.log(client);
        // 增加 修改 删除
        callback(client);

    })
};
// 暴露 ObjectID
exports.ObjectID = ObjectID;

//  数据查找
/*
* Db.find('user',{},function(err,data){})
* */
exports.find=function (collectionname,json,callback) {
    __connectDb(function (client) {
     var  db = client.db("productmanage");
        console.log(json);
     var result =  db.collection(collectionname).find(json);
     result.toArray(function (error,data) {
          callback(error,data); //拿到数据执行回调函数
          client.close(); //关闭数据库链接
      });
    })
};

//增加数据
exports.isnert = function (collectionname,json,callback) {
    __connectDb(function (client) {
        var  db = client.db("productmanage");
        var result =  db.collection(collectionname).insertOne(json,function (error,data) {
            callback(error,data);
        });
        // result.
    })
};
//修改数据
exports.update = function (collectionname,json1,json2,callback) {
    __connectDb(function (client) {
        var  db = client.db("productmanage");
        var result =  db.collection(collectionname).updateOne(json1,{$set:json2},function (error,data) {
            callback(error,data);
        });
        // result.
    })
};
//删除数据
exports.deleteOne = function (collectionname,json,callback) {
    __connectDb(function (client) {
        var  db = client.db("productmanage");
        var result =  db.collection(collectionname).deleteOne(json,function (error,data) {
            callback(error,data);
        });
        // result.
    })
};