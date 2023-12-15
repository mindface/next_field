import React, { useState } from "react";
import NextImage from "next/image";
import MenuBox from "./MenuBox";

export default function BaseNavi() {
  let [_switch, _setSwitch] = useState(false);

  function menuBtnSwitch() {
    if (_switch) {
      _setSwitch(false);
    } else {
      _setSwitch(true);
    }
  }

  return (
    <>
      <header className="g-nav">
        <div className="header--nav _flex_s_b_">
          <div className="logo-box">
            <NextImage
              src="/logo.png"
              className="logo"
              alt="visualizer"
              width={180}
              height={45}
              priority
            />
          </div>
          <nav className="nav">
            <ul className="nav--list _flex_">
              <li className="nav__item">
                <button
                  className={_switch ? "btn active" : "btn"}
                  onClick={menuBtnSwitch}
                >
                  <span className="icon-item"></span>
                  <span className="icon-item"></span>
                  <span className="icon-item"></span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      {_switch && <MenuBox />}
    </>
  );
}
