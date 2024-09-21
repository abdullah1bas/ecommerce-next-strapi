"use client";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
function AboutUs() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) {
      document.title = pathname.slice(1);
    }
  }, [pathname]);
  return <div>About us Page</div>;
}

export default AboutUs;
