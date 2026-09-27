"use client";
import { useEffect, useState, useRef } from "react";
import { ResumePDF } from "components/Resume/ResumePDF";
import { initialSettings } from "lib/redux/settingsSlice";
import { ResumeIframeCSR } from "components/Resume/ResumeIFrame";
import { START_HOME_RESUME, END_HOME_RESUME } from "home/constants";
import { makeObjectCharIterator } from "lib/make-object-char-iterator";
import { useTailwindBreakpoints } from "lib/hooks/useTailwindBreakpoints";

const INTERVAL_MS = 50;
const CHARS_PER_INTERVAL = 10;
const RESET_INTERVAL_MS = 60 * 1000;

export const AutoTypingResume = () => {
  const [resume, setResume] = useState(START_HOME_RESUME);
  const resumeCharIterator = useRef(
    makeObjectCharIterator(START_HOME_RESUME, END_HOME_RESUME)
  );
  const hasSetEndResume = useRef(false);
  const { isLg } = useTailwindBreakpoints();

  useEffect(() => {
    const intervalId = setInterval(() => {
      let next = resumeCharIterator.current.next();
      for (let i = 0; i < CHARS_PER_INTERVAL - 1; i++) {
        next = resumeCharIterator.current.next();
      }
      if (!next.done) {
        setResume(next.value);
      } else {
        if (!hasSetEndResume.current) {
          setResume(END_HOME_RESUME);
          hasSetEndResume.current = true;
        }
      }
    }, INTERVAL_MS);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      resumeCharIterator.current = makeObjectCharIterator(
        START_HOME_RESUME,
        END_HOME_RESUME
      );
      hasSetEndResume.current = false;
    }, RESET_INTERVAL_MS);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="relative group">
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 opacity-60 blur-sm pointer-events-none" />
      <div className="relative">
        <ResumeIframeCSR documentSize="Letter" scale={isLg ? 0.7 : 0.5}>
          <ResumePDF
            resume={resume}
            settings={{
              ...initialSettings,
              themeColor: "#171717",
              fontSize: "10.5",
              formToHeading: {
                skills: resume.skills.descriptions.length > 0 ? "TECHNICAL SKILLS" : "",
                workExperiences: resume.workExperiences[0]?.company ? "EXPERIENCE" : "",
                projects: resume.projects[0]?.project ? "PROJECTS" : "",
                educations: resume.educations[0]?.school ? "EDUCATION" : "",
                custom: resume.custom?.descriptions?.length > 0 ? "CERTIFICATIONS & ACHIEVEMENTS" : "",
              },
              formToShow: {
                skills: resume.skills.descriptions.length > 0,
                workExperiences: Boolean(resume.workExperiences[0]?.company),
                projects: Boolean(resume.projects[0]?.project),
                educations: Boolean(resume.educations[0]?.school),
                custom: Boolean(resume.custom?.descriptions?.length > 0),
              },
              formsOrder: ["skills", "workExperiences", "projects", "educations", "custom"],
            }}
          />
        </ResumeIframeCSR>
      </div>
    </div>
  );
};
