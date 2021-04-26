var mongoose = require('mongoose')

//链接数据库
mongoose.connect('mongodb://localhost/designLib',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})

//获取数据库连接对象
var connection = mongoose.connection
connection.on('open',function(){
    console.log('The lib is connected')
})
connection.on('error',function(){
    console.log('connect error')
})



