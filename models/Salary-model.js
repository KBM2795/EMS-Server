import mongoose from "mongoose";

const salarySchema = new mongoose.Schema({
  EmployeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true
  },
  basicSalary: { type: Number, required: true },
  allowances: { type: Number, required: true },
  deductions: { type: Number, required: true },
  netSalary: { type: Number, required: true },
  payDate: { type: Date, required: true },
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
});

const Salary = mongoose.model("salary", salarySchema);
export default Salary;