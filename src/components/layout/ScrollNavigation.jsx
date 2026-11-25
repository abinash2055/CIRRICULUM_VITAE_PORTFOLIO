
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, ArrowDown } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const ScrollNavigation = () => {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const [isAtBottom, setIsAtBottom] = useState(false);

    // Detect whether the user has reached the bottom
    useEffect(() => {
        const checkScrollPosition = () => {
            const scrollTop = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight =
                document.documentElement.scrollHeight;

            setIsAtBottom(
                scrollTop + windowHeight >= documentHeight - 10
            );
        };

        checkScrollPosition();

        window.addEventListener("scroll", checkScrollPosition, {
            passive: true,
        });

        window.addEventListener("resize", checkScrollPosition);

        return () => {
            window.removeEventListener("scroll", checkScrollPosition);
            window.removeEventListener("resize", checkScrollPosition);
        };
    }, []);

    // Move upward by 1/4 of the screen height
    const scrollToTop = () => {
        window.scrollBy({
            top: -(window.innerHeight / 4),
            behavior: "smooth",
        });
    };

    // Move downward by 1/4 of the screen height
    const scrollToBottom = () => {
        window.scrollBy({
            top: window.innerHeight / 4,
            behavior: "smooth",
        });
    };

    // Smart controller: complete page navigation
    const handleSmartScroll = () => {
        if (isAtBottom) {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        } else {
            window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: "smooth",
            });
        }
    };

    // Glassmorphism button styling
    const buttonStyle = isDark
        ? "border-white/10 bg-gradient-to-br from-white/10 via-[#111A35]/90 to-cyan-400/10 text-cyan-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_5px_25px_rgba(0,0,0,0.3)] hover:border-cyan-300/50 hover:shadow-[0_0_22px_rgba(34,211,238,0.25)]"
        : "border-white/80 bg-gradient-to-br from-white/95 via-white/80 to-violet-100/70 text-violet-700 shadow-[inset_0_1px_2px_rgba(255,255,255,0.9),0_5px_25px_rgba(100,116,139,0.15)] hover:border-violet-300 hover:shadow-[0_0_22px_rgba(139,92,246,0.2)]";

    const buttonClass = `group relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border backdrop-blur-2xl transition-all duration-300 ${buttonStyle}`;

    return (
        <div className="fixed bottom-7 right-6 z-[100] flex flex-col gap-3 sm:bottom-9 sm:right-9">

            {/* 1. Scroll Up - 1/4 Screen */}
            <motion.button
                type="button"
                onClick={scrollToTop}
                whileHover={{ scale: 1.12, y: -3 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Scroll up one quarter screen"
                title="Scroll up (¼ screen)"
                className={buttonClass}
            >
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-60" />

                <ArrowUp
                    size={21}
                    strokeWidth={2.5}
                    className="relative z-10"
                />
            </motion.button>

            {/* 2. Scroll Down - 1/4 Screen */}
            <motion.button
                type="button"
                onClick={scrollToBottom}
                whileHover={{ scale: 1.12, y: 3 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Scroll down one quarter screen"
                title="Scroll down (¼ screen)"
                className={buttonClass}
            >
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-60" />

                <ArrowDown
                    size={21}
                    strokeWidth={2.5}
                    className="relative z-10"
                />
            </motion.button>

            {/* 3. Smart Complete Page Controller */}
            <motion.button
                type="button"
                onClick={handleSmartScroll}
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.9 }}
                aria-label={isAtBottom ? "Back to top" : "Go to bottom"}
                title={isAtBottom ? "Back to top" : "Go to bottom"}
                className={buttonClass}
            >
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-60" />

                <AnimatePresence mode="wait">
                    <motion.span
                        key={isAtBottom ? "up" : "down"}
                        initial={{
                            opacity: 0,
                            y: isAtBottom ? -10 : 10,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        exit={{
                            opacity: 0,
                            y: -10,
                        }}
                        transition={{ duration: 0.2 }}
                        className="relative z-10"
                    >
                        {isAtBottom ? (
                            <ArrowUp size={21} strokeWidth={2.5} />
                        ) : (
                            <ArrowDown size={21} strokeWidth={2.5} />
                        )}
                    </motion.span>
                </AnimatePresence>
            </motion.button>

        </div>
    );
};

export default ScrollNavigation;
