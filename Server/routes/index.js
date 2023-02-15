var express = require('express');
var router = express.Router();

const movies = require('../data/movies')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



router.get('/most_popular', (req, res, next)=> {
  let page = req.query.page
  if(page === undefined){
    page = 1
  }
  //if(req.query.api_key != 123456){
    //res.json("Invalid API key")
  //}else{
    let results = movies.filter((movie)=>{
      return movie.most_popular
    })
    const startIndex = (page-1) * 20
    results = results.slice(startIndex, startIndex + 19)
    res.json({results})
  //}
})

module.exports = router;
