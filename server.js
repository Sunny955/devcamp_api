const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");

//Route Files
const bootcamps = require("./routes/bootcamps");

//Connect to database
connectDB();

//Load env vars
dotenv.config({ path: "./config/config.env" });

const app = express();

//Body Parser
app.use(express.json());

//Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Mount Routers
app.use("/api/v1/bootcamps", bootcamps);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

//Handle unhandeled promise rejection
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err}`);
  // Clse server and exit server
  server.close(() => process.exit(1));
});
