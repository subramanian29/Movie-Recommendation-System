const passportLocalMongoose= require('passport-local-mongoose');
const mongoose= require('mongoose')
const Schema= mongoose.Schema;


const UserSchema= new Schema({
    email:{
        type: String,
        required: true,
        unique:true
    },
    watchlist:{
       type: [Number],
       default:[]
    }
});

UserSchema.plugin(passportLocalMongoose);

UserSchema.pre('save', function(next) {
    const user = this;
    if (!user.watchlist) {
        user.watchlist = [];
    }

    user.watchlist = [...new Set(user.watchlist)];
    
    next();
  });

const User= mongoose.model('User',UserSchema);
module.exports=User