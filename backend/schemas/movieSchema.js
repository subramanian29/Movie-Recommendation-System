const mongoose = require('mongoose');

const Schema= mongoose.Schema;
movieSchema= new Schema({
    title:{
        type:String,
        required:true 
    },
    posterUrl:{
        type:String
    },
    _id:{
        type:Number,
        required: true
    },
    overview:{
        type:String
    },
    tagline:{
        type:String
    },
    voteAverage:{
        type:Number
    },
    voteCount:{
        type:Number
    }
});
const Movie=mongoose.model('Movie',movieSchema);


module.exports=Movie;
