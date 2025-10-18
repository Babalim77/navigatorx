"use client";

import { useState, useEffect } from "react";

export function SearchModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Listen for the custom event from NavigatorX
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-search", handleOpen);

    return () => window.removeEventListener("open-search", handleOpen);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="alert-body">
        <input type="search" placeholder="Search..." />
        <button onClick={() => setIsOpen(false)}>
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 17L16.8995 7.10051"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7 7.00001L16.8995 16.8995"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
