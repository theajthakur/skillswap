"use client";
import React, { ReactNode } from "react";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import AuthProvider from "./AuthProvider";
import { Toaster } from "sonner";
interface LayoutProviderProps {
  children: ReactNode;
}

const LayoutProvider: React.FC<LayoutProviderProps> = ({ children }) => {
  return (
    <AuthProvider>
      <Toaster />
      <Navbar />
      {children}
      <Footer />
    </AuthProvider>
  );
};

export default LayoutProvider;
