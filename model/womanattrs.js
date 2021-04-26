
//女鞋属性
var mongoose = require('mongoose')
module.exports = mongoose.model('womanattrs',mongoose.Schema({
    val:String,
    val_zh:String
}))