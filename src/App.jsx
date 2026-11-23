import { useState, useCallback } from "react";

import { ThemeProvider } from "./context/ThemeContext";

import CustomCursor from "./components/layout/CustomCursor";

import LoadingScreen from "./components/layout/LoadingScreen";
import Navbar from "./components/layout/Navbar";

import Hero from "./components/sections/Hero";

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

        {/* Custom Cursor */}
        <CustomCursor />

        <Navbar />

        <main>
          <Hero />
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