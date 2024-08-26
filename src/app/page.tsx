"use client"
import { useEffect } from "react";
import { useRedirect } from "./hooks/useRedirect"

export default function Component() {
  const redirect = useRedirect();
  useEffect(() => {
    redirect.to("/login");
  })
  return (
    <h2>a</h2>
  )
}