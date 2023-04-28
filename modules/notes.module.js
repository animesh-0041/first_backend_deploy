const mongoose=require("mongoose");


const notesSchema=mongoose.Schema({
    title:{type:String,required:true},
    body:{type:String,required:true},
    category:{type:String,required:true},
    author:{type:String,required:true},
    authorID:{type:String,required:true}
})

const NotesModel=mongoose.model("notes",notesSchema);

module.exports={
    NotesModel
}