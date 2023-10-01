import React, { useState, useRef, useEffect } from "react";
import MemoSectionNavi from "./MemoSectionNavi";
import OnLoadJs from "../on_load_js/base";

export default function MemoSection() {
  const el = useRef(null);
  const [post_data, setPostData] = useState([]);
  const [repository_data, setRepositoryData] = useState([]);

  useEffect(() => {
    const on_load_js = new OnLoadJs();
    on_load_js.init();
    const titles = el.current.querySelectorAll(".content__title");
    textFade(titles);
    fetachGetData("maker");
    fetachGetData("repositories");
  }, []);

  function textFade(titles) {
    titles.forEach((element) => {
      let putText = "";
      let text = element.innerText;
      let text_array = text.split("");
      text_array.map((text, index) => {
        putText +=
          '<span class="l" style="animation-delay:' +
          index * 0.1 +
          's" >' +
          text +
          "</span>";
      });
      element.innerHTML = putText;
    });
  }

  async function fetachGetData(rule) {
    let fetchGetHeader: object = {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "X-API-KEY": process.env.NEXT_PUBLIC_MICROAPI_KEY,
      },
      mode: "cors",
    };

    const res = await fetch(
      "https://nextfield.microcms.io/api/v1/" + rule,
      fetchGetHeader
    );
    if (res.status < 400) {
      res.json().then((respose) => {
        if (rule === "maker") setPostData(respose.contents);
        if (rule === "repositories") setRepositoryData(respose.contents);
      });
    }
  }

  return (
    <>
      <div className="l-box memo-classter" ref={el}>
        <div className="l-section memo-area" id="section1">
          <div className="content">
            <h3 className="content__title">Code data</h3>
            <div className="content__text">
             comming soon
            </div>
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
        </div>
        <div
          className="l-section memo-area memo-area--repository"
          id="section2"
        >
          <div className="content">
            <h3 className="content__title">make repositories</h3>
            <div className="content__text"></div>
            <div className="data-box">
              {repository_data.map((item, index) => {
                return (
                  <div key={"repository" + index} className="box">
                    <h3 className="title">
                      <a href={item.link} target="_new">
                        {item.title}
                      </a>
                    </h3>
                    <div className="text">カテゴリ</div>
                    <div
                      className="tag-box"
                      dangerouslySetInnerHTML={{ __html: item.category }}
                    ></div>
                    <div className="description">
                      <div
                        className="text"
                        dangerouslySetInnerHTML={{ __html: item.description }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
