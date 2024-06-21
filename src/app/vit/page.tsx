import React, { useRef, useEffect } from "react";
import { NextPage } from "next";
import { motion } from "framer-motion";
import Head from "next/head";
import { initVit } from "../../on_load_js/vit";

const Vit: NextPage = () => {
  const canvas = useRef();

  useEffect(() => {
    initVit(canvas.current);
  },[])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transitionEnd: {},
      }}
      transition={{ duration: 1 }}
    >
      <div className="vit">
        <Head>
          <title>vit page</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
      </div>
      <canvas className="canvas" ref={canvas}></canvas>
    </motion.div>
  );
};

export default Vit;
