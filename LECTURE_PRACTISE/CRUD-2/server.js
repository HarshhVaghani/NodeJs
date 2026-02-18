const bodyParser = require('body-parser');
const express = require('express');
const dotenv = require('dotenv')

dotenv.config({
  path:"./.env"
})

const port = process.env.PORT

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


// create user

app.get('/add' , (req , res) => {
  res.render("add")
})

app.post("/add", (req , res) => {

  const {name , email} = req.body // {name:"Ajay" , "email":"exmple@gmail.com"}

  users.push({id:id++ , name , email})

  res.redirect("/")

})

// edit user
app.get("/edit" , (req , res) => {
  res.render("edit")
})

app.get("/edit/:id" , (req , res) => {
  const user = users.find(u => u.id == req.params.id)
  res.render("edit" , { user })
})

app.post("/edit/:id" , (req , res) => {
  const user = users.find(u => u.id == req.params.id)

  user.name = req.body.name
  user.email = req.body.email

  res.redirect("/")
})

// delete user

app.get("/delete/:id" , (req , res) => {
  users = users.filter(u => u.id != req.params.id)
  res.redirect("/")
})


app.listen(port , () => {
  console.log(`server start on port ${port}`);
})