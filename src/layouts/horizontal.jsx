import React from "react";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import { Outlet } from "react-router-dom";


const HorizontalLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 p-6 bg-gray-50">
           <Outlet />
        </main>
      </div>
    </div>
  );
};

export default HorizontalLayout;