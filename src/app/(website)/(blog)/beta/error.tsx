"use client";

import { useEffect } from "react";

export default function BetaError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[BetaErrorBoundary]", error);
  }, [error]);

  return (
    <div
      style={{
        padding: 20,
        margin: 20,
        backgroundColor: "#1a0000",
        border: "1px solid #ff4444",
        borderRadius: 10,
        color: "#ff8888",
        fontFamily: "monospace",
        fontSize: 14,
        wordBreak: "break-word",
      }}
    >
      <h2 style={{ color: "#ff4444", marginBottom: 10 }}>Beta Page Error</h2>
      <p style={{ marginBottom: 10 }}>{error.message}</p>
      <pre style={{ fontSize: 12, opacity: 0.7, whiteSpace: "pre-wrap" }}>
        {error.stack}
      </pre>
      <button
        onClick={reset}
        style={{
          marginTop: 15,
          padding: "8px 16px",
          backgroundColor: "#ff4444",
          color: "#fff",
          border: "none",
          borderRadius: 6,
          cursor: "pointer",
        }}
      >
        Try Again
      </button>
    </div>
  );
}
