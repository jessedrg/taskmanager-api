const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const Task = require('./task')
const userSchema = new mongoose.Schema({
    name:{
       type:String,
       required:true,
       trim:true
    },
    password:{
        required:true,
        type:String,
        validate(data){
            if(data<6 || data.includes('password') ){
                throw Error('not secure password')
            }

        },
        trim:true
 
    },
    age:{
      type:Number,
      default:0,
      validate(value){
          if(value<0){
              throw Error('Age must be positive')
          }

      }
    },
    email:{
        type:String,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw Error('Email invalid')
            }

        },
        trim:true

    },
    tokens:[{
        token:{
        type:String,
        require:true

    }}],
    avatar:{
        type:Buffer
    }

},{
    timestamps:true
})
userSchema.virtual('tasks',{
    ref:'Task',
    localField:'_id',
    foreignField:'owner'

})
userSchema.methods.generateAuthToken = async function(){
    const user = this;
    const token = jwt.sign({_id:user._id.toString()},'thisismynewcourse',)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token

}
userSchema.methods.toJSON =  function() {
    const user = this;
    const userObject = user.toObject()
    delete userObject.password;
    delete userObject.tokens
    delete userObject.avatar
    return userObject
}
userSchema.statics.findByCredentials = async (email,password)=>{
    const user = await User.findOne({email})
    if(!user){
        throw new Error('unable to log in')
    }
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        throw new Error('unable to log in')
    }
    return user

}
userSchema.pre('save',async function(next){
    const user = this;
    if(user.isModified('password')){
        user.password =await bcrypt.hash(user.password,8)
    }
    next()


})
userSchema.pre('remove',async function(next){

    const user = this;
    Task.deleteMany({owner:user._id})

    next()
})
const User = mongoose.model('User',userSchema);


module.exports = User;