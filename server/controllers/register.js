const db = require("../config/db");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const postRegister = async (req, res) => {
  const username = req.body.postUsername;
  const password = req.body.postPassword;
  const role = req.body.postRole;

  bcrypt.hash(password, saltRounds, async (err, hash) => {
    if (err) {
      console.log(err);
    }

    await db.query(
      "INSERT INTO staff (username, password, role) VALUES (?, ?, ?)",
      [username, hash, role],
      (err, result) => {
        if (err) {
          console.error("Error inserting into the database:", err.message);
          res
            .status(500)
            .json({ success: false, message: "Internal server error" });
          return;
        } else {
          res
            .status(200)
            .json({ success: true, message: "User registered successfully" });
        }
      }
    );
  });
};

module.exports = postRegister;
