import React , { useRef,useState,useEffect } from 'react'
import Link from 'next/link'
import Circle from "./module/Circle";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

export default function MenuBox() {
  const el = useRef(null)
  const router = useRouter()

  const variants = {
    open: {
      transition: { staggerChildren: 0.07, delayChildren: 0.2 }
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 }
    }
  };

  const variants2 = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 }
      }
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 }
      }
    }
  };

  useEffect( ()=> {
    let bg = new Circle(el.current)
  },[])

  function switchBackground(pathName){
    switch (pathName) {
      case '/about':
        return 1
      break;
      case '/memo':
          return 2
        break;
      default:
        return 0
      break;
    }
  }

   return (
     <section className="canvas-section menu-section _flex_c_">
       <canvas id="menu" className="canvas" ref={el} ></canvas>
       <nav className="nenu-nav">
         <motion.ul className="nenu-nav--list" variants={variants}>
            <motion.li
              variants={variants2}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="nenu-nav__item"
            >
              <Link href="/" as="/"><a className="link">Home</a></Link>
            </motion.li>
            <motion.li
              variants={variants2}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="nenu-nav__item"
            >
              <Link href="/about" as="/about"><a className="link">About</a></Link>
            </motion.li>
            <motion.li
              variants={variants2}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="nenu-nav__item"
            >
              <Link href="/memo" as="/memo"><a className="link">Memo</a></Link>
            </motion.li>
          </motion.ul>
        </nav>
     </section>
   )
}

