import { Hero } from "home/Hero";
import { Steps } from "home/Steps";
import { Features } from "home/Features";
import Link from "next/link";
import { SparklesIcon } from "@heroicons/react/24/solid";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50/50 to-white text-gray-900">
      <main className="mx-auto max-w-screen-2xl px-6 pb-16 lg:px-12">
        <Hero />
        <Steps />
        <Features />

        {/* Modern Student Accreditation & Project Footer */}
        <footer className="mt-20 border-t border-gray-200/80 pt-10 pb-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <span className="font-bold text-gray-800 text-sm flex items-center gap-1.5">
              <SparklesIcon className="h-4 w-4 text-emerald-500" />
              ACraft-Resume
            </span>
            <span className="hidden sm:inline">·</span>
            <span>College Project by <strong className="text-gray-700">Abhishek</strong></span>
            <span className="hidden sm:inline">·</span>
            <span>New Horizon College, Kasturi Nagar, Bangalore</span>
          </div>
          <div className="flex items-center gap-4 font-medium text-gray-600">
            <Link href="/resume-builder" className="hover:text-gray-900 transition-colors">
              Resume Builder
            </Link>
            <Link href="/resume-parser" className="hover:text-gray-900 transition-colors">
              ATS Scanner
            </Link>
            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
              100% Free &amp; Private
            </span>
          </div>
        </footer>
      </main>
    </div>
  );
}
