# ACraft-Resume 📄✨

> **100% ATS-Friendly Resume Builder & Diagnostic Scanner**  
> *Engineered for maximum interview callback rates with real-time ATS scoring, client-side PDF generation, and zero server tracking.*

---

### 🎓 Academic Project Information
- **Author**: Abhishek
- **Degree**: Bachelor of Computer Applications (BCA)
- **Institution**: New Horizon College, Kasturi Nagar, Bangalore, Karnataka, India
- **License**: [MIT License](LICENSE)

---

## 🌟 Key Features

| Feature | Description |
|---|---|
| **🎯 100% ATS Optimization** | Generates strict single-column, monochrome layouts with standardized section headings (`TECHNICAL SKILLS`, `EXPERIENCE`, `PROJECTS`, `EDUCATION`) compliant with Workday, Taleo, Greenhouse, and Lever. |
| **📊 Real-Time ATS Score Gauge** | Live visual scoring bar with a 6-criteria breakdown analyzing contact data, professional summary, work history, education, projects, and categorized technical skills. |
| **📑 Continuous Multi-Page Layout** | Dynamic page wrapping ensures lengthy career histories expand into clean multiple pages without clipping, hiding, or overflowing text. |
| **🔍 Diagnostic Resume Parser** | Upload existing resume PDFs to audit section recognition, text-item density, and ATS readability, with a 1-click button to open parsed data directly in the builder. |
| **🔒 100% Client-Side & Private** | Zero servers, zero external databases, and zero tracking. All PDF rendering and parsing execute locally inside the browser. Works completely offline. |
| **⚡ 1-Click Template & Clean Reset** | Instantly load a pre-configured 100% ATS sample template or clear all fields to start fresh with a blank canvas. |

---

## 🛠️ Tech Stack & Architecture

- **Web Framework**: [Next.js 13](https://nextjs.org/) (App Router, Static HTML Export)
- **UI Library**: [React 18](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict type safety across state, forms, and PDF models)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) (Centralized reactive resume state and custom settings)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & Heroicons
- **PDF Generation**: [@react-pdf/renderer](https://react-pdf.org/) (Client-side vector PDF document compiler)
- **PDF Extraction**: [PDF.js](https://mozilla.github.io/pdf.js/) (Local client-side text and coordinate extraction)

---

## 📁 Project Directory Structure

```text
open-resume/
├── .github/
│   └── workflows/
│       └── deploy.yml            # Automated GitHub Pages CI/CD workflow
├── public/
│   ├── assets/                   # Vector illustrations and feature graphics
│   ├── fonts/                    # Bundled TTF typography (Calibri, Garamond, etc.)
│   └── resume-example/           # Verified ATS benchmark PDF samples
├── src/
│   └── app/
│       ├── layout.tsx            # Global metadata, font definitions, and TopNavBar
│       ├── page.tsx              # Modernized homepage showcase
│       ├── resume-builder/       # Interactive builder with form controls & score meter
│       ├── resume-parser/        # ATS diagnostic scanner & structured preview
│       ├── resume-import/        # PDF upload dropzone with auto-extraction
│       ├── components/
│       │   ├── Resume/           # Resume preview frame, control bar, and ScoreMeter
│       │   │   └── ResumePDF/    # Single-column ATS PDF components & typography
│       │   ├── ResumeForm/       # Modular input sections (Profile, Skills, Education, etc.)
│       │   └── TopNavBar.tsx     # Clean header navigation with project accreditation
│       └── lib/
│           ├── redux/            # Store, resumeSlice, and settingsSlice
│           └── parse-resume/     # Text-item clustering and heading extraction algorithms
├── next.config.js                # Conditional GitHub Pages static export config
├── package.json                  # Scripts and dependencies
└── README.md                     # Project documentation
```

---

## 🚀 Getting Started (Local Development)

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.x or later recommended)
- `npm` (v9.x or later)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/<your-username>/ACraft-Resume.git
   cd ACraft-Resume
   ```

2. **Install project dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to [http://localhost:3000](http://localhost:3000) to view ACraft-Resume.

---

## 🌐 Static Export & GitHub Pages Deployment

ACraft-Resume is designed to compile into a 100% static client-side bundle.

### 1. Manual Static Build
```bash
npm run export:gh
```
This builds and exports all HTML, CSS, JavaScript, and assets into the `./out` directory with unoptimized images and basePath pre-configured for GitHub Pages.

### 2. Automated Deployment via GitHub Actions
A pre-configured GitHub Actions workflow is provided at [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).
Whenever you push to the `main` branch, the workflow will automatically build the static site and publish it to GitHub Pages.

To enable GitHub Pages in your GitHub repository:
1. Go to your repository's **Settings** > **Pages**.
2. Under **Build and deployment** > **Source**, select **GitHub Actions**.
3. Push to `main` — your live application will deploy automatically!

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) - see the [LICENSE](LICENSE) file for details.

---

### Acknowledgments & Attribution
Developed with dedication by **Abhishek** as a college project for **New Horizon College, Kasturi Nagar, Bangalore**. Built on open-source foundations to give every job seeker and student access to verified, interview-winning resumes.
