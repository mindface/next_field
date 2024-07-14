"use client";
import { useState } from "react";

export default function ContactContentForm() {
  const [title,setTitle] = useState("");
  const [body,setBody] = useState("");
  const [email,setEmail] = useState("");
  const [name,setName] = useState("");
  const [validationText,setValidationText] = useState("");

  const validationAction = () => {
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
    // await fetch("/api/email",{
    //   method: "POST",
    //   body: JSON.stringify(sendItem)
    // });
  };

  return (
    <div className="content-form">
      <div className="content-form__name content-form--item">
        <label htmlFor="name" className="label">お名前</label>
        <input type="text" name="name" id="name" className="name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      { name === "" && 
        <div className="content-form__caution content-form--item">
          入力してください。
        </div>
      }
      <div className="content-form__email content-form--item">
        <label htmlFor="email" className="label">メールアドレス</label>
        <input type="email" name="email" id="email" className="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      { email === "" && 
        <div className="content-form__caution content-form--item">
          入力してください。
        </div>
      }
      <div className="content-form__title content-form--item">
        <label htmlFor="title" className="label">題名</label>
        <input type="text" name="title" id="title" className="title" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      { title === "" && 
        <div className="content-form__caution content-form--item">
          入力してください。
        </div>
      }
      <div className="content-form__body content-form--item">
        <label htmlFor="body" className="label">内容</label>
        <textarea name="body" id="body" className="body textarea" value={body} onChange={(e) => setBody(e.target.value)}></textarea>
      </div>
      { body === "" && 
        <div className="content-form__caution content-form--item">
          入力してください。
        </div>
      }
      <div className="content-form__submit content-form--item">
        <input type="submit" id="submit" className="submit button" value={"送信"} />
      </div>
    </div>
  );
}
