import {
  initialEducation,
  initialProfile,
  initialProject,
  initialWorkExperience,
} from "lib/redux/resumeSlice";
import type { Resume } from "lib/redux/types";
import { deepClone } from "lib/deep-clone";

export const END_HOME_RESUME: Resume = {
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
      project: "ACraft-Resume",
      date: "Spring 2024",
      descriptions: [
        "Developed 100% ATS-friendly resume builder with client-side PDF export, customizable sections, and real-time score meter deployed on GitHub Pages",
      ],
    },
  ],
  skills: {
    featuredSkills: [],
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

export const START_HOME_RESUME: Resume = {
  profile: deepClone(initialProfile),
  workExperiences: END_HOME_RESUME.workExperiences.map(() =>
    deepClone(initialWorkExperience)
  ),
  educations: [deepClone(initialEducation)],
  projects: [deepClone(initialProject)],
  skills: {
    featuredSkills: [],
    descriptions: [],
  },
  custom: {
    descriptions: [],
  },
};
