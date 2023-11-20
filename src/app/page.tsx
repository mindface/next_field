"use client"
import React from "react";
import { NextPage } from "next";
import { Metadata } from 'next'
import { motion } from "framer-motion";
import MainSection from "../components/MainSection";

// export const metadata: Metadata = {
//   title: "home page",
// }

function Home () {
  const transition = { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] };
  const variants = {
    inital: { scale: 0.9, opacity: 1 },
    enter: { scale: 1, opacity: 1, transition },
    exit: {
      scale: 0.5,
      opacity: 0,
      transition: { duration: 1.5, ...transition },
    },
  };
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{
        opacity: 1,
        transitionEnd: {
          opacity: 1,
        },
      }}
      transition={{ duration: 1 }}
    >
      <div className="index">
        <MainSection />
      </div>
    </motion.div>
  );
};

export default Home;
