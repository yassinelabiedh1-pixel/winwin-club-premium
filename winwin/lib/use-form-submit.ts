"use client";

import { useState, type FormEvent } from "react";

type FormType = "contact" | "booking";
type FormStatus = "idle" | "sending" | "success" | "error";

export function useFormSubmit(type: FormType) {
  const [status, setStatus] = useState<FormStatus>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const fields = Object.fromEntries(new FormData(event.currentTarget));
    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, type }),
      });
      setStatus(response.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  return { status, handleSubmit, reset: () => setStatus("idle") };
}
