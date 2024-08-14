"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
// import Base from "./module/Base";
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
  // const el = useRef(null);
  // const router = useRouter();
  const pathname = usePathname();
  // const [pathName, pathNameSet] = useState("sd_01.png");
  const [imageWidth, imageWidthSet] = useState(0);
  const [imageHeight, imageHeightSet] = useState(0);
  useEffect(() => {
    imageWidthSet(window.innerWidth);
    imageHeightSet(window.innerHeight);
  }, [pathname]);
  // useEffect(() => {
  //   // three jsを利用したアニメーション
  //   // new Base(el.current, switchBackground(router.pathname));
  //   switchBackgroundImage();
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

  // three jsを利用したアニメーション
  // return (
  //   <section className="canvas-section bg-section">
  //     <canvas id="can" className="canvas" ref={el}></canvas>
  //   </section>
  // )
  return (
    <div className="back-image-outer">
      <Image
        className="back-image"
        alt={SwitchBackgroundNextImage().alt}
        src={SwitchBackgroundNextImage().module}
        priority={true}
        width={imageWidth}
        height={imageHeight}
      />
      {/* <SwitchBackgroundNextImage /> */}
    </div>
  );
}
