import { Menu, Inbox } from "lucide-react";
import { Button } from "../components/ui/button"
import { ModeToggle } from "./mode-toggle";
import { useNavigate } from "react-router-dom";
import { useEffect, useCallback } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { toast } from 'sonner';
import Footer from "./Footer";


export default function Home() {
  const navigate = useNavigate();

  const handleGetStartedClick = useCallback(() => {
    if (localStorage.getItem('account-user')) {
      navigate("/List");
    } else {
      toast.info('Please log in to get started', {
        action: {
          label: 'Login',
          onClick: () => navigate("/login")
        }
      });
    }
  }, [navigate]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        handleGetStartedClick();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleGetStartedClick]);

  return (
    <div
      style={{
        backgroundImage: `
          radial-gradient(circle, rgba(34,197,94,0.4) 1.5px, transparent 1px),
          radial-gradient(circle, rgba(34,197,94,0.4) 1.5px, transparent 1px)
        `,
        backgroundPosition: "0 0, 10px 10px",
        backgroundSize: "20px 20px",
        backgroundRepeat: "repeat"
      }}
      className="bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100"
    >
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-transparent shadow-md px-6 py-4 fixed top-0 w-full z-50"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6 ">
           
            <div className="text-xl sm:text-2xl md:text-3xl text-green-500 font-extrabold tracking-wide">
              Task Manager
            </div>
          </div>
          <div className="flex items-center gap-4">
            <ModeToggle />
            {/* <button
              onClick={() => navigate("/login")}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md shadow transition"
            >
              Login
            </button> */}
          </div>
        </div>
      </motion.nav>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="min-h-screen w-full flex items-center justify-center px-4 py-24 sm:py-32"
      >

        <div className="text-center space-y-5 sm:space-y-6 max-w-xl w-full">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white"
            style={{ textShadow: "1px 1px 3px rgba(0,0,0,0.5)" }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Welcome to <span className="text-green-400">Task Manager</span>
          </motion.h1>
          <motion.p
            className="text-base sm:text-lg md:text-2xl text-gray-700 dark:text-gray-300"
            style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.4)" }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Organize your tasks in an ordered way
          </motion.p>
          <motion.button
            onClick={handleGetStartedClick}
            tabIndex={0}
            className="w-[45%] sm:w-[40%] md:w-[55%] lg:w-[30%] py-3.5 sm:py-3 px-5 sm:px-6 bg-green-500 hover:bg-green-600 active:scale-95 text-white font-semibold text-base sm:text-lg rounded-full shadow-xl focus:outline-none focus:ring-4 focus:ring-green-300 transition-all duration-300 ease-in-out"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
             Get Started
          </motion.button>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
}