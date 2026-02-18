import Student from "../models/models.students.js";

// createStudent

export const createStudent = async (req, res) => {
  try {
    const student = await Student(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// readStudent

export const getStudent = async (req, res) => {
  try {
    const student = await Student.find();
    res.status(200).json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// getSingleStudent

export const getSingleStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    res.status(200).json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// updateStudent

export const updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id);
    res.status(200).json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// deleteStudent

export const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    res.status(200).json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
