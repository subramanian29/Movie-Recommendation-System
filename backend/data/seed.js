const mongoose= require('mongoose');
const Movie=require('../schemas/movieSchema');
const path = require('path');
const fs= require('fs').promises;

const filePath= path.join(__dirname,'data_cleaned.json');

let movies;

const loadMoviesData = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/MovieDB",{ enableUtf8Validation: false });
    const data = await fs.readFile(filePath,'utf-8');
    movies = JSON.parse(data);
    await Movie.deleteMany({});
    for(let i of movies){
        try{
            const {title,id,tagline,overview,img,vote_average,vote_count}=i
            const movie= new Movie({
                title:title,
                posterUrl:img,
                overview:overview,
                _id:id,
                tagline:tagline,
                voteAverage:vote_average,
                voteCount:vote_count
            });
            await movie.save()
        }
        catch(err){console.log(err)}
    }
    console.log('Movies data loaded successfully.');
    return movies;
  } catch (error) {
    console.error('Failed to load or parse JSON file:', error);
  }
};

// Load the data when the server starts
loadMoviesData();
