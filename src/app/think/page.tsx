"use client"
import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import ThinkSection from "../../components/ThinkSection";

const Think = () => {
  const transition = { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transitionEnd: {},
      }}
      transition={{ duration: 1 }}
    >
      <div className="index">
        <Head>
          <title>about page</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <ThinkSection />
      </div>
    </motion.div>
  );
};

export default Think;
