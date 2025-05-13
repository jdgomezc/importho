"use client";

import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from "lucide-react";
import { useRef } from "react";

export function Search() {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    const searchTerm = inputRef.current?.value;
    if (searchTerm && searchTerm.trim() !== "") {
      window.location.href = `/search?q=${encodeURIComponent(
        searchTerm.trim()
      )}`;
    } else {
      // If search term is empty, just go to search page (will show all products or empty state)
      window.location.href = "/search";
    }
  };

  return (
    <div className="relative w-full md:w-72">
      <SearchIcon
        className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground cursor-pointer"
        onClick={handleSearch}
      />
      <Input
        ref={inputRef}
        type="search"
        placeholder="Buscar productos..."
        className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-foreground/25 focus-visible:outline-none focus-visible:ring focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 pl-9"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
      />
    </div>
  );
}
