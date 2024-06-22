"use client"
import React from "react";
import { motion } from "framer-motion";
import Head from "next/head";
import MemoSection from "../../components/MemoSection";

const Memo = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transitionEnd: {},
      }}
      transition={{ duration: 1 }}
    >
      <div className="memo">
        <Head>
          <title>memo page</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
      </div>
      <MemoSection />
    </motion.div>
  );
};

export default Memo;
