import "globals.css";
import { TopNavBar } from "components/TopNavBar";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "ACraft-Resume - 100% ATS-Friendly Resume Builder",
  description:
    "ACraft-Resume is a 100% ATS-friendly, open-source resume builder with real-time scoring, single-column export, and GitHub Pages compatibility.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TopNavBar />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
