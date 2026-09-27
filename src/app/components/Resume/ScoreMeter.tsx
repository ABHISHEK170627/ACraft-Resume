"use client";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "lib/redux/hooks";
import { initialResumeState, selectResume, setResume } from "lib/redux/resumeSlice";
import { initialSettings, setSettings } from "lib/redux/settingsSlice";
import { CheckCircleIcon, XCircleIcon, ArrowPathIcon, TrashIcon } from "@heroicons/react/24/solid";

/**
 * ATS-compatibility Score Meter with dynamic visual gauge bar
 * Analyzes key sections required for 100% ATS readability.
 */
export const ScoreMeter = () => {
  const resume = useAppSelector(selectResume);
  const dispatch = useAppDispatch();
  const [showDetails, setShowDetails] = useState(false);

  const criteria = [
    {
      label: "Contact & Profile",
      passed: Boolean(resume.profile.name && (resume.profile.email || resume.profile.phone)),
      weight: 20,
    },
    {
      label: "Summary / Objective",
      passed: Boolean(resume.profile.summary && resume.profile.summary.trim().length > 15),
      weight: 15,
    },
    {
      label: "Education",
      passed: Boolean(resume.educations && resume.educations.length > 0 && resume.educations[0].school),
      weight: 20,
    },
    {
      label: "Work Experience",
      passed: Boolean(resume.workExperiences && resume.workExperiences.length > 0 && resume.workExperiences[0].company),
      weight: 20,
    },
    {
      label: "Projects",
      passed: Boolean(resume.projects && resume.projects.length > 0 && resume.projects[0].project),
      weight: 15,
    },
    {
      label: "Technical Skills",
      passed: Boolean(
        resume.skills &&
          (resume.skills.featuredSkills.some((s) => s.skill) ||
            resume.skills.descriptions.some((d) => d.trim().length > 0))
      ),
      weight: 10,
    },
  ];

  const score = criteria.reduce((acc, curr) => (curr.passed ? acc + curr.weight : acc), 0);

  const getBadge = (s: number) => {
    if (s >= 90) return { label: "100% ATS Ready", badgeBg: "bg-emerald-100 text-emerald-800" };
    if (s >= 70) return { label: "Good ATS Match", badgeBg: "bg-blue-100 text-blue-800" };
    if (s >= 40) return { label: "Needs More Details", badgeBg: "bg-amber-100 text-amber-800" };
    return { label: "Incomplete", badgeBg: "bg-rose-100 text-rose-800" };
  };

  const badge = getBadge(score);

  const handleResetToTemplate = () => {
    if (window.confirm("Load 100% ATS-friendly starter template? This will replace current form fields with the verified sample.")) {
      dispatch(setResume(initialResumeState));
      dispatch(setSettings(initialSettings));
    }
  };

  const handleClearAll = () => {
    if (window.confirm("Clear all form fields and start fresh with a blank resume?")) {
      dispatch(
        setResume({
          profile: {
            name: "",
            summary: "",
            email: "",
            phone: "",
            location: "",
            url: "",
          },
          workExperiences: [
            { company: "", jobTitle: "", date: "", descriptions: [""] },
          ],
          educations: [
            { school: "", degree: "", gpa: "", date: "", descriptions: [""] },
          ],
          projects: [{ project: "", date: "", descriptions: [""] }],
          skills: {
            featuredSkills: [],
            descriptions: ["Languages: ", "Frontend: ", "Backend: "],
          },
          custom: { descriptions: [] },
        })
      );
    }
  };

  return (
    <div className="flex flex-col gap-1.5 w-full max-w-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            ATS Score
          </span>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${badge.badgeBg}`}>
            {badge.label}
          </span>
          <button
            type="button"
            onClick={() => setShowDetails(!showDetails)}
            className="text-xs text-gray-500 hover:text-gray-700 underline ml-1"
          >
            {showDetails ? "Hide breakdown" : "View breakdown"}
          </button>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleClearAll}
            className="flex items-center gap-1 text-xs text-rose-600 hover:text-rose-800 font-medium"
            title="Clear all fields to start with a blank resume"
          >
            <TrashIcon className="h-3.5 w-3.5" />
            Clear Form
          </button>
          <button
            type="button"
            onClick={handleResetToTemplate}
            className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-medium"
            title="Load the 100% ATS sample resume template"
          >
            <ArrowPathIcon className="h-3.5 w-3.5" />
            Load Sample
          </button>
          <span className="text-sm font-bold text-gray-800">{score}%</span>
        </div>
      </div>

      <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-500 ease-out rounded-full ${
            score >= 80 ? "bg-emerald-500" : score >= 50 ? "bg-amber-500" : "bg-rose-500"
          }`}
          style={{ width: `${Math.max(5, score)}%` }}
        />
      </div>

      {showDetails && (
        <div className="mt-2 grid grid-cols-2 gap-1.5 p-2 bg-gray-50 rounded-md border border-gray-200 text-xs">
          {criteria.map((c, i) => (
            <div key={i} className="flex items-center gap-1.5">
              {c.passed ? (
                <CheckCircleIcon className="h-4 w-4 text-emerald-500 shrink-0" />
              ) : (
                <XCircleIcon className="h-4 w-4 text-rose-500 shrink-0" />
              )}
              <span className={c.passed ? "text-gray-700" : "text-gray-400"}>
                {c.label} ({c.weight}%)
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
