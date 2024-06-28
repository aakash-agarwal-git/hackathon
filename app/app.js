require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("../config/db");
const routes = require("./routes/");
const scheduler = require("./cron/index");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Connect to MongoDB
connectDB();
scheduler.scheduleCronJob();
// Routes
app.use("/api", routes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
