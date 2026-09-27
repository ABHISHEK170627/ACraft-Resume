import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "lib/redux/store";
import type {
  FeaturedSkill,
  Resume,
  ResumeEducation,
  ResumeProfile,
  ResumeProject,
  ResumeSkills,
  ResumeWorkExperience,
} from "lib/redux/types";
import type { ShowForm } from "lib/redux/settingsSlice";

export const initialProfile: ResumeProfile = {
  name: "",
  summary: "",
  email: "",
  phone: "",
  location: "",
  url: "",
};

export const initialWorkExperience: ResumeWorkExperience = {
  company: "",
  jobTitle: "",
  date: "",
  descriptions: [],
};

export const initialEducation: ResumeEducation = {
  school: "",
  degree: "",
  gpa: "",
  date: "",
  descriptions: [],
};

export const initialProject: ResumeProject = {
  project: "",
  date: "",
  descriptions: [],
};

export const initialFeaturedSkill: FeaturedSkill = { skill: "", rating: 4 };
export const initialFeaturedSkills: FeaturedSkill[] = Array(6).fill({
  ...initialFeaturedSkill,
});
export const initialSkills: ResumeSkills = {
  featuredSkills: initialFeaturedSkills,
  descriptions: [],
};

export const initialCustom = {
  descriptions: [],
};

export const initialResumeState: Resume = {
  profile: {
    name: "Abhishek",
    summary:
      "Aspiring Software Developer passionate about creating responsive web applications, modern algorithms, and ATS-optimized tools",
    email: "abhishek@gmail.com",
    phone: "+91 98765 43210",
    location: "Bangalore, India",
    url: "linkedin.com/in/abhishek",
  },
  workExperiences: [
    {
      company: "Tech Innovations Lab",
      jobTitle: "Software Developer Intern",
      date: "May 2023 - Present",
      descriptions: [
        "Built responsive full-stack features using Next.js, React, and TypeScript improving user engagement by 25%",
        "Collaborated with cross-functional teams to integrate RESTful APIs and ensure zero runtime errors",
        "Conducted code reviews and unit testing to maintain clean code and high reliability",
      ],
    },
    {
      company: "Horizon Dev Club",
      jobTitle: "Frontend Lead",
      date: "Aug 2022 - Apr 2023",
      descriptions: [
        "Led a team of student developers in building college portal modules with modern accessible UI",
        "Conducted technical workshops on Git, Web Development, and clean architecture",
      ],
    },
  ],
  educations: [
    {
      school: "New Horizon College, Kasturi Nagar",
      degree: "Bachelor of Computer Applications (BCA)",
      date: "2021 - 2024",
      gpa: "8.8 / 10",
      descriptions: [
        "Relevant Coursework: Data Structures, Web Development, DBMS, Operating Systems, Computer Networks",
        "Active member of Technical Innovation & Coding Society",
      ],
    },
  ],
  projects: [
    {
      project: "ACraft-Resume — 100% ATS Resume Builder",
      date: "Spring 2024",
      descriptions: [
        "Developed 100% ATS-friendly resume builder with client-side PDF export, customizable sections, and real-time score meter deployed on GitHub Pages",
      ],
    },
    {
      project: "Student Management Portal",
      date: "2023",
      descriptions: [
        "Architected responsive full-stack student records portal with role-based access control, search indexing, and real-time updates",
      ],
    },
  ],
  skills: {
    featuredSkills: initialFeaturedSkills,
    descriptions: [
      "Languages: JavaScript (ES6+), TypeScript, Python, C++, SQL",
      "Frontend: React.js, Next.js, HTML5, CSS3, Tailwind CSS, Responsive Design",
      "Backend: Node.js, Express.js, RESTful API Development, JWT Authentication",
      "Cloud & Tools: AWS (EC2, S3), Git, GitHub, Docker, Postman, Linux",
    ],
  },
  custom: {
    descriptions: [
      "Full Stack Web Development — Udemy Certified",
      "AWS Cloud Foundation — New Horizon College of Engineering",
      "Active Contributor to Open-Source Community",
    ],
  },
};

// Keep the field & value type in sync with CreateHandleChangeArgsWithDescriptions (components\ResumeForm\types.ts)
export type CreateChangeActionWithDescriptions<T> = {
  idx: number;
} & (
  | {
      field: Exclude<keyof T, "descriptions">;
      value: string;
    }
  | { field: "descriptions"; value: string[] }
);

