const express = require('express')
const app = express()
const postRoute = require("./routes/post-route")

const port = 1000;


//middleware
app.use(express.json())

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

setInterval(() => {}, 1000 * 60 * 60);