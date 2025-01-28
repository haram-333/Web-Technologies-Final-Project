const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const app = express();

dotenv.config();

const Employee = require("./models/employee");
// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

// Database Connection
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("DB Connection Error:", err));

// Routes
app.get("/", async (req, res) => {
    try {
      // Fetch all employees from the database
      const employees = await Employee.find();
  
      // Render the EJS template and pass employees data
      res.render("index", { employees });
    } catch (err) {
      console.error("Error fetching employees:", err);
      res.status(500).send("An error occurred while fetching employees.");
    }
  });



const employeeRoutes = require("./routes/employeeRoutes");
app.use("/", employeeRoutes);


// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
