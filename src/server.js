require('dotenv').config() 
const cors = require("cors");
const express = require('express')
const app = express()
const postRoute = require("./routes/post-route")
const authRouter = require("./routes/auth-users") 

const port = 1000;


//middleware
app.use(cors());
app.use(express.json())
app.use("/auth", authRouter);

//routes
app.use("/blogs",postRoute)


// default route 
app.get("/", (req,res) => {
    res.send('welcome to the blog app')
})

//
app.listen(port,() => {
    console.log(`the server is running on port ${port}`)
})