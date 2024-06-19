"use client";
import React from "react";
import ThemeProvider from "./ThemeToggle/theme-provider";
import { AlertProvider } from "@/app/contexts/alert/AlertProvider";
import { AuthProvider } from "@/app/contexts/auth/AuthProvider";
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AlertProvider>{children}</AlertProvider>
        </ThemeProvider>
      </AuthProvider>
    </>
  );
}
