const express= require('express')
const mongoose= require('mongoose')
const app=express();
const catchAsync= require('./utils/catchAsync');
const Movie=require('./schemas/movieSchema')
const axios=require('axios')
const cors = require("cors");

require('dotenv').config();
const connectDb=catchAsync(async()=>{
        await mongoose.connect("mongodb://127.0.0.1:27017/MovieDB");
        console.log("Connected to MongoDB!!")

});
connectDb();


app.use(cors())

app.get("/random",catchAsync(async(req,res)=>{
    const data=await Movie.find({});
    const randIdx= Math.floor(Math.random()*(data.length));
    res.json(data[randIdx])

}))

app.get("/similar/:id",catchAsync(async(req,res)=>{
    const fetchedData= await axios.get(`http://localhost:5001/${req.params.id}`)
    const results=fetchedData.data 
    let arr=[];
    for (let result of results){
        const movie= await Movie.findById(result);
        arr.push(movie)
    }
    res.json(arr)

}))

app.get("/:id",catchAsync(async(req,res)=>{
    const id= req.params.id;
    let data= await Movie.findById(id);

    if(!data || data.length==0){
        const url=`https://api.themoviedb.org/3/movie/${id}?language=en-US`;
        fetched=await axios.get(url,
            { 'headers': { 'accept': 'application/json','Authorization': AuthStr } })
        data=fetched.data.results;
        const {title,poster_path,overview,id,tagline,vote_count,vote_average}=data
        const posterUrl="https://image.tmdb.org/t/p/w1280"+poster_path;
        const voteCount=vote_count
        const voteAverage=vote_average
        data={title,posterUrl,overview,_id,tagline,voteCount,voteAverage}
        await Movie.insert(data);
        console.log("Movie Inserted!!")

        
    }
    res.json(data);
}))

app.get("/",catchAsync(async(req,res,next)=>{
    const movieName= req.query.movie;
    let data= await Movie.find({
        title: {
            $regex:movieName,
            $options:'i'
        }
    })

    if(!data || data.length==0)
    {
        const AuthStr = 'Bearer ' + process.env.TMDB_ACCESS_TOKEN;
        const url=`https://api.themoviedb.org/3/search/movie?query=${movieName}`
        fetched=await axios.get(url,
            { 'headers': { 'accept': 'application/json','Authorization': AuthStr } })
        data=fetched.data.results
        data=data.map(obj=>{
            const{title,poster_path,overview,id,tagline,vote_count,vote_average}=obj;
            const _id=id;
            const posterUrl= "https://image.tmdb.org/t/p/w1280"+poster_path;
            const voteCount=vote_count
            const voteAverage=vote_average
            return {title,posterUrl,overview,_id,tagline,voteCount,voteAverage}
        })
        await Movie.insertMany(data)

        console.log("hii")

    }

    res.json(data);
}))


app.listen(5000,()=>{
    console.log("Listening on port 5000")
})