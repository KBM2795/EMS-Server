import Leave from '../models/Leave-model.js';
import Employee from '../models/Employee-model.js';

const applyLeave = async (req,res ) => {
   try {
     const {userId, type, from,to ,description} = req.body;
     const employee = await Employee.findOne({userId})
     if (!employee) {
       return res.status(404).json({ success: false, message: "Employee not found" });
     }
    
    
     const newLeave = new Leave({
            employeeId: employee._id,
            type,
            from,
            to,
            description,
     })

     await newLeave.save();
     res.status(201).json({ success: true, message: "Leave applied successfully" });
   } catch (error) {
    res.status(500).json({ success: false, message: error.message });
   }
}

const fetchLeave = async (req,res) => {
  try {
    const {id} = req.params;
   
    const employee = await Employee.findOne({userId:id})
    if (!employee) {
      return res.status(404).json({ success: false, message: "Employee not found" });
    }

    const leave = await Leave.find({employeeId: employee._id}).populate('employeeId');
    
    
    res.status(200).json({ success: true, leave });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const fetchLeaveAdmin = async (req,res) => {
  try {
    
    const leave = await Leave.find().populate('employeeId')
    console.log(leave);
    
    
    res.status(200).json({ success: true, leave });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message})
  }
}


const responseLeave = async (req, res) => {
  try {
     const {id} = req.params;
     const {status} = req.body;

    const leave = await Leave.findOneAndUpdate({_id: id }, {status: status})
   
     res.status(200).json({ success: true, leave})

  } catch (error) {
    res.status(500).json({ success: false, message: error.message})
  }
}
export { applyLeave,fetchLeave,fetchLeaveAdmin,responseLeave }