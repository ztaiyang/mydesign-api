var jwt = require('jsonwebtoken')

//生成token
function createToken(data){
    return jwt.sign({
        exp : Math.floor(Date.now()/1000)+(60*60*24*7),//秒做单位,有效期7天
        data,//要加密的信息
    },'zty')
}

//验证token
function verifyToken(req,res){
    return new Promise(function(resolve,reject){
        try{
            var token = req.headers.authorization
            if(!token){
                return res.json({err:-1,msg:'token 无效'})
            }else{
                var decoded = jwt.verify(token,'zty')
                resolve(decoded.data)
            }
        }catch(err){
            
            reject(err)
        }
    })
}

module.exports = {
    createToken,
    verifyToken
}