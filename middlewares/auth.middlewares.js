const express=require("express");
const jwt = require('jsonwebtoken');

const auth=async(req,res,next)=>{
    const token=req.headers.authorization;
    if(token){
        try {
            jwt.verify(token, 'masai', (err, decoded)=> {
                if(decoded){
                    
                    req.body.authorID=decoded.authorID;
                    req.body.author=decoded.author
             
                   next( )
                }else{
                    res.status(400).send({"msg":err.message})
                }
              });
        } catch (error) {
            res.send(error)
        }

    }else{
        res.send({"err":"Please login!"})
    }
   
    
}
module.exports={
    auth
}