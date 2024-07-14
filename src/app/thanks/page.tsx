import type { Metadata } from "next";
import ThanksSection from "../../components/ThanksSection";

export const metadata: Metadata = {
  title: "next-field thanks page",
  description: "next-field for Next.js",
};

const Thanks = () => {
  return (
    <div className="thanks">
      <ThanksSection />
    </div>
  );
};

export default Thanks;
