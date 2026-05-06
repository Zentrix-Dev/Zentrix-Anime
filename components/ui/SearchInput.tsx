"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export function SearchInput() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const initialQuery = searchParams.get("q") || "";
  const [inputValue, setInputValue] = useState(initialQuery);

  useEffect(() => {
    // 400ms debounce implementation
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      
      if (inputValue) {
        params.set("q", inputValue);
        // Reset to page 1 on a new search
        params.set("page", "1"); 
      } else {
        params.delete("q");
      }
      
      // Navigate to search page if not already there, otherwise just update query
      const targetPath = pathname === "/search" ? "/search" : "/search";
      router.push(`${targetPath}?${params.toString()}`);
    }, 400);

    return () => clearTimeout(timer);
  }, [inputValue, router, pathname, searchParams]);

  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        placeholder="Search anime, characters, staff..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="w-full bg-glass border border-border-subtle text-text-primary placeholder:text-text-muted px-4 py-2.5 pl-10 rounded-lg focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary transition-all font-display"
      />
      {/* Search Icon (SVG) */}
      <svg 
        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>
  );
}
