import React, { useRef, useEffect } from "react";
import Base from "./module/Base";
import { useRouter } from "next/router";

export default function BackgroundRender() {
  const el = useRef(null);
  const router = useRouter();

  useEffect(() => {
    let bg = new Base(el.current, switchBackground(router.pathname));
  }, []);

  function switchBackground(pathName) {
    console.log(pathName)
    console.log("////-----")
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

  return (
    <section className="canvas-section bg-section">
      <canvas id="can" className="canvas" ref={el}></canvas>
    </section>
  );
}
