import type { Metadata } from "next";
import ContactSection from "../../components/ContactSection";

export const metadata: Metadata = {
  title: "next-field Contact",
  description: "next-field for Next.js",
};

const Contact = () => {
  return (
    <div className="contact">
      <ContactSection />
    </div>
  );
};

export default Contact;
