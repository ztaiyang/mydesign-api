var mongoose = require('mongoose')

module.exports = mongoose.model('goods', new mongoose.Schema({
  img: String,  // 商品图片
  price: Number,// 销售价格
  oldPrice:Number, //商品原价
  desc: String, // 商品描述
  cate: String, // 所属品类
  create_time: Number, // 入库时间
  create_time_zh:String,
  isHot: Boolean,  // 是否热销
  statue:String, //状态
  sale:Number, //销量
  leftover:Number, // 库存
  gender:String, //男鞋还是女鞋
  isHeel:Boolean, // 是不是高跟鞋
  isSlipper:Boolean, //是不是拖鞋
  isRunning :Boolean, //是不是跑鞋
  isBoard : Boolean,  //是不是板鞋
  isBoot : Boolean, //是不是靴子
  isCasual : Boolean //时不是休闲鞋
}))
