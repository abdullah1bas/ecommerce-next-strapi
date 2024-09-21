'use client'
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";

function Blog() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) {
      document.title = pathname.slice(1);
    }
  }, [pathname]);
  
  return <div>Blog Page Here</div>;
}

export default Blog;
