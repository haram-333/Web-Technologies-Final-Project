const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    department: String,
    salary: Number,
    joiningDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Employee", employeeSchema);
