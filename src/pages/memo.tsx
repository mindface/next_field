import React, { FC } from "react";
import  { NextPage } from "next";
import Head from "next/head";
import Layout from "../layout/index";
import MemoSection from "../components/MemoSection";

const Memo: NextPage = () => {
  return (
    <Layout>
      <div className="index">
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
      </div>
      <MemoSection />
    </Layout>
  );
};

export default Memo;
