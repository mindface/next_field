import React , { useState,useRef,useEffect } from 'react'
import MemoSectionNavi from "./MemoSectionNavi";
import OnLoadJs from "../on_load_js/base";

export default function MemoSection() {
   const el = useRef(null)

   const lll = [1,2,3,4,5]
   
   useEffect(() => {
     const on_load_js = new OnLoadJs()
     on_load_js.init()
     const titles = el.current.querySelectorAll('.content__title')
     textFade(titles)
   },[])

   function textFade(titles){
     titles.forEach(element => {
       let putText = '';
       let text = element.innerText
       let text_array = text.split("")
       text_array.map( (text,index) => {
         putText += '<span class="l" style="animation-delay:'+index*0.1+'s" >' +text+ '</span>'
       })
       element.innerHTML = putText
     });
   }

   return (
     <>
       <MemoSectionNavi />
       <div className="l-box memo-classter" ref={el}>
         <div className="l-section memo-area" id="section1">
           <div className="content">
             <h3 className="content__title">Code data</h3>
             <div className="content__text">以前検証した内容を記録しています。</div>
             <div className="data-box">
               {lll.map( (e,index) => 
                 <div key={index} className="box">
                 <h3 className="title">swiper.jsモーダルとの組み合わせ</h3>
                 <div className="text"></div>
                 <pre className="pre">
                    <code>
                    &lt;div class="swiper-container"&gt;
                          &lt;div class="swiper-wrapper"&gt;
                              &lt;div class="swiper-slide"&gt;Slide 1&lt;/div&gt;
                              &lt;div class="swiper-slide"&gt;Slide 2&lt;/div&gt;
                              &lt;div class="swiper-slide"&gt;Slide 3&lt;/div&gt;
                          &lt;/div&gt;
                          &lt;div class="swiper-pagination"&gt;&lt;/div&gt;
                          &lt;div class="swiper-button-prev"&gt;&lt;/div&gt;
                          &lt;div class="swiper-button-next"&gt;&lt;/div&gt;
                          &lt;div class="swiper-scrollbar"&gt;&lt;/div&gt;
                        &lt;/div&gt;
                      </code>
                    </pre>
                  </div>
                 )
               }
             </div>
           </div>
         </div>
         <div className="l-section memo-area" id="section2">
           <div className="content">
           <h3 className="content__title">Framework and Library</h3>
           <div className="content__text">利用したモジュールも含みます。</div>
             <div className="data-box">
               <div className="box">
                  <h3 className="title">comming soon</h3>
                  <div className="text">評価形成仮定</div>
               </div>
             </div>
           </div>
         </div>
       </div>
    </>
   )
}

