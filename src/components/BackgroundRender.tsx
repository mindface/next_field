import React, { useRef, useState, useEffect } from "react";
import NextImage from "next/image";
// import Base from "./module/Base";
import { useRouter } from "next/router";

export default function BackgroundRender() {
  const el = useRef(null);
  const router = useRouter();
  const [pathName,pathNameSet] = useState('');
  const [imageWidth,imageWidthSet] = useState(0);
  const [imageHeight,imageHeightSet] = useState(0);

  useEffect(() => {
    // three jsを利用したアニメーション
    // new Base(el.current, switchBackground(router.pathname));
    switchBackgroundImage();

    imageWidthSet(window.innerWidth);
    imageHeightSet(window.innerHeight);
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
        pathNameSet("/sd_01.png");
        break;
      case "/about":
        pathNameSet("/sd_02.png");
        break;
      case "/memo":
        pathNameSet("/sd_03.png");
        break;
      default:
        pathNameSet("/sd_01.png");
        break;
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
      {/* cssでの調整するケース */}
      <div className="back-image" style={{backgroundImage:`url('${pathName}')`}}></div>
      {/* <NextImage
        className="back-image"
        alt="背景画像"
        src={'/'+pathName}
        width={imageWidth}
        height={imageHeight}
      /> */}
    </>
  )
}
