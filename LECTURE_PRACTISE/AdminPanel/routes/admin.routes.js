import express from 'express'


const adminRoutes = express.Router()

adminRoutes.get('/dashboard' , (req , res) => {
  res.render('dashboard')
})

adminRoutes.get('/form' , (req ,res) => {
  res.render('form')
})

export default adminRoutes