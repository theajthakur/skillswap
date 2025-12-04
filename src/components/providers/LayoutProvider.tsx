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
      <main className="pt-24 min-h-screen">
        {children}
      </main>
      <Footer />
    </AuthProvider>
  );
};

export default LayoutProvider;
