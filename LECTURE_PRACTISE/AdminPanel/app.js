import express from 'express'
import dotenv from 'dotenv'
import adminRoutes from './routes/admin.routes.js'
import path from 'path'
import e from 'express'

dotenv.config({
  path:'./.env'
})

const app = express()

const port = process.env.PORT

app.use(express.urlencoded({extended:true}))

app.use(express.json())

app.set('view engine' , 'ejs');
app.set('views' , path.resolve('views'))

// middleware

app.use('/admin' , adminRoutes)

app.listen(port , () => {
  console.log(`server start on port ${port}`);
  
})