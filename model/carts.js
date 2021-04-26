//购物车的表

var mongoose = require('mongoose')
module.exports = mongoose.model('carts',mongoose.Schema({
    user_id:Object,  //用户id
    good_id:Object,  // 商品id
    create_time:Number, //购买时间
    num:Number, // 下单数量
    statues:Number //1正常 0已被删除
}))