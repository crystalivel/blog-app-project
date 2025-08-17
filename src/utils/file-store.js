const fs = require('fs')
const path = require('path')

//file path 
const datapath = path.join(__dirname, "../../data/data.json")
//read data
const readData = () => {
    const data = fs.readFileSync(datapath)
    return JSON.parse(data)
}
// write data
const writeData = (data) => {
    fs.writeFileSync(datapath,JSON.stringify(data,null,2))
}
module.exports = { readData, writeData };