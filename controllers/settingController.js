import User from "../models/user-model.js";
import bcrypt from "bcrypt";

const changePassword = async (req,res)=>{
try {
     const {userId,oldPassword,newPassword} = req.body;
    
     const user = await User.findById({_id: userId})
    if(!user){
        return res.status(400).json({success: false,error: "setting error user not found"})
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password)

     if(!isMatch){
        return res.status(400).json({success: false,error: "old password is not correct"})
     }

     const hashPassword = await bcrypt.hash(newPassword,10)

     const newUser = await User.findByIdAndUpdate({_id:userId}, {password: hashPassword})

     return res.status(200).json({success:true})

} catch (error) {
    return res.status(500).json({success: false,error: "setting error"})
}

}

export  {changePassword}