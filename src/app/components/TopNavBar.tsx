"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import logoSrc from "public/logo.svg";
import { cx } from "lib/cx";
import { SparklesIcon } from "@heroicons/react/24/solid";

export const TopNavBar = () => {
  const pathName = usePathname();
  const isHomePage = pathName === "/";

  return (
    <header
      aria-label="Site Header"
      className="flex h-[var(--top-nav-bar-height)] items-center border-b border-gray-200/80 bg-white/90 backdrop-blur-md px-4 lg:px-12 sticky top-0 z-50"
    >
      <div className="flex h-10 w-full items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src={logoSrc}
            alt="ACraft-Resume Logo"
            className="h-8 w-auto transition-transform group-hover:scale-105"
            priority
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-black text-gray-900 tracking-tight">ACraft-Resume</span>
              <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                100% ATS
              </span>
            </div>
            <span className="text-[10px] text-gray-400 font-medium -mt-1 hidden sm:block">
              By Abhishek · New Horizon College, Kasturi Nagar
            </span>
          </div>
        </Link>
        <nav
          aria-label="Site Nav Bar"
          className="flex items-center gap-3 text-sm font-medium"
        >
          {[
            ["/resume-builder", "Builder"],
            ["/resume-parser", "Scanner & Parser"],
          ].map(([href, text]) => {
            const isActive = pathName === href;
            return (
              <Link
                key={text}
                className={cx(
                  "rounded-lg px-3 py-1.5 transition-colors text-xs font-semibold",
                  isActive
                    ? "bg-gray-100 text-gray-900 font-bold"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
                href={href}
              >
                {text}
              </Link>
            );
          })}
          <Link
            href="/resume-builder"
            className="inline-flex items-center gap-1.5 rounded-lg bg-gray-900 hover:bg-black text-white px-3.5 py-1.5 text-xs font-bold shadow-sm transition-all hover:shadow"
          >
            <SparklesIcon className="h-3.5 w-3.5 text-emerald-400" />
            Create Resume
          </Link>
        </nav>
      </div>
    </header>
  );
};
