var express = require('express');
var router = express.Router();
var multer = require('multer');


router.post('/api/file', multer({}).single('file-input'), function(req,res){
    res.json({size:req.file.size});
});


module.exports = router;
