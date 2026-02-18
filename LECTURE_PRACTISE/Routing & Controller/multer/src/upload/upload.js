import multer from "multer";
import path from 'path'

// storage configuration

const storage = multer.diskStorage({
  destination:function(req , file , cb){
    cb(null , "uploads")
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
  limits:{fileSize:7 * 1024 * 1024 },
  fileFilter:filterFile
})

export default upload