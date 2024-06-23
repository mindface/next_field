import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "next-field 404",
  description: "not fund!",
};

const NotFound = () => {
  return (
    <div>
      <div className="p-4">
        <h3 className="title">404</h3>
      </div>
    </div>
  );
};

export default NotFound;
