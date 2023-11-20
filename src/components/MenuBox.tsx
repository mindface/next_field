import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import CircleCanvas from "./module/CircleCanvas";
import InteractivePoints from "./module/InteractivePoints";

import { motion } from "framer-motion";

type Props = {
  onMenuBtnSwitch: () => void
}

export default function MenuBox(props: Props) {
  const router = useRouter()
  const el = useRef(null);
  const onMenuBtnSwitch = props.onMenuBtnSwitch ?? (() => {})

  const variants = {
    open: {
      transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
  };

  const variants2 = {
    open: {
      y: 0,
      opacity: 1,
      t6ransition: {
        y: { stiffness: 1000, velocity: -100 },
      },
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000, velocity: -100 },
      },
    },
  };

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
        <motion.ul className="nenu-nav--list" variants={variants}>
          <motion.li
            variants={variants2}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="nenu-nav__item"
          >
            <Link href="/" as="/" legacyBehavior>
              <a className="link" onClick={() => onMenuBtnSwitch()}>Home</a>
            </Link>
          </motion.li>
          <motion.li
            variants={variants2}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="nenu-nav__item"
          >
            <Link href="/about" as="/about" legacyBehavior>
              <a className="link" onClick={() => onMenuBtnSwitch()}>About</a>
            </Link>
          </motion.li>
          <motion.li
            variants={variants2}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="nenu-nav__item"
          >
            <Link href="/memo" as="/memo" legacyBehavior>
              <a className="link" onClick={() => onMenuBtnSwitch()}>Memo</a>
            </Link>
          </motion.li>
        </motion.ul>
      </nav>
    </section>
  );
}
