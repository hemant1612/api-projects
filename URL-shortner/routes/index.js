var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://hemant:12345@ds247327.mlab.com:47327/orion', {useMongoClient: true});
mongoose.Promise = global.Promise;

var urlSchema = mongoose.Schema({originalURL: String, shortenURL: String})
var UrlShortner = mongoose.model('UrlShortner', urlSchema)
/* GET home page. */



router.get('/', function(req, res, next) {
  res.render('index', {title: 'SHORTEN THE URL'});
});


router.post('/api', function(req, res){
  if(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi.test(req.body.url)){
    UrlShortner.find({
      originalURL: req.body.url
    }, function(err, docs) {
      if(err) throw err;
      if(docs.length == 0){
        var randomGenURL = Math.floor(Math.random()*100000);
        var newURL = new UrlShortner({originalURL:req.body.url, shortenURL: randomGenURL});
        newURL.save(function(err){
          if(err) throw err;
          res.send({
            url : req.body.url,
            shortURL : req.headers.host +'/'+randomGenURL
          })
        })
      }
      else{
        res.send({
          url : req.body.url,
          shortURL : req.headers.host +'/'+docs[0].shortenURL
        })
      }

    })
  }
  else{
    res.end('NOT A VALID URL !')
  }

})



router.get('*', function(req,res){
 UrlShortner.find({
   shortenURL : req.url.slice(1)
 }, (err,docs) => {
   if(err) throw err;
   res.redirect(docs[0].originalURL)
 })

})


module.exports = router;
