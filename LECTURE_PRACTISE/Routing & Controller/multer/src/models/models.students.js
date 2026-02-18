import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  name:{type:String , required:true},
  email:{type:String , required:true , unique:true},
  course:{type:String , required:true},
  age:{type:Number , required:true}
} , {timestamps:true})

export default mongoose.model("Student" , StudentSchema)


