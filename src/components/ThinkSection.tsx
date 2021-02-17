import React , { useRef,useEffect } from 'react'
import ThinkingPattern from "./module/ThinkingPattern";
import Head from 'next/head'

export default function ThinkSection() {
  const el = useRef(null)

  useEffect( ()=> {
  },[])

   return (
     <section className="l-section think-section">
       <Head>
         <script src="https://cdnjs.cloudflare.com/ajax/libs/dat-gui/0.7.7/dat.gui.js"></script>
       </Head>
       <div className="canvas" ref={el} ></div>
     </section>
   )
}

