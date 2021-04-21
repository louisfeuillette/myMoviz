var express = require('express');
var router = express.Router();

var request = require('sync-request');
const movies = require('../models/movies');

var movieModel = require('../models/movies')



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/new-movies', function(req, res, next){
  
  var result = request("GET", "https://api.themoviedb.org/3/discover/movie?api_key=f26e61a96a419c1e34b7ba78878db685&language=fr-FR&sort_by=popularity.desc&include_adult=true&include_video=false&page=1");

  var result = JSON.parse(result.body);

  res.json({moviesData: result});
})

router.post('/wishlist-movie', async function(req, res, next) {

  var newMovie = await new movieModel({
    original_title: req.body.movieName,
    backdrop_path: "https://image.tmdb.org/t/p/w500/" + req.body.movieImg,
  })
  var movieSave = await newMovie.save();
  
  var result = false;
  if(movieSave.original_title){
    result = true;
  }
  res.json(result);
});

router.delete('/wishlist-movie/:name', async function(req, res, next) {

  await movieModel.deleteOne({ original_title: req.params.name})

  res.json({result: true});
});

router.get('/wishlist-movie', async function(req, res, next) {

  var movieList = await movieModel.find()
  
  res.json({ movieList });
});

module.exports = router;