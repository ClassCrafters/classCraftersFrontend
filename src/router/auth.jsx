import { BrowserRouter, Routes, Route } from "react-router-dom";    
import React from "react";
import LoginPage from "../pages/login";

const AuthRoutes = () => (

    <Routes>
      <Route path="/auth" element={<LoginPage />} />
    </Routes>
  
);

export default AuthRoutes;
