var express = require('express');
var router = express.Router();
var jwt = require('../utils/jwt')
var moment = require('moment')
var userModel = require('../model/users')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//注册:
router.post('/register',function(req,res){
  // var {userName, password } = req.body
  let userName = req.body.phoneNumber || ''
  console.log('userName',userName)
  let password = req.body.password || ''
  // //验证用户名是否被注册
  userModel.find({userName}).then(arr=>{
    console.log('arr-----',arr)
    // res.json({err:0,msg:'注册成功'})
    if(arr.length>0){
      return res.json({err:1,msg:'该手机号已被注册'})
    }else{
      //帐号信息存入数据库
      let create_time = Date.now()
      let create_time_zh = moment(create_time).format('YYYY-MM-DD HH:mm:ss')
      var user = {
        userName,
        password,
        create_time,
        create_time_zh,
        role:"0"
      }
      console.log('user---',user)
      userModel.insertMany([user]).then(()=>{
        //入库成功
         res.json({err:0,msg:'注册成功'})
      })
    }
  })
})
router.post('/login',function(req,res){
  console.log('------loginning--------')
  // let {userName , password} = req.body
  let userName = req.body.phoneNumber || ''
  let password = req.body.password || ''
  userModel.find({userName,password}).then(arr=>{
    if(arr.length===1){
      //登录成功,根据用户信息信息生成token
      res.json({err:0,msg:"登录成功",data:{
        token:jwt.createToken({userName,password})
      }})
    }else{
      res.json({err:1 , msg:'帐号或密码不正确'})
    }
  })
})
module.exports = router;
