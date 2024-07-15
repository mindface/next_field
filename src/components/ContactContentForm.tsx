"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { convertLinesToParagraphs } from "../libs/convertString";

export default function ContactContentForm() {
  const router = useRouter();
  const [title,setTitle] = useState("");
  const [body,setBody] = useState("");
  const [email,setEmail] = useState("");
  const [name,setName] = useState("");
  const [validationText,setValidationText] = useState("");

  const sendAction = async () => {
    const sendItem = {
      name,
      email,
      title,
      body: convertLinesToParagraphs(body),
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

    try {
      const res = await fetch("/api/email",{
        method: "POST",
        body: JSON.stringify(sendItem)
      });
      const response = await res.json();
      if(response.status === 200) {
        router.push('/thanks');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="content-form">
      <div className="content-form__name content-form--item">
        <label htmlFor="name" className="label">お名前</label>
        <input type="text" name="name" id="name" className="name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="content-form__email content-form--item">
        <label htmlFor="email" className="label">メールアドレス</label>
        <input type="email" name="email" id="email" className="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="content-form__title content-form--item">
        <label htmlFor="title" className="label">題名</label>
        <input type="text" name="title" id="title" className="title" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div className="content-form__body content-form--item">
        <label htmlFor="body" className="label">内容</label>
        <textarea name="body" id="body" className="body textarea" value={body} onChange={(e) => setBody(e.target.value)}></textarea>
      </div>
      {validationText !== "" && 
      <div className="content-form__caution content-form--item">
        未入力項目があります。
      </div>}
      <div className="content-form__submit content-form--item">
        <input type="submit" id="submit" className="submit button" onClick={sendAction} value={"送信"} />
      </div>
    </div>
  );
}
