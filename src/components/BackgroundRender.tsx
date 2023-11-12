import React, { useRef, useEffect } from "react";
import Base from "./module/Base";
import { useRouter } from "next/router";

export default function BackgroundRender() {
  const el = useRef(null);
  const router = useRouter();

  // useEffect(() => {
    // three jsを利用したアニメーションが追加
    // let bg = new Base(el.current, switchBackground(router.pathname));
  // }, [router.pathname]);

  function switchBackground(pathName) {
    switch (pathName) {
      case "/":
        return 0;
      case "/about":
        return 1;
      case "/memo":
        return 2;
      default:
        return 0;
    }
  }

  function switchBackgroundImage() {
    switch (router.pathname) {
      case "/":
        return <img className="canvas" src="/sd_01.jpg" />;
      case "/about":
        return <img className="canvas" src="/sd_02.jpg" />;
      case "/memo":
        return <img className="canvas" src="/sd_03.jpg" />;
      default:
        return <img className="canvas" src="/sd_01.jpg" />;
    }
  }

  return (
    <section className="canvas-section bg-section">
      {/* <canvas id="can" className="canvas" ref={el}></canvas> */}
      {switchBackgroundImage()}
    </section>
  );
}
