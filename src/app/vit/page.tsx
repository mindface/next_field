"use client"
import React, { useRef, useEffect } from "react";
import { initVit } from "../../on_load_js/vit";

const Vit = () => {
  const canvas = useRef();

  useEffect(() => {
    initVit(canvas.current);
  },[])

  return (
    <>
      <div className="vit">
      </div>
      <canvas className="canvas" ref={canvas}></canvas>
    </>
  );
};

export default Vit;
