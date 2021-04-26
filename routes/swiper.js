var express = require('express');
var router = express.Router();
var swiperModel =require('../model/swiper')
/* GET home page. */
router.get('/getSwiper', function(req, res, next) {
    swiperModel.find({}).then(arr=>{
        res.json({err:0,data:arr})
    })

});

module.exports = router;
