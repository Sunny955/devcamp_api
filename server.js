const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");
const errorHandler = require("./middleware/error");
const connectDB = require("./config/db");

//Route Files
const bootcamps = require("./routes/bootcamps");
const courses = require("./routes/courses");
const auth = require("./routes/auth");
const users = require("./routes/users");
const reviews = require("./routes/reviews");

//Connect to database
connectDB();

//Load env vars
dotenv.config({ path: "./config/config.env" });

const app = express();

//Body Parser
app.use(express.json());

//Cookie Parser
app.use(cookieParser());

//Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//File Uploading
app.use(fileUpload());

//Sanitize data
app.use(mongoSanitize());

//Set security headers
app.use(helmet());

//Prevents XSS attacks
app.use(xss());

//Rate limiting
// 100 requests are allowed in 10 mins
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
});

app.use(limiter);

//Prevent http param pollution
app.use(hpp());

//Enable cors
app.use(cors());

//Set static folder
app.use(express.static(path.join(__dirname, "public")));

//Mount Routers
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);
app.use("/api/v1/auth", auth);
app.use("/api/v1/users", users);
app.use("/api/v1/reviews", reviews);

app.use(errorHandler);

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
