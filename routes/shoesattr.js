var express = require('express');
var router = express.Router();
var manModel = require('../model/manattrs')
var womanModel = require('../model/womanattrs')
/* GET home page. */
router.get('/manattr', function(req, res) {
    manModel.find({}).then(arr=>{
        res.json({err:0,data:arr})
    })
})
router.get('/womanattr', function(req, res) {
    womanModel.find({}).then(arr=>{
        res.json({err:0,data:arr})
    })
    
  })
module.exports = router;
