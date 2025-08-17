const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')

const router = express.Router()
const userPath = path.join(__dirname, "../../data/users.json")

const readUsers = () => JSON.parse(fs.readFileSync(userPath, "utf-8"))
const writeUsers = (users) => fs.writeFileSync(userPath, JSON.stringify(users, null, 2))
const JWT_SECRET = process.env.JWT_SECRET;

// register a new user
router.post("/register", (req, res) => {
    const { userName, password } = req.body
    const users = readUsers()
    if (users.find(u => u.userName === userName)) {
        return res.status(400).json({ message: "user already exists" })
    }

    const hashedPassword = bcrypt.hashSync(password, 10)
    const newUser = { id: users.length + 1, userName, password: hashedPassword }
    users.push(newUser)
    writeUsers(users)
})
//login
router.post("/login", (req, res) => {
    const { userName, password } = req.body
    const users = readUsers()

    const user = users.find(u => u.userName === userName)
    if (!user) return res.status(400).json({ message: "invalid credentials" })

    const isMatch = bcrypt.compareSync(password, user.password)
    if (!isMatch) return res.status(400).json({message:"invalid credentials"})

    const token = jwt.sign({id: user.id, userName:user.userName}, JWT_SECRET, {expiresIn: "1h"})
    res.json({message:"login successful",token})
})
module.exports = router;