const mongoose=require("mongoose");


const usersSchema=mongoose.Schema({
    name:{type:String,required:true},
    age:{type:Number,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true}
})

const UsersModule=mongoose.model("user",usersSchema);

module.exports={
    UsersModule
}