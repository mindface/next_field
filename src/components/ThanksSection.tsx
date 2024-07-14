"use client";
import { useRouter } from "next/navigation";

export default function ThanksSection() {
  const router = useRouter();

  const goHomeAction = () => {
    router.push("/");
  }

  return (
    <section className="l-section thanks-section">
      <div className="content">
        <h3 className="content__title">お問い合わせいただきありがとうございます。</h3>
        <div className="content__detail">
          <p className="text">3営業日以内に改めてご連絡させていただきます。</p>
          <p className="text">お時間をいただき恐縮ですが、今しばらくお待ちいただけますと幸いです。</p>
          <p className="text">
            <button className="button" onClick={goHomeAction}>ホームへ戻る</button>
          </p>
        </div>
      </div>
    </section>
  );
}
