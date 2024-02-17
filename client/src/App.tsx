import React from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Plate from "./components/Plate";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/" element={<Navigate to="/register" replace={true} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/plateRecognizer" element={<Plate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
