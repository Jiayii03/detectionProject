const fs = require("fs");
const axios = require("axios");
const FormData = require("form-data");

const detectPlate = (req, res) => {
  try {
    // Convert the file content to base64
    const base64String = req.body.image_base64;

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
      })
      .catch((error) => {
        console.log(error);
        res.send(error.response.data);
        reject(error);
      });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

const apiTest = (req, res) => {
  res.send("API is working properly");
};

module.exports = {
  detectPlate,
  apiTest,
};
