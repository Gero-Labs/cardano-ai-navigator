
import { useState } from "react";
import { Outlet, useLocation, Navigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import { SidebarProvider } from "@/components/ui/sidebar"; 
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = () => {
  const { wallet } = useAppContext();
  const location = useLocation();
  
  // Redirect to home if not connected
  if (!wallet.isConnected) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar />
        <div className="flex-1 flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1 overflow-auto p-4 md:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
