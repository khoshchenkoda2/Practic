const express = require('express')
const path = require("path")
const fs = require("fs")
const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, './public')));

app.get('*', (req, res) => {
  res.sendFile("index.html", {root: path.join(__dirname, './public')})
})

app.post('/reg-data', (req, res) => {
  const filePath = path.join(__dirname, 'User-data', 'data.txt');
  fs.appendFile(filePath, JSON.stringify(req.body) + "\n", (err) => {
    if(err){
      res.status(500).send("User not added")
    }
    else{
      res.status(201).send("User added")
    }
  })
})

app.listen(port, () => {})