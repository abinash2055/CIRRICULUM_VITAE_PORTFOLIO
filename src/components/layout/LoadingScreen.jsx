import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((previous) => {
        if (previous >= 100) {
          clearInterval(interval);
          return 100;
        }

        return Math.min(
          previous + Math.floor(Math.random() * 8 + 3),
          100
        );
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const timeout = setTimeout(onComplete, 500);

      return () => clearTimeout(timeout);
    }
  }, [progress, onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-[#050816] text-white"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Background glow */}

        <div className="absolute h-72 w-72 rounded-full bg-purple-600/20 blur-[120px]" />

        <div className="relative flex flex-col items-center">

          {/* Logo */}

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-black tracking-wider gradient-text"
          >
            ABINASH NATH PANDEY
          </motion.h1>

          <p className="mt-3 text-xs tracking-[0.4em] text-gray-400">
            DIGITAL EXPERIENCE
          </p>

          {/* Animated ring */}

          <div className="relative my-12 flex h-24 w-24 items-center justify-center">

            <motion.div
              className="loader-ring absolute inset-0 rounded-full border-2 border-transparent border-t-cyan-400 border-r-purple-500"
            />

            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
              className="h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-600 shadow-[0_0_35px_#6366f1]"
            />
          </div>

          {/* Progress */}

          <div className="w-64">

            <div className="mb-3 flex justify-between text-xs text-gray-400">
              <span>INITIALIZING EXPERIENCE</span>
              <span>{progress}%</span>
            </div>

            <div className="h-1.5 overflow-hidden rounded-full bg-white/10">

              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.2 }}
              />

            </div>

            <p className="mt-5 text-center text-xs tracking-widest text-gray-500">
              CRAFTING SOMETHING EXTRAORDINARY
            </p>

          </div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;