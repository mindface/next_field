import React, { ReactNode } from "react";
import BaseNavi from "../components/BaseNavi";
import { useRouter } from "next/router";
import BackgroundRender from "../components/BackgroundRender";

type Props = {
  children?: ReactNode;
};

const Layout = ({ children }: Props) => {
  const router = useRouter();

  if (router.pathname === "/think") {
    return (
      <>
        <div className="wrapper">{children}</div>
        <BaseNavi />
      </>
    );
  }

  return (
    <>
      <BackgroundRender />
      <div className="wrapper">{children}</div>
      <BaseNavi />
    </>
  );
};

export default Layout;
