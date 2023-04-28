const express=require("express");
const {NotesModel}=require("../modules/notes.module");




const notesRoute=express.Router();
//read
notesRoute.get("/",async(req,res)=>{
    try {
        const notes=await NotesModel.find({authorID:req.body.authorID})
        res.send(notes)
    } catch (error) {
        res.send(error)
    }

})

//create
notesRoute.post("/add",async(req,res)=>{
    try {
        const note=new NotesModel(req.body);
        await note.save();
        res.send({"msg":"new notes has been added"})
    } catch (error) {
        res.send(error)
    }

})

//update
notesRoute.patch("/update/:id",async(req,res)=>{
    const {id}=req.params;
    const note=await NotesModel.findOne({_id:id})
    try {
        if(req.body.authorID==note.authorID){

            await NotesModel.findByIdAndUpdate({_id:id},req.body);
            res.send(`${id} data updated`)
        }
else{
    res.send({"msg":"You are not authenticate!"})
}

    } catch (error) {
        res.send(error)
    }

})
//delete
notesRoute.delete("/delete/:id",async(req,res)=>{
const {id}=req.params;
const note=await NotesModel.findOne({_id:id});
try {
    if(req.body.authorID==note.authorID){

        await NotesModel.findByIdAndDelete({_id:id})
        res.send(`${id} note deleted`)
    }else{
        res.send({"msg":"You are not authenticate!"})
 
    }

} catch (error) {
    res.send(error)
}
})

module.exports={
    notesRoute
}

