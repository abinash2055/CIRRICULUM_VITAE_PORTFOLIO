
import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

const CustomCursor = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const [click, setClick] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const cursorX = useSpring(mouseX, {
    stiffness: 160,
    damping: 18,
    mass: 0.25,
  });

  const cursorY = useSpring(mouseY, {
    stiffness: 160,
    damping: 18,
    mass: 0.25,
  });

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine)");

    const update = () => setEnabled(media.matches);

    update();
    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const previousCursor = document.documentElement.style.cursor;
    document.documentElement.style.cursor = "none";

    const handleMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target;

      setHover(
        !!target.closest(
          "a, button, input, textarea, select, [role='button']"
        )
      );
    };

    const handleDown = () => setClick(true);
    const handleUp = () => setClick(false);

    const handleLeave = () => {
      mouseX.set(-100);
      mouseY.set(-100);
      setHover(false);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);
    document.addEventListener("mouseleave", handleLeave);

    return () => {
      document.documentElement.style.cursor = previousCursor;

      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
      document.removeEventListener("mouseleave", handleLeave);
    };
  }, [enabled, mouseX, mouseY]);

  if (!enabled) return null;

  const colors = isDark
    ? {
      primary: "#A855F7",
      secondary: "#22D3EE",
      third: "#6366F1",
      glow: "rgba(168,85,247,0.5)",
    }
    : {
      primary: "#7E22CE",
      secondary: "#0891B2",
      third: "#4F46E5",
      glow: "rgba(126,34,206,0.3)",
    };

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[99999]"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      aria-hidden="true"
    >
      {/* Liquid Glow */}
      <motion.div
        animate={{
          scale: hover ? 2 : 1.5,
          opacity: hover ? 0.65 : 0.4,
        }}
        transition={{ duration: 0.3 }}
        className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full blur-xl"
        style={{
          background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
        }}
      />

      {/* Main Morphing Liquid Shape */}
      <motion.div
        animate={{
          width: hover ? 58 : click ? 25 : 38,
          height: hover ? 42 : click ? 25 : 38,
          borderRadius: hover
            ? ["42% 58% 60% 40% / 45% 40% 60% 55%", "60% 40% 42% 58% / 55% 60% 40% 45%"]
            : ["55% 45% 60% 40% / 45% 55% 45% 55%", "45% 55% 40% 60% / 55% 45% 55% 45%"],
          rotate: hover ? [0, 12, -12, 0] : [0, 18, -18, 0],
          scale: click ? 0.85 : 1,
        }}
        transition={{
          width: { type: "spring", stiffness: 220, damping: 16 },
          height: { type: "spring", stiffness: 220, damping: 16 },
          borderRadius: {
            duration: 2.2,
            repeat: Infinity,
            ease: "easeInOut",
          },
          rotate: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          },
          scale: { duration: 0.2 },
        }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border border-white/50"
        style={{
          background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary}, ${colors.third})`,
          boxShadow: `0 0 12px ${colors.glow}, 0 0 28px ${colors.glow}, inset 2px 2px 8px rgba(255,255,255,0.65), inset -4px -5px 10px rgba(0,0,0,0.2)`,
          filter: "saturate(1.3)",
        }}
      >
        {/* Glass Reflection */}
        <div className="absolute left-[20%] top-[15%] h-[25%] w-[35%] rounded-full bg-white/70 blur-[3px]" />
      </motion.div>

      {/* Small Liquid Particle */}
      <motion.div
        animate={{
          x: hover ? 25 : 17,
          y: hover ? -22 : -15,
          scale: click ? 0 : [0.8, 1.2, 0.8],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-1/2 top-1/2 h-2.5 w-2.5 rounded-full"
        style={{
          background: colors.secondary,
          boxShadow: `0 0 12px ${colors.secondary}`,
        }}
      />

      {/* Click Ripple */}
      <motion.div
        animate={{
          scale: click ? 2.5 : 0,
          opacity: click ? 0.8 : 0,
        }}
        transition={{ duration: 0.4 }}
        className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
        style={{
          borderColor: colors.secondary,
        }}
      />
    </motion.div>
  );
};

export default CustomCursor;
