import express from "express"
import authMiddleware from "../middleware/authMiddleware.js"


import {applyLeave,fetchLeave,fetchLeaveAdmin,responseLeave} from "../controllers/leaveController.js"

const router = express.Router() 


router.post('/apply',authMiddleware,applyLeave)  
router.get('/:id',authMiddleware,fetchLeave)
router.get('/',authMiddleware,fetchLeaveAdmin)
router.put('/:id',authMiddleware,responseLeave)

export default router;