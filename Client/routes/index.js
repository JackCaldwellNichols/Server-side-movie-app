var express = require('express');
var router = express.Router();
const request = require('request');
const { response } = require('../app');

//const apiKey = '1fb720b97cc13e580c2c35e1138f90f8';
const apiKey = "123456"
//const apiBaseUrl = 'http://api.themoviedb.org/3';
const apiBaseUrl = 'http://localhost:3030';
const nowPlayingUrl = `${apiBaseUrl}/most_popular?api_key=${apiKey}`;
const imageBaseUrl = 'http://image.tmdb.org/t/p/w300';
const searchUrl = `${apiBaseUrl}/search/movie?api_key=${apiKey}`;

router.use((req, res, next)=>{
  res.locals.imageBaseUrl = imageBaseUrl
  next()
})

/* GET home page. */
router.get('/', function(req, res, next) {

  request.get(nowPlayingUrl,(error, response, movieData)=>{

    console.log(movieData)
    let parsedData = JSON.parse(movieData)
    // res.json(parsedData)
    res.render('index',{
      parsedData: parsedData.results,
    })
  })
});



router.get('/movie/:id', (req, res, next)=>{
 const movieId = req.params.id;
 const movieUrl = `${apiBaseUrl}/movie/${movieId}?api_key=${apiKey}`
//res.json(req.params)
//res.send(movieUrl)
request.get(movieUrl, (error, response, data)=>{
  const parsedData = JSON.parse(data)
  //console.log(parsedData)
  res.render('details', {
    parsedData
  })
})
})

router.post('/search', (req, res, next)=>{
  //res.send("Check")
  const userSearchTerm = encodeURI(req.body.movieSearch);
  const cat = req.body.cat;

  const searchUrl = `${apiBaseUrl}/search/${cat}?query=${userSearchTerm}&api_key=${apiKey}`;
 // res.send(searchUrl)
  request.get(searchUrl, (error, response, data)=> {
    const parsedData = JSON.parse(data)
    if(cat==='person'){
      parsedData.results = parsedData.results[0].known_for;
    }
    res.render('index', {
      parsedData:parsedData.results
    })
  
  })

})


module.exports = router;
