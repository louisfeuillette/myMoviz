var mongoose = require('mongoose')

var movieSchema = mongoose.Schema({
    original_title: String,
    overview: String,
    vote_average: Number,
    vote_count: Number,
    backdrop_path: String
});

module.exports = mongoose.model('movies', movieSchema)