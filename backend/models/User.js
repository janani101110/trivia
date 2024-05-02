const mongoose=require('mongoose')

const UserSchema=new mongoose.Schema({
    username: {
        type:String,
        required:false,
        unique:true,
    },
    email:{
        type:String,
        required:false,
        unique:true,
    },
    password:{
        type:String,
        required:false,
    },
    timespans:{
        type:String,
        required:false,
    },
    googleId:{
        type:String,
        required:false,
    },
})


UserSchema.statics.findOrCreate = async function (profile, cb) {
    try {
      const user = await this.findOne({ googleId: profile.id });
      if (user) {
        return cb(null, user);
      } else {
        const newUser = new this({
          googleId: profile.id,
          // Add any other relevant fields from the Google profile
        });
        const savedUser = await newUser.save();
        return cb(null, savedUser);
      }
    } catch (err) {
      return cb(err, null);
    }
  };


module.exports=mongoose.model("User",UserSchema)

