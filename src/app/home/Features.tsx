import Image from "next/image";
import featureFreeSrc from "public/assets/feature-free.svg";
import featureUSSrc from "public/assets/feature-us.svg";
import featurePrivacySrc from "public/assets/feature-privacy.svg";
import featureOpenSourceSrc from "public/assets/feature-open-source.svg";

const FEATURES = [
  {
    src: featureUSSrc,
    title: "100% ATS Guaranteed",
    text: "ACraft-Resume generates strict single-column layouts with verified standard section headings, compliant with Workday, Taleo, Greenhouse, and Lever.",
  },
  {
    src: featureFreeSrc,
    title: "Multi-Page Continuous Layout",
    text: "Never worry about content getting cut off. The builder dynamically calculates space and expands into clean multiple pages automatically.",
  },
  {
    src: featurePrivacySrc,
    title: "100% Private & Client-Side",
    text: "Your personal resume details are processed entirely in your browser with zero cloud server tracking or third-party storage.",
  },
  {
    src: featureOpenSourceSrc,
    title: "Academic Innovation",
    text: "Developed by Abhishek, student at New Horizon College, Kasturi Nagar, Bangalore. Built with React 18, Next.js, and TypeScript.",
  },
];

export const Features = () => {
  return (
    <section className="py-16 lg:py-28 border-t border-gray-100">
      <div className="mx-auto lg:max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-2">Core Architecture</h2>
          <p className="text-3xl font-extrabold text-gray-900">Why ACraft-Resume Outperforms</p>
        </div>
        <dl className="grid grid-cols-1 justify-items-center gap-y-10 lg:grid-cols-2 lg:gap-x-10 lg:gap-y-16">
          {FEATURES.map(({ src, title, text }) => (
            <div className="px-2" key={title}>
              <div className="relative w-96 self-center pl-16">
                <dt className="text-xl font-bold text-gray-900">
                  <Image
                    src={src}
                    className="absolute left-0 top-1 h-12 w-12"
                    alt="Feature icon"
                  />
                  {title}
                </dt>
                <dd className="mt-2 text-sm text-gray-600 leading-relaxed">{text}</dd>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};
