import express from 'express';
import multer from "multer";
import path from 'path'

const app = express();
const PORT = 6030;

// storage configuration

const storage = multer.diskStorage({
  destination:function(req , file , cb){
    cb(null , "/uploads")
  },
  filename:function(req , file , cb){
    cb(null , Date.now() + path.extname(file.originalname));
  }
})

// file filter 

const filterFile = (req , file , cb) => {

  const allowTypes = /jpeg | pdf | jpg | png /;

  const extname = allowTypes.test(path.extname(file.originalname).toLowerCase())

  console.log('extname' , extname);

  const mimetype = allowTypes.test(file.mimetype)

  console.log(mimetype);
  
  if(extname && mimetype){
    cb(new Error("Only Images and Pdf files are allowed!!"))
  }else{
    cb(null , true)
  }
}

// multer configuration

const upload = multer({
  storage:storage,
  limits:{fileSize:1 * 1024 * 1024 },
  fileFilter:filterFile
})

// routes

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