var express = require('express');
var router = express.Router();

var goodModel = require('../model/goods')
var moment = require('moment')
// var jwt = require('../../utils/jwt')

// 商品新增、编辑
router.post('/addGood', function(req, res) {
    // img: String,  // 商品图片
    // price: String,// 销售价格
    // desc: String, // 商品描述
    // cate: String, // 所属品类
    // create_time: Number, // 入库时间
    // create_time_zh:String,
    // isHot: Boolean,  // 是否热销
    // status:String, //状态
    // sale:Number, //销量
    // leftover:Number, // 库存
    // gender:String, //男鞋还是女鞋
    // isHeel:Boolean, // 是不是高跟鞋
    // isSlipper:Boolean, //是不是拖鞋
    // isRunning :Boolean, //是不是跑鞋
    // isBoard : Boolean,  //是不是板鞋
    // isBoot : Boolean, //是不是靴子
    // isCasual : Boolean //时不是休闲鞋

	// 接受入参
	var { img,price,oldPrice,desc,isHot,cate, id,gender,num } = req.body
    console.log('参数',req.body)
    let arr1 =req.body.shoesAttr
    let obj ={}
    arr1.forEach((item,index)=>{
        obj[arr1[index]] = item
    })
    // console.log('----',obj)
    // var {isHeel, isSlipper,isRunning,isBoard,isBoot,isCasual} =obj
	// 必填字段校验

	var good = {   
		price,
        oldPrice,
		desc,
		cate,
		img: (img || ''),
		// 非必填字段，给默认值
		isHot: (isHot || false),
        sale:0,
        leftover:0,
        gender,
        isHeel: obj.heel?true:false,
        isSlipper :obj.slipper?true:false,
        isRunning :obj.running?true: false,
        isBoard : obj.board ?true:false,
        isBoot : obj.boot ?true: false,
        isCasual: obj.casual ?true:false,
        statue:"1"
	}

	// 有id是修改，无id是新增
	if (id) {
        goodModel.find({_id:id}).then(arr=>{
            let leftover = arr[0].leftover
            good.leftover += leftover
        })
		// goodModel.updateOne({_id: id}, {$set: good}).then(()=>{
		// 	res.json({err: 0, msg: 'success'})
		// })
	} else {
		// 当新增入库时，才需要create_time字段
        let create_time = Date.now()
		good.create_time = create_time
        good.create_time_zh = moment(create_time).format('YYYY-MM-DD HH:mm:ss')
        good.leftover = num
        console.log('插入实例',good)
		goodModel.insertMany([good]).then(()=>{
			// 响应客户端
			res.json({err:0, msg:'success'})
		})
	}
})

// 商品删除
router.get('/delete', function(req, res) {
	// GET取入参，使用 req.query
	// POST取入参，使用 req.body
	var { id } = req.query
	id=id.split(';')
	id=id.filter(ele=>ele)
	console.log('新的id',id)
	
	id.map(ele=>{
		goodModel.deleteOne({_id: ele}).then(()=>{
			res.json({err: 0, msg: 'success'})
		})
	})
	
	// goodModel.deleteOne({_id: id}).then(()=>{
	// 	res.json({err: 0, msg: 'success'})
	// })
})

// 查询商品详情
router.get('/detail', function(req, res){
	var { id } = req.query
	goodModel.find({_id: id}).then(arr=>{
		res.json({err: 0, msg: 'success', data: arr[0]})
	})
})

// 商品列表查询
router.get('/list', function(req, res) {
	var { size, page, cate, hot, text } = req.query
	// 用于查询
	var params = {
		cate: (cate || ''),
		hot: (hot || false),
		name: new RegExp(text || '', 'img')   // 商品名称搜索
	}
	if(!params.cate) delete params.cate
	if(!params.hot) delete params.hot
	console.log('params', params)
	// 用户分页
	size = parseInt(size || 10)
	page = parseInt(page || 1)
	// 查询总条数
	goodModel.find(params).count().then(total=>{
		console.log('total', total)
		// 查询当前页
		goodModel.find(params).limit(size).skip(size*(page-1)).sort({create_time: -1}).then(list=>{
			res.json({err:0, msg:'success', data: {total, list}})
		})
	})
})
//网站首页获取数据
router.get('/getGood', function(req, res) {
	goodModel.find({}).then(arr=>{
        res.json({err:0,data:arr})
    })
})

module.exports = router;
