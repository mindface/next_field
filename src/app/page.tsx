import type { Metadata } from "next";
import MainSection from "../components/MainSection";

export const metadata: Metadata = {
  title: "next-field Home",
  description: "next-field for Next.js",
};

const Home = () => {
  return (
    <div className="index">
      <MainSection />
    </div>
  );
};

export default Home;