export const resumeSlice = createSlice({
  name: "resume",
  initialState: initialResumeState,
  reducers: {
    changeProfile: (
      draft,
      action: PayloadAction<{ field: keyof ResumeProfile; value: string }>
    ) => {
      const { field, value } = action.payload;
      draft.profile[field] = value;
    },
    changeWorkExperiences: (
      draft,
      action: PayloadAction<
        CreateChangeActionWithDescriptions<ResumeWorkExperience>
      >
    ) => {
      const { idx, field, value } = action.payload;
      const workExperience = draft.workExperiences[idx];
      workExperience[field] = value as any;
    },
    changeEducations: (
      draft,
      action: PayloadAction<CreateChangeActionWithDescriptions<ResumeEducation>>
    ) => {
      const { idx, field, value } = action.payload;
      const education = draft.educations[idx];
      education[field] = value as any;
    },
    changeProjects: (
      draft,
      action: PayloadAction<CreateChangeActionWithDescriptions<ResumeProject>>
    ) => {
      const { idx, field, value } = action.payload;
      const project = draft.projects[idx];
      project[field] = value as any;
    },
    changeSkills: (
      draft,
      action: PayloadAction<
        | { field: "descriptions"; value: string[] }
        | {
            field: "featuredSkills";
            idx: number;
            skill: string;
            rating: number;
          }
      >
    ) => {
      const { field } = action.payload;
      if (field === "descriptions") {
        const { value } = action.payload;
        draft.skills.descriptions = value;
      } else {
        const { idx, skill, rating } = action.payload;
        const featuredSkill = draft.skills.featuredSkills[idx];
        featuredSkill.skill = skill;
        featuredSkill.rating = rating;
      }
    },
    changeCustom: (
      draft,
      action: PayloadAction<{ field: "descriptions"; value: string[] }>
    ) => {
      const { value } = action.payload;
      draft.custom.descriptions = value;
    },
    addSectionInForm: (draft, action: PayloadAction<{ form: ShowForm }>) => {
      const { form } = action.payload;
      switch (form) {
        case "workExperiences": {
          draft.workExperiences.push(structuredClone(initialWorkExperience));
          return draft;
        }
        case "educations": {
          draft.educations.push(structuredClone(initialEducation));
          return draft;
        }
        case "projects": {
          draft.projects.push(structuredClone(initialProject));
          return draft;
        }
      }
    },
    moveSectionInForm: (
      draft,
      action: PayloadAction<{
        form: ShowForm;
        idx: number;
        direction: "up" | "down";
      }>
    ) => {
      const { form, idx, direction } = action.payload;
      if (form !== "skills" && form !== "custom") {
        if (
          (idx === 0 && direction === "up") ||
          (idx === draft[form].length - 1 && direction === "down")
        ) {
          return draft;
        }

        const section = draft[form][idx];
        if (direction === "up") {
          draft[form][idx] = draft[form][idx - 1];
          draft[form][idx - 1] = section;
        } else {
          draft[form][idx] = draft[form][idx + 1];
          draft[form][idx + 1] = section;
        }
      }
    },
    deleteSectionInFormByIdx: (
      draft,
      action: PayloadAction<{ form: ShowForm; idx: number }>
    ) => {
      const { form, idx } = action.payload;
      if (form !== "skills" && form !== "custom") {
        draft[form].splice(idx, 1);
      }
    },
    setResume: (draft, action: PayloadAction<Resume>) => {
      return action.payload;
    },
  },
});

export const {
  changeProfile,
  changeWorkExperiences,
  changeEducations,
  changeProjects,
  changeSkills,
  changeCustom,
  addSectionInForm,
  moveSectionInForm,
  deleteSectionInFormByIdx,
  setResume,
} = resumeSlice.actions;

export const selectResume = (state: RootState) => state.resume;
export const selectProfile = (state: RootState) => state.resume.profile;
export const selectWorkExperiences = (state: RootState) =>
  state.resume.workExperiences;
export const selectEducations = (state: RootState) => state.resume.educations;
export const selectProjects = (state: RootState) => state.resume.projects;
export const selectSkills = (state: RootState) => state.resume.skills;
export const selectCustom = (state: RootState) => state.resume.custom;

export default resumeSlice.reducer;
