import React , { useState,useRef,useEffect } from 'react'
import MemoSectionNavi from "./MemoSectionNavi";
import OnLoadJs from "../on_load_js/base";

export default function MemoSection() {
   const el = useRef(null)
   const [post_data,setPostData] = useState([])
   
   useEffect(() => {
     const on_load_js = new OnLoadJs()
     on_load_js.init()
     const titles = el.current.querySelectorAll('.content__title')
     textFade(titles)
     fetachGetData()
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

   async function fetachGetData(){
    let fetchGetHeader:object = {
      method: 'GET',
      headers: {
       "Content-Type": "application/json; charset=utf-8",
      },
      credentials: 'same-origin',
      mode: "cors",
    }

     const res = await fetch("http://wwwdi.work/beta/wp-json/wp/v2/photo05",fetchGetHeader)
     console.log()
     if(res.status < 400){
      res.json().then( respose => {
        setPostData(respose)
      } )
     }
   }

   function _API_FETCH_() {
    let fetchGetHeader:object = {
      method: 'GET',
      headers: {
       "Content-Type": "application/json; charset=utf-8",
      },
      credentials: 'same-origin',
      mode: "cors",
    }
  
    return new Promise(function(resolve,reject){
     fetch("http://wwwdi.work/beta/wp-json/wp/v2/photo05",fetchGetHeader).then((response) => {
      return response.json()
      })
      .then((res) => {
        resolve(res)
      })
      .catch((error) => {
        console.log("error")
        console.log(error)
        reject(error)
      })
    })
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
               { post_data.map( (item,index) => {
                  return (
                   <a href={'http://wwwdi.work?params='+item.view_params} target="_new">
                      <div key={'item'+index} className="box">
                        <div className="box__text">
                          <h3 className="title">{item.title.rendered}</h3>
                          <div className="text" dangerouslySetInnerHTML={{__html:item.content.rendered}} >
                          </div>
                        </div>
                        <div className="img-box">
                          <img src={item.custom_fields} alt="" className="img"/>
                        </div>
                      </div>
                   </a>
                  )
                 })
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

