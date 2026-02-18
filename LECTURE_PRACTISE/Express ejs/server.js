// Express Js
const express = require('express')
const port = 8980

const app = express()

app.set("view engine" , "ejs")

app.use(express.urlencoded({extended:true}))

app.get('/' , (req , res) => {
  res.render("index" , {name:"Red And White"})
})

app.listen(port , () => {
  console.log(`server start on port ${port}`);
})