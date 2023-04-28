const express=require("express")
const {connection}=require("./db");
const {usersRoute}=require("./routes/users.route")
const {notesRoute}=require("./routes/notes.route")
const {auth}=require("./middlewares/auth.middlewares")
const cors = require('cors')
require('dotenv').config()
const app=express()
app.use(cors())
app.use(express.json())

app.use("/users",usersRoute)
app.use(auth)
app.use("/notes",notesRoute)


app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("connected to DB");
    } catch (error) {
        console.log(error);
    }
    console.log(`runing at ${process.env.port}`);
})