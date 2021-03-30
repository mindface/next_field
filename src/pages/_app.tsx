import { AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";
import Router from "next/router";

const routeChange = () => {
  const tempFix = () => {
    const allStyleElems = document.querySelectorAll('style[media="x"]');
    allStyleElems.forEach((elem) => {
      elem.removeAttribute("media");
    });
  };
  tempFix();
};

function handleExitComplete() {
  if (typeof window !== "undefined") {
    window.scrollTo({ top: 0 });
  }
}

Router.events.on("routeChangeComplete", routeChange);
Router.events.on("routeChangeStart", routeChange);
function BaseApp({ Component, pageProps }) {
  return (
    <>
      <AnimatePresence exitBeforeEnter onExitComplete={handleExitComplete}>
        <Component {...pageProps} />
      </AnimatePresence>
    </>
  );
}

export default BaseApp;
