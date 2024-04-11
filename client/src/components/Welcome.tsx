import React from "react";
import { Link } from "react-router-dom";
import { Cursor, Typewriter, useTypewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";

function Welcome() {
  const [text, count] = useTypewriter({
    words: ["HELLO, Welcome to My Detection Project"],
    delaySpeed: 2000,
  });

  return (
    <div className="flex flex-col">
      <h1 className="text-4xl text-center pt-14">{text}</h1>
      <div className="flex justify-center gap-x-16 mt-16">
        <Link to="/plateDetection">
          <motion.div
            initial={{
              y: -200,
              opacity: 0,
            }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 1.6,
            }}
            className="h-60 w-52 bg-gradient-to-r from-blue-800 to-indigo-900 cursor-pointer rounded-lg shadow-2xl flex justify-center items-center hover:animate-bounce"
          >
            <button className="text-white font-semibold text-xl">
              Plate Detection
            </button>
          </motion.div>
        </Link>
        <Link to="/patternDetection">
          <motion.div
            initial={{
              y: -200,
              opacity: 0,
            }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 1.6,
            }}
            className="h-60 w-52 bg-gradient-to-r from-purple-500 to-purple-900 cursor-pointer rounded-lg shadow-2xl flex justify-center items-center font-semibold text-xl hover:animate-bounce"
          >
            <button className="text-white">Pattern Detection</button>
          </motion.div>
        </Link>
      </div>
    </div>
  );
}

export default Welcome;
