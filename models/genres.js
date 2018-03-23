const mongoose = require('mongoose');

// Genre Schema
const genreSchema = mongoose.Schema({
	name:{
		type: String,
		required: true
	},
	create_date:{
		type: Date,
		default: Date.now
	}
});

const Genre = module.exports = mongoose.model('Genre', genreSchema);

// Get Genres
module.exports.getGenres = (callback, limit) => {
	Genre.find(callback).limit(limit);
}

// Add Genre
module.exports.addGenre = (genre, callback) => {
	Genre.create(genre, callback);
}

module.exports.getGenreById = (id, callback) => {
	Genre.findById(id, callback);
}

// Update Genre
module.exports.updateGenre = (genre ,callback) => {
    var id = genre._id;
    Genre.findById(id, (errr, genres) => {
        genres.name = genre.name;
        Genre.update({_id : id},genres,callback);
    });
}

//remove genre
module.exports.removeGenre = (id, callback) => {
    var query = { _id : id};
    Genre.remove(query,callback);
};