"use client";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/auth/AuthContext";

export default function Logout() {
    const auth = useContext(AuthContext);
  useState(() => {
    auth.signout();
  });
  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      GoodBye :D
    </div>
  );
}
