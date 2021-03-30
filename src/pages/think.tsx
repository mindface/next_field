import React, { FC } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { motion } from "framer-motion";
import Layout from "../layout/index";
import ThinkSection from "../components/ThinkSection";

const Think: NextPage = () => {
  const transition = { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] };
  const variants = {
    inital: { scale: 0.9, opacity: 0 },
    enter: { scale: 1, opacity: 1, transition },
    exit: {
      scale: 0.5,
      opacity: 0,
      transition: { duration: 1.5, ...transition },
    },
  };
  return (
    <Layout>
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
            <title>Create Next App</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <ThinkSection />
        </div>
      </motion.div>
    </Layout>
  );
};

export default Think;
