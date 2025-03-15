import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema({
 employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true
  },
    type: { type: String, required: true },
    from: { type: Date, required: true },
    to: { type: Date, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
    appliedAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
});

const Leave = mongoose.model("leave", leaveSchema);
export default Leave;