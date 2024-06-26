const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

dotenv.config();

app.use(express.json({limit: '50mb'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const corsOptions = {
  origin: ["http://localhost:3000", "https://detection-project.vercel.app"],
  credentials: true,
  optionSuccessStatus: 200, // return status for success
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(
  session({
    key: "userId",
    secret: "anything",
    resave: false,
    saveUnititialized: false,
    cookie: {
      expires: 60 * 60 * 24 * 1000,
    },
  })
);

const detectionRoute = require("./routes/detection");
app.use("/api",  detectionRoute);

app.listen(3001, () => {
  console.log("Server running on port 3001...");
});
