const express=require("express");
const bcrypt=require("bcrypt")
const {auth}=require("../middlewares/auth.middlewares")
const {UsersModule}=require("../modules/users.module")
const usersRoute=express.Router();
const jwt = require('jsonwebtoken');

//home
usersRoute.get("/",async(req,res)=>{
    try {
        res.send("Home Page")
    } catch (error) {
        res.send({"err":error})
    }
})
//about
usersRoute.get("/about",async(req,res)=>{
    try {
        res.send("About Page")
    } catch (error) {
        res.send({"err":error})
    }
})
//contact
usersRoute.get("/contact",async(req,res)=>{
    try {
        res.send("contact Page")
    } catch (error) {
        res.send({"err":error})
    }
})




// register
usersRoute.post("/register",async(req,res)=>{
    const {name,age,email,password}=req.body

    try {

        bcrypt.hash(password, 5, async(err, hash)=> {
            // Store hash in your password DB.
            const user=new UsersModule({email,password:hash,age,name});
           await user.save();
            res.status(200).send({"msg":"Resgister successful"})
        });      
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})
//login
usersRoute.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try {
        const user=await UsersModule.findOne({email})
    if(user){
        bcrypt.compare(password, user.password, (err, result)=> {
            if(result){
                const token = jwt.sign({ authorID:user._id,author:user.name }, 'masai');
                res.status(200).send({"msg":"Login successful","token":token})
            }else{
                res.send({"msg":"wrong credentials!"})
            }
        });
    } else{
        res.status(200).send({"msg":"Wrong credentials"})
    }  
       
    } catch (error) {
        res.status(400).send({"msg":error})
    }
})

usersRoute.use(auth)

// <---- protected----->
//movies
usersRoute.get("/movies",async(req,res)=>{

    try {
                res.status(200).send("movies data")
    } catch (error) {
        res.send({"err":error})
    }
})
//series
usersRoute.get("/series",async(req,res)=>{
    try {
       
    res.status(200).send("series data")
           
          
    } catch (error) {
        res.send({"err":error})
    }
})



module.exports={
    usersRoute
}