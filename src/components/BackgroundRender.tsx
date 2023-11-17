import React, { useRef, useState, useEffect } from "react";
// import Base from "./module/Base";
import { useRouter } from "next/router";

export default function BackgroundRender() {
  const el = useRef(null);
  const router = useRouter();
  const [pathName,pathNameSet] = useState('');

  useEffect(() => {
    // three jsを利用したアニメーション
    // new Base(el.current, switchBackground(router.pathname));
    switchBackgroundImage()
  }, [router.pathname])

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
    // sp対応のケース
    // let pathSubName = ""
    // if (typeof window !== 'undefined') {
    //   const windowwidth = window.innerWidth;
    //   console.log(windowwidth)
    //   if ( windowwidth < 769) {
    //     pathSubName = 'sp_'
    //   }
    // }
    switch (router.pathname) {
      case "/":
        pathNameSet("/sd_01.png")
        break
      case "/about":
        pathNameSet("/sd_02.png")
        break
      case "/memo":
        pathNameSet("/sd_03.png")
        break
      default:
        pathNameSet(`/sd_01.png`)
        break
        // return <img className="back-image" src="/sd_01.png" />;
    }
  }

  // three jsを利用したアニメーション
  // return (
  //   <section className="canvas-section bg-section">
  //     <canvas id="can" className="canvas" ref={el}></canvas>
  //   </section>
  // )
  return (
    <>
      <img className="back-image" src={pathName} />
    </>
  )
}
