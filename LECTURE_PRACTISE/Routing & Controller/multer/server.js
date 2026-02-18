// MongoDB CRUD Operations Using Mongoose and Express

import express from 'express';

import upload from './src/upload/upload.js';

const app = express();
const PORT = 6030;

app.get("/", (req , res) => {
  res.send(
    `
      <h2>File Upload With Multer</h2>
      <form action="/upload"  method="post"  enctype="multipart/form-data">
        <input type="file" name="myFiles"/>
        <button type="submit">Submit</button>
      </form>
    `
  )
})

app.post("/upload" , upload.single("myFiles") , (req , res) => {
  try{
    res.send({
      message:"File Upload Successfully!!",
      file:req.file
      
    })
  }catch(err){
    res.status(400).send({error:err.message})
  } 
})

app.post('/upload-multiple' , upload.array("myFiles" , 5) , (res , req) => {
  try{

    res.send({
      message:"File Upload Successfully!!!",
      files:req.files
    })

  }catch(err){
    res.status(400).send({error:err.message})
  }
})

app.listen(PORT , (err) => {
  console.log('server start on port 6030');
})