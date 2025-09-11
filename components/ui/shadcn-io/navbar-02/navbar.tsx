"use client";

import * as React from "react";
import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";
import { DesktopMenu } from "./desktop-menu";
import { Navbar02Props, defaultNavigationLinks } from "./types";

export const Navbar02 = React.forwardRef<HTMLElement, Navbar02Props>(({ className, logo = <Logo />, logoHref = "#", navigationLinks = defaultNavigationLinks, signInText = "Sign In", signInHref = "#signin", ctaText = "Get Started", ctaHref = "#get-started", onSignInClick, onCtaClick, ...props }, ref) => {
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const checkWidth = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setIsMobile(width < 768); // 768px is md breakpoint
      }
    };

    checkWidth();

    const resizeObserver = new ResizeObserver(checkWidth);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Combine refs
  const combinedRef = React.useCallback(
    (node: HTMLElement | null) => {
      containerRef.current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    },
    [ref]
  );

  return (
    <header ref={combinedRef} className={cn("sticky top-0 z-50 w-full backdrop-blur supports-[backdrop-filter]:bg-[#25164f]/60 px-4 md:px-6 [&_*]:no-underline", className)} style={{ backgroundColor: "#25164f" }} {...props}>
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between gap-4">
        {/* Left side - Logo */}
        <div className="flex items-center gap-2">
          {/* Logo */}
          <button onClick={(e) => e.preventDefault()} className="flex items-center space-x-2 text-white hover:text-white/90 transition-colors cursor-pointer">
            <div className="text-2xl">{logo}</div>
            <span className="hidden font-bold text-xl sm:inline-block">Reaz Islam</span>
          </button>
        </div>

        {/* Right side - Navigation menu */}
        <div className="flex items-center">{isMobile ? <MobileMenu navigationLinks={navigationLinks} /> : <DesktopMenu navigationLinks={navigationLinks} />}</div>
      </div>
    </header>
  );
});

Navbar02.displayName = "Navbar02";
