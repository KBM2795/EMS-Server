import express from "express"
import authMiddleware from "../middleware/authMiddleware.js"

import {addEmployee,upload,getEmployees,getEmployeeById,updateEmployee,getEmployeeByName } from "../controllers/employeeController.js" 

const router = express.Router() 

router.post('/add',authMiddleware ,upload.single("image"),addEmployee)
router.get('/',authMiddleware ,getEmployees) 
router.get('/:id',authMiddleware ,getEmployeeById)
router.put('/:id',authMiddleware ,updateEmployee)
router.get('/department/:department',authMiddleware ,getEmployeeByName)

export default router;