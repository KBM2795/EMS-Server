import Department from "../models/Department-model.js";


const getDepartments = async (req, res) => {
    try {
        const departments = await Department.find();
        return res.status(200).json({success:true, departments})
    } catch (error) {
        return res.status(500).json({success:false, error:"get department server error"})
    }
}

const addDepartment = async (req,res)=>{
    try {
        const {dep_name, description} =req.body
       
        const newDep = new Department({
            dep_name, 
            description
        })
        await newDep.save()
        return res.status(200).json({success:true,department:newDep})
    } catch (error) {
        return res.status(500).json({success:false,error:"server error in add department"})
    }

}
 
const getDepartmentById = async (req,res)=>{
    try {
        const {id} = req.params;
        const department = await Department.findById(id)
        return res.status(200).json({success:true,department})
    } catch (error) {
        return res.status(500).json({success:false,error:"server error in get department by id"})
    }
}

const updateDepartment = async (req,res)=>{
    try {
        const {id} = req.params;
        const {dep_name, description} = req.body;
        const updatedDepartment = await Department.findByIdAndUpdate({_id:id},{
            dep_name,
            description
        })
        return res.status(200).json({success:true,department:updatedDepartment})
    } catch (error) {
        return res.status(500).json({success:false,error:"server error in update department"})
    }
}

const deleteDepartment = async (req,res)=>{
    try {
        const {id} = req.params;
        
        const department = await Department.findById({_id:id})
        console.log(department);
        
        
        await department.deleteOne()
        return res.status(200).json({success:true})
    } catch (error) {
        return res.status(500).json({success:false,error:"server error in update department"})
    }
}
export {addDepartment,getDepartments,getDepartmentById,updateDepartment,deleteDepartment}
