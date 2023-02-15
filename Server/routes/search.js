var express = require('express');

var router = express.Router();
const people = require('../data/people')
const movies = require('../data/movies');



function queryRequired(req, res, next) {
  const searchTerm = req.query.query
  if(!searchTerm){
    res.json({msg: "Query required."})
  }else{
    next()
  }
}

router.use(queryRequired)

/* GET search page. */
router.get('/movie', (req, res, next)=>{
  const searchTerm = req.query.query
  const results = movies.filter((movie)=>{
    let found = movie.overview.includes(searchTerm) || movie.title.includes(searchTerm)
    return found
  })
  res.json({results})
})


router.get('/person', (req, res, next)=>{
  const searchTerm = req.query.query
  const results = people.filter((person)=>{
    let found = person.name.includes(searchTerm)
    return found
  })
  res.json({results})
})





module.exports = router;