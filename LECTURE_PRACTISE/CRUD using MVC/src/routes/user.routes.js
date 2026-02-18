import { createUser , deleteUser , updateUser , singleUser , getUser } from "../controllers/user.controller.js";
import express from 'express'


let router = express.Router()

router.post("/" , createUser)
router.get("/" , getUser)
router.get("/:id" , singleUser)
router.put("/:id" , updateUser)
router.delete("/:id" , deleteUser)

export default router