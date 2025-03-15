import mongoose from "mongoose";
import { Schema } from "mongoose";

const employeeSchema = new Schema({
   
    userId:{
        type:Schema.Types.ObjectId,
        ref:"user",
        required:true,
        unique:true
    },
    employeeId:{
        type:String,
        required:true,
        unique:true
    },
    dob:{
        type:Date,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    maritalStatus:{
        type:String
    },
    designation:{
        type:String,
        required:true   
    },
    salary:{
        type:Number,
        required:true
    },  
    department:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Department",
        required:true
    },
    createdAt:{
         type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    }

})

const Employee = mongoose.model("Employee",employeeSchema)

export default Employee
