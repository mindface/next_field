"use client";
import { useRef, useState, useEffect } from "react";
import NextImage from "next/image";
// import Base from "./module/Base";
import { useRouter, usePathname } from "next/navigation";
import sd01Image from "../images/sd_01.png";
import sd02Image from "../images/sd_02.png";
import sd03Image from "../images/sd_03.png";
import sd04Image from "../images/sd_04.png";
import sd05Image from "../images/sd_05.png";

function SwitchBackgroundNextImage() {
  const pathname = usePathname();
  const [imageWidth, imageWidthSet] = useState(0);
  const [imageHeight, imageHeightSet] = useState(0);
  useEffect(() => {
    imageWidthSet(window.innerWidth);
    imageHeightSet(window.innerHeight);
  }, [pathname]);
  switch (pathname) {
    case "/":
      return <NextImage
        className="back-image"
        alt="背景画像"
        src={sd01Image}
        width={imageWidth}
        height={imageHeight}
      />;
    case "/about":
      return <NextImage
        className="back-image"
        alt="背景画像"
        src={sd02Image}
        width={imageWidth}
        height={imageHeight}
      />;
    case "/memo":
      return <NextImage
        className="back-image"
        alt="背景画像"
        src={sd03Image}
        width={imageWidth}
        height={imageHeight}
      />;
    case "/think":
      return <NextImage
        className="back-image"
        alt="背景画像"
        src={sd04Image}
        width={imageWidth}
        height={imageHeight}
      />;
      break;
    case "/contact":
      return <NextImage
        className="back-image"
        alt="背景画像"
        src={sd05Image}
        width={imageWidth}
        height={imageHeight}
      />;
    default:
      return <NextImage
        className="back-image"
        alt="背景画像"
        src={sd01Image}
        width={imageWidth}
        height={imageHeight}
      />;
  }
}

export default function BackgroundRender() {
  const el = useRef(null);
  const router = useRouter();
  const pathname = usePathname();
  const [pathName, pathNameSet] = useState("sd_01.png");
  const [imageWidth, imageWidthSet] = useState(0);
  const [imageHeight, imageHeightSet] = useState(0);

  // useEffect(() => {
  //   // three jsを利用したアニメーション
  //   // new Base(el.current, switchBackground(router.pathname));
  //   switchBackgroundImage();

  //   imageWidthSet(window.innerWidth);
  //   imageHeightSet(window.innerHeight);
  // }, [pathname]);

  // function switchBackground(pathName) {
  //   switch (pathName) {
  //     case "/":
  //       return 0;
  //     case "/about":
  //       return 1;
  //     case "/memo":
  //       return 2;
  //     default:
  //       return 0;
  //   }
  // }

  // function switchBackgroundImage() {
  //   // sp対応のケース
  //   // let pathSubName = ""
  //   // if (typeof window !== 'undefined') {
  //   //   const windowwidth = window.innerWidth;
  //   //   console.log(windowwidth)
  //   //   if ( windowwidth < 769) {
  //   //     pathSubName = 'sp_'
  //   //   }
  //   // }
  //   switch (pathname) {
  //     case "/":
  //       pathNameSet("sd_01.png");
  //       break;
  //     case "/about":
  //       pathNameSet("sd_02.png");
  //       break;
  //     case "/memo":
  //       pathNameSet("sd_03.png");
  //       break;
  //     case "/think":
  //       pathNameSet("sd_04.png");
  //       break;
  //     case "/contact":
  //       pathNameSet("sd_05.png");
  //       break;
  //     default:
  //       pathNameSet("sd_01.png");
  //       break;
  //     // return <img className="back-image" src="/sd_01.png" />;
  //   }
  // }


  // three jsを利用したアニメーション
  // return (
  //   <section className="canvas-section bg-section">
  //     <canvas id="can" className="canvas" ref={el}></canvas>
  //   </section>
  // )
  return (
    <div className="back-image-outer">
      {/* cssでの調整するケース */}
      {/* <div
        className="back-image"
        style={{ backgroundImage: `url(/${pathName})` }}
      ></div> */}
      {/* <NextImage
        className="back-image"
        alt="背景画像"
        src={'/'+pathName}
        width={imageWidth}
        height={imageHeight}
      /> */}
      <SwitchBackgroundNextImage />
    </div>
  );
}
