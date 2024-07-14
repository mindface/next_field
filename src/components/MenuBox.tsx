import { useRef, useState, useEffect } from "react";
import Link from "next/link";
// import CircleCanvas from "./module/CircleCanvas";
import InteractivePoints from "./module/InteractivePoints";
import linkLists from "../json/menu.json";

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
        {linkLists.map((link) => 
          <Link href={link.path} as={link.path} key={link.path} legacyBehavior>
            <a className="link" onClick={menuAction}>
              {link.name}
            </a>
          </Link>
        )}
      </nav>
    </section>
  );
}
