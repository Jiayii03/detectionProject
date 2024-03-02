import React from "react";
import Plate from "./components/Plate.tsx";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/" element={<Navigate to="/plateRecognizer" replace={true} />} />
        <Route path="/plateRecognizer" element={<Plate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
