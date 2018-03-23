const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

Genre = require('./models/genres');
Book = require('./models/books');
Registration = require('./models/registration');

// use this middle ware to parse the post data...
app.use(bodyParser.json());


app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

mongoose.connect('mongodb://localhost/bookstore');

var db = mongoose.connection;

app.get('/api/genres', (req, res) => {
	Genre.getGenres((err, genres) => {
		if(err){
			throw err;
		}
		res.json(genres);
	});
});

app.post('/api/genres', (req, res) => {
	var genre = req.body;
	Genre.addGenre(genre, (err, genre) => {
		if(err){
			throw err;
		}
		res.json(genre);
	});
});

app.get('/api/genres/:_id', (req, res) => {
	Genre.getGenreById(req.params._id, (err, genre) => {
		if(err){
			throw err;
		}
		res.json(genre);
	});
});

app.get('/api/books', (req, res) => {
	Book.getBooks((err, books) => {
		if(err){
			throw err;
		}
		res.json(books);
	});
});

app.get('/api/books/:_id', (req, res) => {
	Book.getBookById(req.params._id, (err, book) => {
		if(err){
			throw err;
		}
		res.json(book);
	});
});


app.post('/api/books',(req,res) => {
    var book = req.body;
    Book.addBook(book,(err,book) => {
        if(err){
			throw err;
		}
		res.json(book);
    });
});

app.delete('/api/books/:_id',(req, res) => {
    Book.removeBook(req.params._id,(err,book)=>{
        if(err){
			throw err;
		}
		res.json(book);
    });
});

app.post('/api/genress',(req , res) => {
	var genre = req.body;
    Genre.updateGenre(genre,(err, genre)=> {
        if(err){
			throw err;
		}
		res.json(genre);
    });
});

app.post('/api/bookss',(req , res) => {
    var book = req.body;
    Book.updateBook(book,(err, book)=>{
        if(err){
			throw err;
		}
		res.json(book);
    });
});


app.delete('/api/genres/:_id',(req, res) => {
    Genre.removeGenre(req.params._id,(err,genre)=>{
        if(err){
			throw err;
		}
		res.json(genre);
    });
});

app.get('/api/registrations', (req , res) => {
	Registration.getRegistrations((err , registration) => {
		if(err){
			throw err;
		}
		res.json(registration);
	});
});

app.post('/api/registrations', (req , res) => {
	var reg = req.body;
	Registration.saveRegistration(reg,(err , registrations) => {
		if(err){
			throw err;
		}
		res.status(200).json(registrations);
	});
});


app.post('/api/registrations/login',(req , res) => {
	var login = req.body;
	Registration.checkLogin(login,(err, registrations)=>{
		if(err){
			throw err;
		}
		res.status(200).json(registrations);
	})
});

const port = process.env.PORT || 1234;
app.listen(port,()=> console.log(`the app is listening to ${port}`));