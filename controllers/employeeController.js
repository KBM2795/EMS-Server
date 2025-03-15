import Employee from "../models/Employee-model.js"
import User from "../models/user-model.js"
import bcrypt from "bcrypt"
import multer from "multer"
import path from "path"

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"public/uploads")
    },
    filename:function(req,file,cb){
        cb(null,Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage:storage})

const addEmployee = async (req,res) => {
    try {
        const {email,name,employeeId,dob,gender,maritalStatus,designation,salary,role,password,department} = req.body
       const user = await User.findOne({email})

       if(user){
        return res.status(400).json({message:"User already exists"})
       }

       
       const hashPassword = await bcrypt.hash(password,10)
       
       const newUser = await User({
        name,
        email,
        password:hashPassword,
        role,
        profileimg:req.file ? req.file.filename : ''
        
       })
   const savedUser = await newUser.save()
    
    

   const newEmployee = await Employee({
    userId:savedUser._id,
    employeeId,
    dob,
    gender,
    maritalStatus,
    designation,
    salary,
    department,
   })
   await newEmployee.save()
   res.status(201).json({success:true,message:"Employee added successfully"})

    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const getEmployees = async (req,res) => {
    try {
        const employees = await Employee.find().populate('userId', {password: 0}).populate('department')
        
        res.status(200).json({success:true,employees})
    } catch (error) {
        res.status(500).json({success:false,error:"Error fetching employees"});
    }
};

const getEmployeeById = async (req,res) => {
    const {id} = req.params;
    
    try {
        let employee ;
        employee= await Employee.findById({_id: id}).populate('userId', {password: 0}).populate('department')
        if(!employee){
          employee= await Employee.findOne({userId: id}).populate('userId', {password: 0}).populate('department')
        }
      
        res.status(200).json({success:true,employee})
    } catch (error) {
        res.status(500).json({success:false,error:"Error fetching employee"});
    }
};

const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const {userId, maritalStatus, designation, salary } = req.body;
    
       
        
    
        const employee = await Employee.findById(id);
        if (!employee) {
          return res.status(404).json({ message: "Employee not found" });
        }
    
        const user = await User.findById(employee.userId);
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
    
        const updateUser = await User.findByIdAndUpdate(
          { _id: user._id },
          {
            name: userId.name,
            profileimg: userId.image ,
          },
          
        );
    
        const updatedEmployee = await Employee.findByIdAndUpdate(
          { _id: id },
          {
            maritalStatus,
            designation,
            salary,
          },
         
        );
    
        if (updateUser !== null || updatedEmployee !== null) {
          res.status(200).json({ success: true, message: "Employee updated successfully" });
        } else {
          res.status(500).json({ message: "Error updating employee" });
        }
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}

const getEmployeeByName = async (req,res) => {
    const {department} = req.params;
    try {
        const employees = await Employee
        .find({department:department})  
        .populate('userId', {password: 0})
        .populate('department') 
      
       
        
        res.status(200).json({success:true,employees})
        }catch (error) {
        res.status(500).json({success:false,error:"Error fetching employees"}); 
    }
};

export {addEmployee,upload,getEmployees,getEmployeeById,updateEmployee,getEmployeeByName }
