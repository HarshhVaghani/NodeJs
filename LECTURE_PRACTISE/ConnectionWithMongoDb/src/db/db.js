import mongoose from "mongoose";

const connectDb = async () => {
  try{

    const connect = await mongoose.connect(`${process.env.MONGODB_URL}`)
    console.log('Mongodb connected!' , connect.connection.host);
  
  }catch(err){
    console.log('Mongodb connection Error' , err);
    process.exit(1)
  }
}

export default connectDb