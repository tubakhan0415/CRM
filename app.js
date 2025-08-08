require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const sequelize = require("./config/db");

// Models
require("./models/Log");
require("./models/Vendor");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));               // 🔑 Signup/Login
app.use("/api/dashboard", require("./routes/dashboardRoutes"));     // 📊 Dashboard
app.use("/api/expenses", require("./routes/expenseEntryRoutes"));   // 💵 Expenses with file upload
app.use("/api/expense-simple", require("./routes/expenseRoutes"));  // 💵 Simple Expenses (alt)
app.use("/api/financials", require("./routes/financialRoutes"));    // 💰 Financial data upload
app.use("/api/issues", require("./routes/issueRoutes"));            // 🐞 Issues CRUD
app.use("/api/logs", require("./routes/logRoutes"));                // 📋 Logs + upload
app.use("/api/photos", require("./routes/photoRoutes"));            // 📸 Photos CRUD
app.use("/api/projects", require("./routes/projectRoutes"));        // 📁 Project management
app.use("/api/vendor", require("./routes/vendorRoutes"));           // 🛒 Vendors

app.get("/", (req, res) => {
  res.send("✅ API is running...");
});

// Sync DB
sequelize.sync({ alter: true })
  .then(() => console.log("✅ Database synced"))
  .catch((err) => console.error("❌ Sync error:", err));

module.exports = app;
