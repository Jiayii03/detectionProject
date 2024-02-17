const express = require("express");
const db = require("./config/db");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const corsOptions = {
  origin: "http://localhost:3000",
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

db.connect((err) => {
  if (err) {
    console.error("Error connecting to database: " + err.message);
    return;
  }
  console.log("Connected to the database");
});

const register = require("./routes/register");
const login = require("./routes/login");
const plate = require("./routes/plate");
app.use("/api/register", register);
app.use("/api/login", login);
app.use("/api/plate", plate);

app.listen(3001, () => {
  console.log("Server running on port 3001...");
});
