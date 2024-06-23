"use client";
import { useState, useRef, useEffect } from "react";
// import MemoSectionNavi from "./MemoSectionNavi";
import OnLoadJs from "../on_load_js/base";
import { client } from "../libs/microcms.client";

export default function MemoContentMaker() {
  const el = useRef(null);
  const [post_data, setPostData] = useState([]);
  const [repository_data, setRepositoryData] = useState([]);

  // useEffect(() => {
    // const on_load_js = new OnLoadJs();
    // on_load_js.init();
    // const titles = el.current.querySelectorAll(".content__title");
    // textFade(titles);
    // fetachGetData("maker");
  // }, []);

  function textFade(titles) {
    titles.forEach((element) => {
      let putText = "";
      let text = element.innerText;
      let text_array = text.split("");
      text_array.map((text, index) => {
        putText +=
          "<span class='l' style='animation-delay:" +
          index * 0.1 +
          "s' >" +
          text +
          "</span>";
      });
      element.innerHTML = putText;
    });
  }

  async function fetachGetData(rule) {
    const data = await client.get({
      endpoint: rule,
    });
    if (rule === "maker") setPostData(data.contents);
  }

  return (
    <div className="content" ref={el}>
      <h3 className="content__title">Code data</h3>
      <div className="content__text">Comming Soon</div>
      {/* <div className="data-box">
        {post_data.map((item, index) => {
          return (
            <a
              key={"item" + index}
              href={"http://in0.php.xdomain.jp/?params=" + item.param}
              target="_new"
            >
              <div className="box">
                <div className="image-box">
                  <figure>
                    <img src={item.image.url} alt="" className="img" />
                  </figure>
                </div>
                <div className="box__text">
                  <h3 className="title">{item.title}</h3>
                  <div
                    className="text"
                    dangerouslySetInnerHTML={{ __html: item.content }}
                  ></div>
                </div>
              </div>
            </a>
          );
        })}
      </div> */}
    </div>
  );
}
