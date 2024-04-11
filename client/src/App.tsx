import React, { useEffect } from "react";
import Welcome from "./components/Welcome.tsx";
import Plate from "./components/Plate.tsx";
import Pattern from "./components/Pattern.tsx";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Layout from "./Layout.tsx";

function App() {
  useEffect(() => {
    document.title = "Detection Project"; // Set the document title
  }, []);

  return (
    <Layout>
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/plateDetection" element={<Plate />} />
          <Route path="/patternDetection" element={<Pattern />} />
        </Routes>
      </BrowserRouter>
    </Layout>
  );
}

export default App;
