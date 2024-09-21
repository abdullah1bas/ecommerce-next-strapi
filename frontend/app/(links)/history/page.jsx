"use client";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
function History() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) {
      document.title = pathname.slice(1);
    }
  }, [pathname]);
  return <div>History Page</div>;
}

export default History;
