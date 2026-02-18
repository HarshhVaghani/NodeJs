import Student from '../models/models.students.js'

// createStudent

export const createStudent = async(req , res) => {
  try{
      const student = await Student(req.body)
      await student.save();
      res.status(201).json(student)
  }catch(err){
    res.status(400).json({error:err.message})
  }
}

// readStudent

export const getStudent = async(req , res) => {
  try{

  }catch(){

  }
}

// getSingleStudent

export const getSingleStudent = async(req , res) => {
  try{

  }catch(){

  }
}

// updateStudent

export const updateStudent = async(req, res) => {
  try{

  }catch(){

  }
}

// deleteStudent

export const deleteStudent = async(req , res) => {
  try{

  }catch(){

  }
}
