import express from "express"
import authMiddleware from "../middleware/authMiddleware.js"

import {addSalary, getSalary,latestSalary} from "../controllers/salaryController.js"


const router = express.Router() 

router.get('/:id',authMiddleware, getSalary)
router.post('/add',authMiddleware,addSalary)  
router.get('/latest/:id',authMiddleware,latestSalary)

export default router;