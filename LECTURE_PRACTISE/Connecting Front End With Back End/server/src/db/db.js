import mongoose from "mongoose"

export const connectDB = async() => {
  try{
    const database = await mongoose.connect(`${process.env.MONGODB_URI}`)
    console.log(database.connection.host);

  }catch(err){
    console.log(err);
  }
}