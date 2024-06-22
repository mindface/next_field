import React from "react";
import type { Metadata } from 'next'
import ThinkSection from "../../components/ThinkSection";

export const metadata: Metadata = {
  title: "next-field Think",
  description: "next-field for Next.js",
}

const Think = () => {
  return (
    <div className="index">
      <ThinkSection />
    </div>
  );
};

export default Think;
