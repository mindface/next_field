"use client";
import { useState } from "react";

export default function ContactContent() {
  const [title,setTitle] = useState("");
  const [body,setBody] = useState("");
  const [email,setEmail] = useState("");
  const [name,setName] = useState("");
  const [validationText,setValidationText] = useState("");

  const submitAction = async (e: React.FormEvent) => {
    e.preventDefault();
    const sendItem = {
      name,
      email,
      title,
      body,
    };

    if(
      name === "" &&
      email === "" &&
      title === "" &&
      body === ""
    ) {
      setValidationText("未入力の項目があります。");
      return;
    }else {
      setValidationText("");
    }

    await fetch("/api/email",{
      method: "POST",
      body: JSON.stringify(sendItem)
    });
  };

  return (
    <div className="content">
      <h3 className="content__title">お問い合わせ</h3>
      <form onSubmit={submitAction} method="post" className="content--form">
        <div className="content__form">
          <div className="content__form__email content__form--item">
            <label htmlFor="name" className="label">お名前</label>
            <input type="text" name="name" id="name" className="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="content__form__email content__form--item">
            <label htmlFor="email" className="label">メールアドレス</label>
            <input type="email" name="email" id="email" className="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="content__form__title content__form--item">
            <label htmlFor="title" className="label">題名</label>
            <input type="text" name="title" id="title" className="title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="content__form__body content__form--item">
            <label htmlFor="body" className="label">内容</label>
            <textarea name="body" id="body" className="body textarea" value={body} onChange={(e) => setBody(e.target.value)}></textarea>
          </div>
          { validationText !== "" && 
            <div className="content__form__caution content__form--item">
              {validationText}
            </div>
          }
          <div className="content__form__submit content__form--item">
            <input type="submit" id="submit" className="submit button" value={"送信"} />
          </div>
        </div>
      </form>
    </div>
  );
}
