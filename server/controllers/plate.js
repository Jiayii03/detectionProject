const fs = require("fs");
const axios = require("axios");
const FormData = require("form-data");

const detectPlate = (req, res) => {
  if (!req.file) {
    return res.status(400).send("Error: No file found");
  }

  const { filename } = req;

  const filePath = `uploads/${filename}`;

  try {
    // Read the file from the file system
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      // Convert the file content to base64
      const base64String = data.toString("base64");

      // Create FormData
      let body = new FormData();
      body.append("upload", base64String);
      body.append("regions", "us-ca"); // Change to your country

      // Send the base64 data to the API
      axios
        .post("https://api.platerecognizer.com/v1/plate-reader/", body, {
          headers: {
            ...body.getHeaders(),
            Authorization: "Token " + process.env.PLATE_RECOGNIZER_TOKEN,
          },
        })
        .then((response) => {
          console.log(response.data);
          res.send(response.data);
          resolve(response.data);
        })
        .catch((error) => {
          console.log(error);
          res.send(error.response.data);
          reject(error);
        });
      // .finally(() => {
      //   // Delete the file from the file system
      //   fs.unlink(filePath, (err) => {
      //     if (err) {
      //       console.error("Error deleting file:", err);
      //       return;
      //     }
      //   });
      // });
    });
  } catch (error) {
    return res.status(400).send("Error: No file found");
  }
};

const apiTest = (req, res) => {
  res.send("API is working properly");
};

module.exports = {
  detectPlate,
  apiTest,
};
