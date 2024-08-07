import ContactContentForm from "./ContactContentForm";

export default function ContactContent() {
  // const submitAction = async (formData: FormData) => {
  //   // "use server";
  //   const name = formData.get("name");
  //   const email = formData.get("email");
  //   const title = formData.get("title");
  //   const body = formData.get("body");

  //   const sendItem = {
  //     name,
  //     email,
  //     title,
  //     body,
  //   };

  //   if (name === "" && email === "" && title === "" && body === "") {
  //     alert("未入力項目があります。");
  //     return;
  //   }

  //   await fetch(`${process.env.NEXT_PUBLIC_BASIC_URL}/api/email`, {
  //     method: "POST",
  //     body: JSON.stringify(sendItem),
  //   });
  // };

  return (
    <div className="content">
      <h3 className="content__title">お問い合わせ</h3>
      <ContactContentForm />
      {/* server componentを使おうとするとapi側でメールを送信できないため現状ContactContentFormで処理形成 */}
      {/* <form action={submitAction} className="content--form"><ContactContentForm /></form> */}
    </div>
  );
}
