import React, { useRef, useEffect } from "react";
import Base from "./module/Base";
import { useRouter } from "next/router";

export default function BackgroundRender() {
  const el = useRef(null);
  const router = useRouter();

  // useEffect(() => {
  //   // three jsを利用したアニメーションが追加
  //   new Base(el.current, switchBackground(router.pathname));
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
        return <img className="back-image" src="/sd_01.png" />;
      case "/about":
        return <img className="back-image" src="/sd_02.png" />;
      case "/memo":
        return <img className="back-image" src="/sd_03.png" />;
      default:
        return <img className="back-image" src="/sd_01.png" />;
    }
  }

  // return (
  //   <section className="canvas-section bg-section">
  //     <canvas id="can" className="canvas" ref={el}></canvas>
  //   </section>
  // )
  return (
    switchBackgroundImage()
  )
}
