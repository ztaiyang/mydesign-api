var express = require('express')
var router = express.Router()
var multiparty = require('multiparty')
var fs = require('fs')
var moment = require('moment')

//图片上传

router.post('/img',function(req,res){
    let form = new multiparty.Form()
    form.parse(req,function(err,fileds,files){
        if(err){
            res.json({err:1,msg:'img fail'})
        }else{
            // var img = files.file[0]
            // console.log('fileds---',fileds)
            // console.log('files---',files)
            // res.json({err:0,data:'-----------'})
            var img = files.file[0]
			// console.log('img', img)
			var read = fs.createReadStream(img.path)
            let time = moment(Date.now()).format('YYYY-MM-DD HH-mm-ss')
			var writePath = `/upload/img/${time}.${img.originalFilename}`
			var write = fs.createWriteStream('./public/'+writePath)
			read.pipe(write)
			// 当管道流关闭时，把图片在服务上的访问地址返回给客户端
			write.on('close', function(){
				res.json({err:0,msg:'success', data: {url: writePath}})
			})


        }
    })
})

module.exports = router