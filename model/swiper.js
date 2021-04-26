//轮播图的表
var mongoose = require('mongoose')
module.exports = mongoose.model('swipers',mongoose.Schema({
    src:String,
    status:String //1正常 0已被删除
}))