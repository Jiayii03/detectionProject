const db = require("../config/db");
const bcrypt = require("bcrypt");

const postLogin = async (req, res) => {
  const username = req.body.postUsername;
  const password = req.body.postPassword;

  await db.query(
    "SELECT * FROM staff WHERE username = ?",
    [username],
    (err, result) => {
      if (err) {
        console.error("Error querying the database: " + err.message);
        res
          .status(500)
          .json({ success: false, message: "Internal server error" });
        return;
      }

      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (err, response) => {
          if (response) {
            req.session.username = result[0].username;
            req.session.role = result[0].role;
            console.log(req.session);
            res
              .status(200)
              .json({ success: true, message: "User logged in successfully" });
          } else {
            res.json({
              success: false,
              message: "Invalid username or password",
              status: 401,
            });
          }
        });
      } else {
        res.json({
          success: false,
          message: "User does not exist",
          status: 402,
        });
      }
    }
  );
};

const postLogout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
      return;
    }
    res
      .status(200)
      .json({ success: true, message: "User logged out successfully" });
  });
};

module.exports = { postLogin, postLogout };
