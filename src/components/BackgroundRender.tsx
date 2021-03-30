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
    switch (pathName) {
      case "/about":
        return 1;
        break;
      case "/memo":
        return 2;
        break;
      default:
        return 0;
        break;
    }
  }

  return (
    <section className="canvas-section bg-section">
      <canvas id="can" className="canvas" ref={el}></canvas>
    </section>
  );
}
