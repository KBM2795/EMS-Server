import Department from "../models/Department-model.js";
import Employee from "../models/Employee-model.js"
import Leave from "../models/Leave-model.js";


const getSummary =  async(req,res) =>{
try {
    
    const totalEMployees = await Employee.countDocuments();
    const totalDepartments = await Department.countDocuments()

    const totalSalaries = await Employee.aggregate([
        {$group: {_id: null, totalSalary: {$sum : "$salary"}}}
    ])

    const employeeAppliedForLeave = await Leave.find()

    const leaveStatus = await Leave.aggregate([
        {$group: {
            _id : "$status",
            count: {$sum: 1}
        }}
    ])

    const leaveSummary = {
        appliedFor : employeeAppliedForLeave.length,
        approved: leaveStatus.find(item => item._id === "Approved")?.count || 0,
        rejected: leaveStatus.find(item => item._id === "Rejected")?.count || 0,
        pending: leaveStatus.find(item => item._id === "Pending")?.count || 0
    }

    
    
    return res.status(200).json({
        success:true,
        totalEMployees,
        totalDepartments,
        totalSalary: totalSalaries[0]?.totalSalary || 0,
        leaveSummary
    })

} catch (error) {
    res.status(500).json({success:false,error:"Error fetching employees"}); 
}
}

export {getSummary}

