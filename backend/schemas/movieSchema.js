const { default: mongoose } = require('mongoose');

const Schema= require('mongoose').Schema;


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

module.exports=mongoose.model('Movie',movieSchema);