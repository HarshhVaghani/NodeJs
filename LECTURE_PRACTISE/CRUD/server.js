const bodyParser = require('body-parser');
const express = require('express');
const port = 5030

const app = express()

app.use(bodyParser.urlencoded({extended:true}))

app.set("view engine" , "ejs")

// CRUD 

let users = [];

console.log(users);

let id = 1;

app.get('/' , (req , res) => {
  res.render("index" , {users})
})

app.get('/add' , (req , res) => {
  res.render("add")
})

app.post("/add", (req , res) => {

  const {name , email} = req.body 

  users.push({id:id++ , name , email})

  res.redirect("/")

})

app.get("/edit" , (req , res) => {
  res.render("edit")
})

app.listen(port , () => {
  console.log(`server start on port ${port}`);
})