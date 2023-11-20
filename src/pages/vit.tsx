import React, { useRef, useEffect } from "react";
import { NextPage } from "next";
import { motion } from "framer-motion";
import Head from "next/head";
import Layout from "../layout/index";
import { initVit } from "../on_load_js/vit";

const Vit: NextPage = () => {
  const canvas = useRef()
  let counter = 0;

  useEffect(() => {
    initVit(canvas.current);
  },[])

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
            <title>vit page</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
        </div>
        <canvas className="canvas" ref={canvas}></canvas>
      </motion.div>
    </Layout>
  );
};

export default Vit;
