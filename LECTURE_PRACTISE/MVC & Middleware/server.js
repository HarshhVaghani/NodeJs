// Middlware concept in MVC architecture(Node.js with Express)

// Middleware is a function that sits between reqest and the response in an express application.


// Client -->  Middleware --> Controller --> Response

// MVC 

// M - Model - Database Logic

// V - View - UI / Templete / Static Files

// C - Controller - Bussiness Logic

// MVC + Middleware

/*

Client Request

Middleware(auth , static file , logger)

Controller

View 

*/

import express, { urlencoded } from 'express'
import dotenv from 'dotenv'
import connectDb from './src/db/db.js'

dotenv.config({
  path:"./.env"
})

const app = express()

app.use(express.urlencoded({extended:true}))

app.use("/public/images" , express.static('public/images'));

app.set("view engine" , "ejs")

app.get("/" , (req , res) => {
  res.render('index')
})

app.listen(process.env.PORT , () => {
  connectDb();
  console.log(`Server Start on port ${process.env.PORT}`);
})


