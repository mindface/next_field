import React , { useState,useEffect } from 'react'

export default function AboutSection() {

   return (
     <section className="l-section about-section">
       <div className="info-box">
         <h3 className="title">infomation</h3>
         <div className="sentence">
           <p className="text">Name | kamaguchi takanori</p>
           <p className="text">神経科学や物理学のデータを用いた心理学との接点にエンジニアリングとデザイニングの価値が含まれていると考えています。</p>
           <p className="text">ブラウザやアプリでのレンタリングプロセスから、目的に最適化された評価形成を目指しています。</p>
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
           </ul>
         </div>
       </div>
     </section>
   )
}

