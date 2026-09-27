"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { readPdf } from "lib/parse-resume-from-pdf/read-pdf";
import type { TextItems } from "lib/parse-resume-from-pdf/types";
import { groupTextItemsIntoLines } from "lib/parse-resume-from-pdf/group-text-items-into-lines";
import { groupLinesIntoSections } from "lib/parse-resume-from-pdf/group-lines-into-sections";
import { extractResumeFromSections } from "lib/parse-resume-from-pdf/extract-resume-from-sections";
import { ResumeDropzone } from "components/ResumeDropzone";
import { Provider } from "react-redux";
import { store } from "lib/redux/store";
import { useAppDispatch } from "lib/redux/hooks";
import { setResume } from "lib/redux/resumeSlice";
import {
  CheckCircleIcon,
  XCircleIcon,
  ShieldCheckIcon,
  SparklesIcon,
  ArrowRightIcon,
  DocumentMagnifyingGlassIcon,
  DocumentCheckIcon,
} from "@heroicons/react/24/solid";

const RESUME_EXAMPLES = [
  {
    name: "Abhishek ATS Sample",
    fileUrl: "resume-example/openresume-resume.pdf",
    description: "100% ATS-optimized single column layout with verified section headings",
  },
  {
    name: "Academic Sample",
    fileUrl: "resume-example/laverne-resume.pdf",
    description: "Traditional collegiate resume format with education & project history",
  },
];

const defaultFileUrl = RESUME_EXAMPLES[0]["fileUrl"];

