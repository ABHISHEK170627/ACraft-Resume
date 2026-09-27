import Link from "next/link";
import { FlexboxSpacer } from "components/FlexboxSpacer";
import { AutoTypingResume } from "home/AutoTypingResume";
import { SparklesIcon } from "@heroicons/react/24/solid";

export const Hero = () => {
  return (
    <section className="lg:flex lg:h-[825px] lg:justify-center">
      <FlexboxSpacer maxWidth={75} minWidth={0} className="hidden lg:block" />
      <div className="mx-auto max-w-xl pt-8 text-center lg:mx-0 lg:grow lg:pt-28 lg:text-left">
        {/* Academic Project Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-semibold mb-6">
          <SparklesIcon className="h-3.5 w-3.5 text-purple-600" />
          <span>ACraft-Resume · By Abhishek · New Horizon College, Kasturi Nagar</span>
        </div>

        <h1 className="text-primary pb-2 text-4xl font-bold lg:text-5xl">
          Create a professional
          <br />
          resume easily
        </h1>
        <p className="mt-3 text-lg text-gray-600 lg:mt-5 lg:text-xl">
          With this free, open-source, and ATS-optimized resume builder
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-4 lg:mt-12">
          <Link href="/resume-builder" className="btn-primary">
            Create Resume <span aria-hidden="true">→</span>
          </Link>
          <Link
            href="/resume-parser"
            className="inline-block rounded-full px-6 py-2 font-semibold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 shadow-sm transition"
          >
            ATS Scanner
          </Link>
        </div>

        <p className="mt-3 text-sm text-gray-500">No sign up required · 100% Free &amp; Private</p>

        <p className="mt-8 text-sm text-gray-600 lg:mt-24">
          Already have a resume? Test its ATS readability with the{" "}
          <Link href="/resume-parser" className="text-purple-600 underline underline-offset-2 hover:text-purple-700 font-medium">
            resume parser
          </Link>
        </p>
      </div>
      <FlexboxSpacer maxWidth={100} minWidth={50} className="hidden lg:block" />
      <div className="mt-8 flex justify-center lg:mt-4 lg:block lg:grow">
        <AutoTypingResume />
      </div>
    </section>
  );
};
