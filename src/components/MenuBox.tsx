import { useRef, useState, useEffect } from "react";
import Link from "next/link";
// import CircleCanvas from "./module/CircleCanvas";
import InteractivePoints from "./module/InteractivePoints";

type Props = {
  menuAction?: () => void;
};

export default function MenuBox(props: Props) {
  const el = useRef(null);
  const menuAction = props.menuAction ?? (() => {});

  useEffect(() => {
    const hierarchy = new InteractivePoints({
      f_canvas: el.current,
    });
    hierarchy.init();
  }, []);

  return (
    <section className="canvas-section menu-section _flex_c_">
      <canvas id="menu" className="canvas" ref={el}></canvas>
      <nav className="nenu-nav">
        <Link href="/" as="/" legacyBehavior>
          <a className="link" onClick={menuAction}>
            Home
          </a>
        </Link>
        <Link href="/about" as="/about" legacyBehavior>
          <a className="link" onClick={menuAction}>
            About
          </a>
        </Link>
        <Link href="/memo" as="/memo" legacyBehavior>
          <a className="link" onClick={menuAction}>
            Memo
          </a>
        </Link>
      </nav>
    </section>
  );
}
