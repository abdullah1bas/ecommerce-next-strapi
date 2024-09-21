"use client";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
function Explore() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) {
      document.title = pathname.slice(1);
    }
  }, [pathname]);
  return <div>Explore Page</div>;
}

export default Explore;
