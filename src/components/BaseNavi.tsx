import React, { useState } from 'react'
import Link from 'next/link'
import MenuBox from "./MenuBox";

export default function BaseNavi() {
  let [_switch,_setSwitch] = useState(false)

  function menuBtnSwitch(){
    if(_switch){
      _setSwitch(false)
    }else {
      _setSwitch(true)
    }
  }

  return (
    <>
    <header className="g-nav">
      <div className="header--nav _flex_s_b_">
        <div className="logo-box">
          <img src="/logo.png" className="logo" alt="logo" />
        </div>
        <nav className="nav">
          <ul className="nav--list _flex_">
            {/* <li className="nav__item">
              <Link href="/" as="/"><a className="link">Home</a></Link>
            </li>
            <li className="nav__item">
              <Link href="/about" as="/about"><a className="link">About</a></Link>
            </li>
            <li className="nav__item">
              <Link href="/memo" as="/memo"><a className="link">Memo</a></Link>
            </li> */}
            <li className="nav__item">
              <button className={ _switch ? 'btn active' : 'btn' } onClick={menuBtnSwitch} >
                 <span className="icon-item"></span>
                 <span className="icon-item"></span>
                 <span className="icon-item"></span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
    { _switch && <MenuBox /> }
    </>
  )
}

