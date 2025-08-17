const express = require('express')
const router = express.Router();
const { readData, writeData } = require('../utils/file-store')
const jwt = require("jsonwebtoken");


const JWT_SECRET = process.env.JWT_SECRET;

//middleware for tokken 

function authMiddleware(req, res, next) {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.status(401).json({ message: "No token provided" });

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token malformed" });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid token" });
        req.user = user;
        next();
    });
}
//show all blogs 
router.get("/", authMiddleware, (req, res) => {
    const blogs = readData();
    res.json(blogs)
})
// show a blog
router.get('/:id', authMiddleware, (req, res) => {
    const blogs = readData()
    const blog = blogs.find(b => b.id === parseInt(req.params.id))
    if (!blog) return res.status(404).send(`no post was found`)
    res.send(blog)
})
//create a blog
router.post("/", authMiddleware, (req, res) => {
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
router.put("/:id", authMiddleware, (req, res) => {
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
router.delete("/:id", authMiddleware, (req, res) => {
    const blogs = readData();
    const blog = blogs.filter(b => b.id !== parseInt(req.params.id))
    if (blog.length === blogs.length) return res.status(404).send(`post not found`)
    writeData(blog)
    res.send({ message: 'post deleted ' })
})

module.exports = router; 
