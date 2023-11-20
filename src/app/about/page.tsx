"use client"
import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import { motion } from "framer-motion";
import AboutSection from "../../components/AboutSection";

const About: NextPage = () => {
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
        <AboutSection />
      </div>
    </motion.div>
  );
};

export default About;
