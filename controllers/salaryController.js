import Salary from '../models/Salary-model.js'; // Ensure the Salary model is imported
import Employee from '../models/Employee-model.js'; // Ensure the Employee model is imported

const addSalary = async (req, res) => {
  try {
    const { basicSalary, allowances, deductions, payDate, employee } = req.body;

    const netsalary = parseInt(basicSalary) + parseInt(allowances) - parseInt(deductions);
    
    const newSalary = new Salary({
      EmployeeId: employee,
      basicSalary,
      allowances,
      deductions,
      netSalary: netsalary,
      payDate
    });

    await newSalary.save();
    res.status(201).json({ success: true, message: "Salary added successfully" });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getSalary = async (req, res) => {
  try {
    const {id} = req.params;
    let salary;
     salary = await Salary.find({EmployeeId: id}).populate('EmployeeId');

    if(!salary || salary.length < 1 ) {
      const employee = await Employee.findOne({userId: id});

      salary = await Salary.find({EmployeeId: employee._id}).populate('EmployeeId');
    }

    res.status(200).json({ success: true, salary });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const latestSalary = async (req, res) => {
  try {
    const {id} = req.params;
    const employee = await Employee.findOne({userId: id});

      const salary = await Salary.find({EmployeeId: employee._id}).populate('EmployeeId');

      const latestSalaryRecord = salary.sort((a, b) => new Date(b.createAt) - new Date(a.createAt))[0];
      res.status(200).json({ success: true, salary: latestSalaryRecord });
      
      
      
  
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export { addSalary, getSalary ,latestSalary};