const express = require("express");
const app = express();
const { app_name,port } = require("./config/app");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");
const {success} = require("./utils/successResponse");

connectDB();

app.use(express.json());

// Connecting Routes
app.get("/", (req, res) => {
  res
    .status(200)
    .json(success("OK", {}, res.statusCode));
});
app.use("/api/auth", require("./routes/auth"));
app.use("/api/leads", require("./routes/lead"));
app.use("/api/users", require("./routes/user"));

// Error Handler Middleware
app.use(errorHandler);

const server = app.listen(port, () =>
  console.log(`${app_name} Sever running on port ${port}`)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err.message}`);
  server.close(() => process.exit(1));
});