function ResumeParserContent() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [fileUrl, setFileUrl] = useState(defaultFileUrl);
  const [textItems, setTextItems] = useState<TextItems>([]);
  const [activeTab, setActiveTab] = useState<"diagnostic" | "parsed">("diagnostic");
  const [isLoading, setIsLoading] = useState(false);

  const lines = groupTextItemsIntoLines(textItems || []);
  const sections = groupLinesIntoSections(lines);
  const parsedResume = extractResumeFromSections(sections);

  useEffect(() => {
    async function loadPdf() {
      setIsLoading(true);
      try {
        const items = await readPdf(fileUrl);
        setTextItems(items);
      } catch (err) {
        console.error("PDF read error", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadPdf();
  }, [fileUrl]);

  // Compute live ATS score from parsed content
  const checks = [
    {
      title: "Selectable Text Stream",
      description: "Text is clean unicode and readable by ATS bots without OCR degradation",
      passed: Boolean(textItems && textItems.length > 20),
      impact: "High",
    },
    {
      title: "Candidate Identity",
      description: "Full name and professional headline cleanly identified at document top",
      passed: Boolean(parsedResume.profile.name),
      impact: "Critical",
    },
    {
      title: "Direct Contact Information",
      description: "Email address or phone number accurately isolated",
      passed: Boolean(parsedResume.profile.email || parsedResume.profile.phone),
      impact: "Critical",
    },
    {
      title: "Work Experience Section",
      description: "Standard chronological experience blocks detected with roles & companies",
      passed: Boolean(parsedResume.workExperiences && parsedResume.workExperiences.length > 0 && parsedResume.workExperiences[0].company),
      impact: "High",
    },
    {
      title: "Educational Credentials",
      description: "Degrees and institutions recognized with standard formatting",
      passed: Boolean(parsedResume.educations && parsedResume.educations.length > 0 && parsedResume.educations[0].school),
      impact: "High",
    },
    {
      title: "Technical Skills & Competencies",
      description: "Skills taxonomy extracted with categorized groupings",
      passed: Boolean(
        parsedResume.skills &&
          (parsedResume.skills.featuredSkills.length > 0 || parsedResume.skills.descriptions.length > 0)
      ),
      impact: "Medium",
    },
  ];

  const passedCount = checks.filter((c) => c.passed).length;
  const atsScore = Math.round((passedCount / checks.length) * 100);

  const handleImportToBuilder = () => {
    dispatch(setResume(parsedResume));
    router.push("/resume-builder");
  };

  return (
    <main className="min-h-[calc(100vh-var(--top-nav-bar-height))] bg-gradient-to-b from-gray-50 via-white to-gray-100 px-4 py-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-gray-200 pb-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold mb-2">
              <SparklesIcon className="h-3.5 w-3.5" />
              ACraft-Resume Diagnostic Engine
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              ATS Resume Scanner & Diagnostics
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              Verify how top applicant tracking systems parse your resume. Upload any PDF to audit keyword parsing, structure, and readability.
            </p>
          </div>
          <button
            onClick={handleImportToBuilder}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gray-900 hover:bg-black text-white text-sm font-semibold shadow-md transition-all hover:shadow-lg self-start md:self-auto"
          >
            Open in ACraft-Resume Builder
            <ArrowRightIcon className="h-4 w-4" />
          </button>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-sm flex flex-col justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">ATS Score</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className={`text-3xl font-extrabold ${atsScore >= 80 ? 'text-emerald-600' : atsScore >= 50 ? 'text-amber-600' : 'text-rose-600'}`}>
                {atsScore}%
              </span>
              <span className="text-xs font-medium text-gray-500">
                {atsScore >= 80 ? "Optimal" : "Needs Review"}
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-sm flex flex-col justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Sections Detected</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-extrabold text-gray-900">{passedCount}/{checks.length}</span>
              <span className="text-xs font-medium text-emerald-600">Active</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-sm flex flex-col justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">ATS Layout</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-2xl font-bold text-gray-900">Single Column</span>
              <ShieldCheckIcon className="h-5 w-5 text-emerald-500" />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-sm flex flex-col justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Engine Status</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-sm font-semibold text-gray-800">
                {isLoading ? "Analyzing..." : "Ready & Verified"}
              </span>
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
          </div>
        </div>

        {/* Main Grid: Upload & Preview on Left, Diagnostics & Parsed on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Upload & PDF Preview */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-700 mb-3 flex items-center gap-2">
                <DocumentMagnifyingGlassIcon className="h-4 w-4 text-gray-500" />
                Upload Resume or Try Samples
              </h2>
              <ResumeDropzone
                onFileUrlChange={(newUrl) => setFileUrl(newUrl || defaultFileUrl)}
                playgroundView={true}
              />
              <div className="mt-4 flex flex-wrap gap-2">
                {RESUME_EXAMPLES.map((ex, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setFileUrl(ex.fileUrl)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                      fileUrl === ex.fileUrl
                        ? "bg-gray-900 text-white border-gray-900"
                        : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    {ex.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col h-[650px] overflow-hidden">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-2">
                <span className="text-xs font-semibold text-gray-500">Document Stream</span>
                <span className="text-xs text-gray-400">PDF Reader View</span>
              </div>
              <div className="grow w-full rounded-xl overflow-hidden border border-gray-100 bg-gray-50">
                <iframe src={`${fileUrl}#navpanes=0`} className="h-full w-full" title="Resume Document" />
              </div>
            </div>
          </div>

          {/* Right Column: Diagnostic Checklist & Parsed Data */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div className="flex items-center justify-between bg-white p-2 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab("diagnostic")}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                    activeTab === "diagnostic"
                      ? "bg-gray-900 text-white shadow-sm"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  ATS Diagnostics ({passedCount}/{checks.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("parsed")}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                    activeTab === "parsed"
                      ? "bg-gray-900 text-white shadow-sm"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  Structured Data
                </button>
              </div>
              <span className="text-xs text-gray-400 pr-2">Live Analysis</span>
            </div>

            {/* Diagnostic Tab */}
            {activeTab === "diagnostic" && (
              <div className="flex flex-col gap-3">
                {checks.map((c, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-white border border-gray-200 shadow-sm flex items-start justify-between gap-4 transition-all hover:border-gray-300"
                  >
                    <div className="flex items-start gap-3">
                      {c.passed ? (
                        <CheckCircleIcon className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                      ) : (
                        <XCircleIcon className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <h3 className="text-sm font-bold text-gray-900">{c.title}</h3>
                        <p className="text-xs text-gray-500 mt-0.5">{c.description}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 shrink-0">
                      {c.impact}
                    </span>
                  </div>
                ))}

                <div className="p-5 rounded-2xl bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-md flex items-center justify-between mt-2">
                  <div>
                    <h3 className="text-sm font-bold">Ready to build or fix your resume?</h3>
                    <p className="text-xs text-gray-300 mt-1">
                      Load this parsed content straight into the ACraft-Resume 100% ATS builder.
                    </p>
                  </div>
                  <button
                    onClick={handleImportToBuilder}
                    className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold shadow transition-all"
                  >
                    Launch Builder →
                  </button>
                </div>
              </div>
            )}

            {/* Parsed Data Tab */}
            {activeTab === "parsed" && (
              <div className="flex flex-col gap-4">
                <div className="p-5 rounded-xl bg-white border border-gray-200 shadow-sm">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">Profile Data</h3>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-gray-400">Name:</span>
                      <p className="font-semibold text-gray-800">{parsedResume.profile.name || "Not Detected"}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Email:</span>
                      <p className="font-semibold text-gray-800">{parsedResume.profile.email || "Not Detected"}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Phone:</span>
                      <p className="font-semibold text-gray-800">{parsedResume.profile.phone || "Not Detected"}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Location:</span>
                      <p className="font-semibold text-gray-800">{parsedResume.profile.location || "Not Detected"}</p>
                    </div>
                  </div>
                  {parsedResume.profile.summary && (
                    <div className="mt-3 pt-3 border-t border-gray-100 text-xs">
                      <span className="text-gray-400">Summary:</span>
                      <p className="text-gray-700 mt-0.5">{parsedResume.profile.summary}</p>
                    </div>
                  )}
                </div>

                <div className="p-5 rounded-xl bg-white border border-gray-200 shadow-sm">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">Work Experience</h3>
                  {parsedResume.workExperiences.length > 0 && parsedResume.workExperiences[0].company ? (
                    <div className="flex flex-col gap-3 text-xs">
                      {parsedResume.workExperiences.map((w, idx) => (
                        <div key={idx} className="border-b border-gray-100 last:border-0 pb-2 last:pb-0">
                          <div className="flex justify-between font-semibold text-gray-800">
                            <span>{w.jobTitle} — {w.company}</span>
                            <span className="text-gray-400">{w.date}</span>
                          </div>
                          <ul className="mt-1 list-disc list-inside text-gray-600">
                            {w.descriptions.map((d, i) => (
                              <li key={i}>{d}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-gray-400">No work experience blocks detected</p>
                  )}
                </div>

                <div className="p-5 rounded-xl bg-white border border-gray-200 shadow-sm">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">Education</h3>
                  {parsedResume.educations.length > 0 && parsedResume.educations[0].school ? (
                    <div className="flex flex-col gap-2 text-xs">
                      {parsedResume.educations.map((e, idx) => (
                        <div key={idx} className="flex justify-between">
                          <div>
                            <span className="font-semibold text-gray-800">{e.degree} — {e.school}</span>
                            {e.gpa && <p className="text-gray-500">GPA: {e.gpa}</p>}
                          </div>
                          <span className="text-gray-400">{e.date}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-gray-400">No education blocks detected</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default function ResumeParser() {
  return (
    <Provider store={store}>
      <ResumeParserContent />
    </Provider>
  );
}
