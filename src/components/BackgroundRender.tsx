"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Base from "./module/Base";
import { usePathname } from "next/navigation";
import sd01Image from "../images/sd_01.png";
import sd02Image from "../images/sd_02.png";
import sd03Image from "../images/sd_03.png";
import sd04Image from "../images/sd_04.png";
import sd05Image from "../images/sd_05.png";

function SwitchBackgroundNextImage() {
  const pathname = usePathname();
  switch (pathname) {
    case "/":
      return (
        {
          alt: "背景画像01",
          module: sd01Image
        }
      );
    case "/about":
      return (
        {
          alt: "背景画像02",
          module: sd02Image
        }
      );
    case "/memo":
      return (
        {
          alt: "背景画像03",
          module: sd03Image
        }
      );
    case "/think":
      return (
        {
          alt: "背景画像04",
          module: sd04Image
        }
      );
      break;
    case "/contact":
      return (
        {
          alt: "背景画像05",
          module: sd05Image
        }
      );
    default:
      return (
        {
          alt: "背景画像01",
          module: sd01Image
        }
      );
  }
}

export default function BackgroundRender() {
  const el = useRef(null);
  const [baseInstance,baseInstanceSet] = useState(new Base);
  const pathname = usePathname();
  const [domLoad, domLoadSet] = useState(true);
  // const [pathName, pathNameSet] = useState("sd_01.png");
  // const [imageWidth, imageWidthSet] = useState(0);
  // const [imageHeight, imageHeightSet] = useState(0);
  // useEffect(() => {
  //   imageWidthSet(window.innerWidth);
  //   imageHeightSet(window.innerHeight);
  // }, [pathname]);

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

  useEffect(() => {
    if(el.current && domLoad) {
      baseInstanceSet(new Base(el.current, switchBackground(pathname)));
      domLoadSet(false);
    }
    if(baseInstance) {
      baseInstance.nextSlide(switchBackground(pathname));
    }
  },[el, baseInstance, pathname])

  // three jsを利用したアニメーション
  return (
    <section className="canvas-section bg-section">
      <canvas id="can" className="canvas" ref={(node) => {
        let baseInstance: Base;
        el.current = node;
      }}></canvas>
    </section>
  )

  return (
    <div className="back-image-outer">
      {/* <Image
        className="back-image"
        alt={SwitchBackgroundNextImage().alt}
        src={SwitchBackgroundNextImage().module}
        priority={true}
        width={imageWidth}
        height={imageHeight}
      /> */}
      {/* <SwitchBackgroundNextImage /> */}
    </div>
  );
}
