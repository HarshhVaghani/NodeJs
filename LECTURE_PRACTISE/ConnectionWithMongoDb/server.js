import express from 'express'
import dotenv from 'dotenv'
import connectDb from './src/db/db.js'
import router from './src/routes/user.routes.js'
import cors from 'cors'

dotenv.config({
  path:"./.env"
})

const app = express()

app.use(cors({
  origin:"*"
}));

app.use(express.json())

app.use(express.urlencoded({extended:true}))

app.use("/users" , router)

app.listen(process.env.PORT , () => {
  connectDb();
  console.log(`Server Start on port ${process.env.PORT}`);
})


