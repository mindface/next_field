"use client"
import React, { useRef, useEffect } from "react";
import { initParticle } from "../on_load_js/think";

export default function ThinkSection() {
  const canvas = useRef(null);

  useEffect(() => {
    initParticle(canvas.current);
  },[]);

  return (
    <section className="l-section think-section">
      <canvas className="canvas" id="canvas" ref={canvas}></canvas>
    </section>
  );
}
