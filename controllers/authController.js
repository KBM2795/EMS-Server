import jwt from "jsonwebtoken";
import User from "../models/user-model.js"
import bcrypt from "bcrypt"


const login = async function (req,res){
    try {
        const {email,password} = req.body;
        
         
        const user = await User.findOne({email})
        
        
        if (!user) {
            res.status(404).json({success: false ,error: 'User not found'})
        }
  
        const ismatch =await bcrypt.compare(password,user.password)

        if(!ismatch) {
           return res.status(401).json({success: false ,error: 'Password or email is incorrect'})
        }

        const token = jwt.sign({id_:user.id , role: user.role }, process.env.JWT_KEY, {expiresIn: "10d"} )

        res
        .status(200)
        .json({
            success: true,
             token ,
             user : {_id: user._id , name: user.name  , role: user.role },
            })

    } catch (error) {
       res.status(500).json({ success: false, error: error.message})

    }
}

const verify = (req, res) => {
   
    
    return res.status(200).json({success: true, error:req.user})
}


export {login, verify};