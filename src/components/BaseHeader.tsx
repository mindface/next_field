import React from "react";
import BaseNavi from "../components/BaseNavi";

function BaseHeader() {

  return (
    <header className="base-header">
      <div className="header--body">
        <div className="logo">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
        </div>
        <h3 className="header__title">{/* { this.props.title } */}</h3>
        <BaseNavi />
      </div>
    </header>
  );
}

export default BaseHeader;
