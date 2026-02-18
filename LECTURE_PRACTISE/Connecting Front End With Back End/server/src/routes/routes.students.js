import { Router } from "express";
import { createStudent , getStudent , getSingleStudent , updateStudent , deleteStudent } from "../controllers/controllers.students.js";

const router = Router();

router.post('/' , createStudent)
router.get('/' , getStudent)
router.get('/:id' , getSingleStudent)
router.put('/:id' , updateStudent)
router.delete('/:id' , deleteStudent)

export default router;