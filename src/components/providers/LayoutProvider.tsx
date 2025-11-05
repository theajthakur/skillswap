"use client";
import React, { ReactNode } from "react";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import AuthProvider from "./AuthProvider";

interface LayoutProviderProps {
  children: ReactNode;
}

const LayoutProvider: React.FC<LayoutProviderProps> = ({ children }) => {
  return (
    <AuthProvider>
      <Navbar />
      {children}
      <Footer />
    </AuthProvider>
  );
};

export default LayoutProvider;
