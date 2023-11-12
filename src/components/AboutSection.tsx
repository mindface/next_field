import React, { useState, useEffect } from "react";

export default function AboutSection() {
  return (
    <>
      <div className="about-section-bg"></div>
      <section className="l-section about-section">
        <div className="info-box">
          <h3 className="title">infomation</h3>
          <div className="sentence">
            <p className="text">Name | kamaguchi takanori</p>
            <p className="text">
              エンジニアリングとデザインの価値を模索し続けています。
            </p>
            <p className="text">
              ブラウザやアプリでのレンタリングプロセスから、目的に最適化された評価形成を目的にコード化しています。
            </p>
          </div>
        </div>
        <div className="skill-box">
          <div className="box _flex_">
            <h3 className="title">
              <span className="aid">Main Skill</span>
            </h3>
            <ul className="skill--list">
              <li className="skill__item">HTML</li>
              <li className="skill__item">CSS</li>
              <li className="skill__item">javascript</li>
              <li className="skill__item">Ajax</li>
              <li className="skill__item">Jquery</li>
              <li className="skill__item">Vue</li>
              <li className="skill__item">React</li>
            </ul>
          </div>
          <div className="box _flex_">
            <h3 className="title">
              <span className="aid">Sub Skill</span>
            </h3>
            <ul className="skill--list">
              <li className="skill__item">Rails</li>
              <li className="skill__item">ruby</li>
              <li className="skill__item">Django</li>
              <li className="skill__item">Python</li>
              <li className="skill__item">Next.js</li>
              <li className="skill__item">Nuxt</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
