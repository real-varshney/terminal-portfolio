import { useEffect, useState } from "react";
import Terminal from "../components/TerminalComponent";
import { motion } from "framer-motion";
import { div } from "framer-motion/client";

const Home = () => {
  const [showArrow, setShowArrow] = useState(true);
  const fullName = "Vishal Varshney";
  const [typedName, setTypedName] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setShowArrow((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let i = 0;
    setTypedName(""); // Reset name before typing
    const typingInterval = setInterval(() => {
      if (i < fullName.length) {
        setTypedName(fullName.slice(0, i + 1)); // Slice ensures no "undefined"
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100); // Smooth typing speed

    return () => clearInterval(typingInterval);
  }, []);

  return (

    <div className="dark:bg-[#0D1117] h-screen w-screen flex justify-center items-center">
        
        <Terminal />
    </div>

    // <div className="font-mono h-screen flex flex-col bg-white dark:bg-[#0D1117] text-black dark:text-green-400 relative transition-colors duration-300">
      
      
    //   {/* Typewriter Effect */}
    //   <motion.h1
    //     className="text-3xl md:text-4xl font-bold tracking-wide mt-4"
    //     initial={{ opacity: 0, y: -20 }}
    //     animate={{ opacity: 1, y: 0 }}
    //     transition={{ duration: 0.5 }}
    //   >
    //     {typedName}
    //     <motion.span
    //       className="text-green-400"
    //       animate={{ opacity: [0, 1, 0] }}
    //       transition={{ repeat: Infinity, duration: 0.8 }}
    //     >
    //       |
    //     </motion.span>
    //   </motion.h1>

    //   {/* Hacker Terminal Message */}
    //   <motion.p
    //     className="text-lg mt-4 text-green-500 opacity-80  max-w-lg"
    //     initial={{ opacity: 0 }}
    //     animate={{ opacity: 1 }}
    //     transition={{ delay: 1, duration: 1 }}
    //   >
    //     ├── STATUS: Connected to localhost <br />
    //     ├── Access Level: Admin 🟢 <br />
    //     ├── Type <code className="text-green-300">help</code> to see available commands.  
    //   </motion.p>

    //   {/* Animated Arrow */}
    //   <motion.div
    //     className="absolute bottom-10 text-3xl"
    //     animate={{ y: [0, 10, 0] }}
    //     transition={{ repeat: Infinity, duration: 1 }}
    //   >
    //     {showArrow && <span>↓</span>}
    //   </motion.div>
    // </div>
  );
};

export default Home;
