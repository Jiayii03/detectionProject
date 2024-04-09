import React, { useState } from "react";
import Axios from "axios";
import { serverUrl, serverPort } from "../config";

function Pattern() {
  Axios.defaults.withCredentials = true;
  const [authorisedMessage, setAuthorisedMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [base64, setBase64] = useState<string>("");

  function handleFileChange(e) {
    setAuthorisedMessage("");
    setSelectedFile(e.target.files[0]);
    convertToBase64(e.target.files[0]);
  }

  function convertToBase64(file) {
    let reader = new FileReader();
    try{

        reader.readAsDataURL(file);
        reader.onload = () => {
          setBase64(reader.result as string);
        };
        reader.onerror = (err) => {
          console.error(err);
        };
    } catch (error) {
        console.error(error);
    }
  }

  function detectPattern() {
    if (!selectedFile) {
      setAuthorisedMessage("Please select a file");
      return;
    }

    const requestBody = {
      image_base64: base64,
    };

    Axios.post(serverUrl + serverPort + "/api/detectPattern", requestBody)
      .then((response) => {
        console.log(response);
        if (response.data === "Unauthorised") {
          setAuthorisedMessage("You're not authorised");
        } else {
          setAuthorisedMessage("Result: " + response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error detecting plate:", error);
        setAuthorisedMessage("Error occurred while processing");
      });
  }

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col items-center justify-center">
        <h1>Pattern Detection</h1>
        <input type="file" onChange={handleFileChange} />
        <button onClick={detectPattern}>Press to test API</button>
        <p>{authorisedMessage}</p>
        {base64 && (
          <img src={base64} alt="selected" width="300" height="300" />
        )}
      </div>
    </div>
  );
}

export default Pattern;
