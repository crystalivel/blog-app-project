const express = require('express')
const router = express.Router();
const { readData, writeData } = require('../utils/file-handler')

//show all blogs 
router.get("/", (req, res) => {
    const blogs = readData();
    res.json(blogs)
})
// show a blog
router.get('/:id', (req, res) => {
    const blogs = readData()
    const blog = blogs.find(b => b.id === parseInt(req.params.id))
    if (!blog) return res.status(404).send(`no post was found`)
    res.send(blog)
})
//create a blog
router.post("/", (req, res) => {
    const blogs = readData()
    const newBlog = {
        id: blogs.length + 1,
        title: req.body.title,
        author: req.body.author,
        content: req.body.content,
        createdAtDate: new Date().toISOString(),
        updatedAtDate: new Date().toISOString()
    }
    blogs.push(newBlog)
    writeData(blogs)
    res.status(201).json(newBlog)
})
// update a blog
router.put("/:id", (req, res) => {
    const blogs = readData()
    const index = blogs.findIndex(b => b.id === parseInt(req.params.id))
    if (index === -1) return res.status(404).send(`blog not found`)
    blogs[index] = {
        ...blogs[index],
        ...req.body,
        updatedAtDate: new Date().toISOString()
    }
    writeData(blogs)
    res.json(blogs[index])
})
// delete blog
router.delete("/:id",(req,res) => {
    const blogs = readData(); 
    const blog = blogs.filter(b => b.id !== parseInt(req.params.id))
    if (blog.length === blogs.length) return res.status(404).send(`post not found`)
        writeData(blog)
    res.send({message:'post deleted '})
})

module.exports = router; 
