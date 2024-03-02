import React, { useEffect, useState } from "react";
import Axios from "axios";

function Plate() {
  Axios.defaults.withCredentials = true;
  const [authorisedMessage, setAuthorisedMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [role, setRole] = useState("");
  const [base64, setBase64] = useState("");

  function handleFileChange(e) {
    setSelectedFile(e.target.files[0]);
    convertToBase64(e);
  }

  function convertToBase64(e) {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setBase64(reader.result as string);
    };
    reader.onerror = (err) => {
      console.error(err);
    };
  }

  function detectPlate() {
    if (!selectedFile) {
      setAuthorisedMessage("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("role", role);

    Axios.post("http://localhost:3001/api/plate/prediction", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((response) => {
      console.log(response);
      if (response.data == "Unauthorised")
        setAuthorisedMessage("You're not authorised");
      else if (response.data.results.length === 0) {
        setAuthorisedMessage("No plate detected");
      } else setAuthorisedMessage("Plate: " + response.data.results[0].plate);
    });
  }

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col items-center justify-center">
        <h1>Plate Recognizer</h1>
        <h2>{role}</h2>
        <input type="file" onChange={handleFileChange} />
        <button onClick={detectPlate}>Press to test API</button>
        <p>{authorisedMessage}</p>
        {base64 == "" || base64 == null ? (
          ""
        ) : (
          <img src={base64} alt="selected" width="300" height="300" />
        )}
      </div>
    </div>
  );
}

export default Plate;
