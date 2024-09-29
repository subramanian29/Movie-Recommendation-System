const express= require('express')
const mongoose= require('mongoose')
const app=express();
const catchAsync= require('./utils/catchAsync');
const Movie=require('./schemas/movieSchema')
const User= require('./schemas/userSchema')
const axios=require('axios')
const cors = require("cors");
const session= require("express-session")





const passport= require('passport')
const strategy= require('passport-local')


require('dotenv').config();


app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5002', 
    credentials: true 
}))

app.use(session({secret:"tomnjerry",resave: false,
    saveUninitialized: true,}))

app.use(passport.initialize());
app.use(passport.session());

passport.use(new strategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


const connectDb=catchAsync(async()=>{
    await mongoose.connect("mongodb://127.0.0.1:27017/MovieDB");
    console.log("Connected to MongoDB!!")

});
connectDb();

app.get("/status",(req,res)=>{
    if(req.isAuthenticated()) {res.json({user:req.user.username})}
    else{res.json(false)}

})


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



app.post("/register", catchAsync(async (req, res, next) => {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    
    if (existingUser) {
        if (existingUser.username === username) {
            return res.status(400).json({
                success: false,
                message: "Username already exists",
                field: "username"
            });
        }
        if (existingUser.email === email) {
            return res.status(400).json({
                success: false,
                message: "An account with this email is already registered",
                field: "email"
            });
        }
    }
    
    const user = new User({ username, email });

    const regUser = await User.register(user, password);
    req.login(regUser, err => {
        if (err) return next(err);
        return res.json({ success: true, user: req.user.username });
    });

    
    
}));


app.post("/login",passport.authenticate('local'),(req,res)=>{
    res.json({success:true,user:req.user.username});

})

app.get("/logout",(req,res,next)=>{

    req.logout((err)=>{
        if(err) return next(err);
        res.json({success:true});

    });
    console.log(req.user)
})

app.post("/watchlist", catchAsync(async (req,res)=>{


    if(req.user){
        const {id,remove}=req.body;
        const user= await User.findById(req.user._id);
        
        if(!remove){
            user.watchlist.push(id);
        }
        else
        {
            user.watchlist.remove(id)
        }
        await user.save();

    
        res.json({success:true});
    }
    else{
        res.json({success:false});
    }



}))

app.get("/watchlist",catchAsync(async(req,res)=>{

    if(req.user){
        const user = await User.findById(req.user._id)
                                        .populate({
                                            path: 'watchlist',
                                            model: 'Movie',
                                            localField: 'watchlist',
                                            foreignField: '_id', 
                                            
                                        })
                                        .exec();
        const watchlist= user.watchlist;
        return res.json(watchlist);
    }
    res.send(false)


}))

app.post("/inwatchlist",catchAsync(async(req,res)=>{

    if(req.user){
        const {id}=req.body;
        const user = await User.findById(req.user._id);
        const watchlist= user.watchlist;
        const wl= new Set(watchlist);

        if(wl.has(id)){
            return res.json({success:true});

        }
        
    }
    return res.json({success:false});


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


    }

    res.json(data);
}))



app.listen(5000,()=>{
    console.log("Listening on port 5000")
})