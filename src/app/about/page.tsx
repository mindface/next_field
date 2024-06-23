import type { Metadata } from "next";
import AboutSection from "../../components/AboutSection";

export const metadata: Metadata = {
  title: "next-field About",
  description: "next-field for Next.js",
};

const About = () => {
  return (
    <div className="about">
      <AboutSection />
    </div>
  );
};

export default About;
