"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

type FormStatus = "idle" | "sending" | "success" | "error";

export function useFormSubmit() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorCode, setErrorCode] = useState<string | null>(null);
  const startedAt = useRef(0);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const fields = Object.fromEntries(new FormData(event.currentTarget));
    setStatus("sending");
    setErrorCode(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...fields,
          elapsedMs: Date.now() - startedAt.current,
        }),
      });

      if (response.ok) {
        setStatus("success");
        return;
      }

      const result: { error?: string } = await response.json().catch(() => ({}));
      setErrorCode(result.error ?? null);
      setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  function reset() {
    startedAt.current = Date.now();
    setErrorCode(null);
    setStatus("idle");
  }

  return { status, errorCode, handleSubmit, reset };
}
