var express = require('express');
var router = express.Router();
var store = require('../Model/schema');
var axios = require('axios')

router.get('/', function(req, res, next) {
  res.render('')
});

router.get('/:search/query?*', async (req, res, next) => {
  axios.get('your api key=' + req.params.search + "&num=" + req.query.offset + '&searchType=image').then((response) => res.end(JSON.stringify(response.data.items)));
  var search = new store({search: req.params.search, time: new Date()});
  search.save(function(err) {
    if (err)
      console.log('err');
    }
  )
})

router.get('/recent', (req, res) => {
  store.find().sort('-time').limit(10).exec(function(err, posts){
  var sentPosts = [];
  posts.forEach((v,i)=>{
    sentPosts.push({
      search : v.search,
      time : v.time
    })
  })
      res.end(JSON.stringify(sentPosts))
  })
})

module.exports = router;
