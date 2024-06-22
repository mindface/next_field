import type { Metadata } from 'next'
import MemoSection from "../../components/MemoSection";

export const metadata: Metadata = {
  title: "next-field Memo",
  description: "next-field for Next.js",
}

const Memo = () => {
  return (
    <div className="memo">
      <MemoSection />
    </div>
  );
};

export default Memo;
