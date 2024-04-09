import React from "react";
import Welcome from "./components/Welcome.tsx";
import Plate from "./components/Plate.tsx";
import Pattern from "./components/Pattern.tsx";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/plateDetection" element={<Plate />} />
        <Route path="/patternDetection" element={<Pattern />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
