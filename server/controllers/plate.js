const fs = require("fs");
const axios = require("axios");
const FormData = require("form-data");

const detectPlate = (req, res) => {
  const { filename } = req;

  return new Promise((resolve, reject) => {
    const filePath = `uploads/${filename}`;

    // Read the file from the file system
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      // Convert the file content to base64
      const base64String = data.toString('base64');

      // Create FormData
      let body = new FormData();
      body.append("upload", base64String);
      body.append("regions", "us-ca"); // Change to your country

      // Send the base64 data to the API
      axios.post("https://api.platerecognizer.com/v1/plate-reader/", body, {
        headers: {
          ...body.getHeaders(),
          Authorization: "Token 732c4ff9a03b3c18b25b689154f0caae277f45b0",
        },
      })
      .then((response) => {
        console.log(response.data);
        res.send(response.data);
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
    });
  });
};


const getRole = (req, res) => {
  console.log(req.session);
  if (req.session.username) {
    res.json({
      loggedIn: true,
      username: req.session.username,
      role: req.session.role,
    });
  } else {
    res.json({
      loggedIn: false,
    });
  }
};

module.exports = {
  detectPlate,
  getRole,
};
