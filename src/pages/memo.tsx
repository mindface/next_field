import React from "react";
import { NextPage } from "next";
import { motion } from "framer-motion";
import Head from "next/head";
import Layout from "../layout/index";
import MemoSection from "../components/MemoSection";

const Memo: NextPage = () => {
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
        <div className="memo">
          <Head>
            <title>memo page</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
        </div>
        <MemoSection />
      </motion.div>
    </Layout>
  );
};

export default Memo;
