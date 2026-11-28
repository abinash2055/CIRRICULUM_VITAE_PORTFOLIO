import { useState, useCallback } from "react";

import { ThemeProvider } from "./context/ThemeContext";
import CustomCursor from "./components/layout/CustomCursor";

import ToolsMarquee from "./components/pageDivision/ToolsMarquee"

import ExperienceEducationDivider from "./components/pageDivision/experienceEducation/ExperienceEducationDivider";
import EducationCertificateDivider from "./components/pageDivision/educationCertificate/EducationCertificateDivider";

import LoadingScreen from "./components/layout/LoadingScreen";
import ScrollNavigation from "./components/layout/ScrollNavigation";


import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/hero/Hero";
import AboutMe from "./components/sections/about/AboutMe";
import Skills from "./components/sections/skills/Skills"
import Experience from "./components/sections/experience/Experience";
import Education from "./components/sections/education/Education";
import Certification from "./components/sections/certifications/Certifications"
import Contact from "./components/contact/Contact";


const Portfolio = () => {
  const [loading, setLoading] = useState(true);

  const handleLoadingComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {loading && (
        <LoadingScreen onComplete={handleLoadingComplete} />
      )}

      <div className="min-h-screen overflow-x-hidden bg-[#f8f9ff] text-slate-900 transition-colors duration-500 dark:bg-[#050816] dark:text-white">

        <CustomCursor />

        <Navbar />
        <ScrollNavigation />

        <main>
          <Hero />
          <AboutMe />
          <Skills />
          <ToolsMarquee />
          <Experience />
          <ExperienceEducationDivider />
          <Education />
          <EducationCertificateDivider />
          <Certification />
          <Contact />
        </main>

      </div>
    </>
  );
};

function App() {
  return (
    <ThemeProvider>
      <Portfolio />
    </ThemeProvider>
  );
}

export default App;