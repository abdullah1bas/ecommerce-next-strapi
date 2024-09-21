"use client";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
function Careers() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) {
      document.title = pathname.slice(1);
    }
  }, [pathname]);
  return <div>Careers Page</div>;
}

export default Careers;
