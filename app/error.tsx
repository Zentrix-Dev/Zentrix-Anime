// app/error.tsx
"use client"; // Error components must be Client Components

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service like Sentry
    console.error("Zentrix Runtime Error:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-20 h-20 bg-red-500/20 border border-red-500/50 rounded-full flex items-center justify-center text-red-500 mb-6">
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      
      <h2 className="font-display font-bold text-3xl text-white mb-4">
        A Glitch in the Matrix
      </h2>
      <p className="text-text-secondary max-w-md mb-8">
        We encountered an unexpected error while fetching data from the anime database. The servers might be overloaded.
      </p>
      
      <Button variant="primary" onClick={() => reset()}>
        Try Again
      </Button>
    </div>
  );
}
