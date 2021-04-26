
//男鞋属性

var mongoose = require('mongoose')
module.exports = mongoose.model('manattrs',mongoose.Schema({
    val:String,
    val_zh:String
}))