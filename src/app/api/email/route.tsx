import { NextResponse, type NextRequest } from "next/server";
import nodemailer from "nodemailer";
import { env } from "process";
import {
  sanitaizeText,
  convertLinesToParagraphs,
} from "../../../libs/convertString";

// test用
export async function GET(reqest: NextRequest) {
  try {
    return NextResponse.json({ name: "Contact Api" });
  } catch (error) {
    throw error;
  }
}

export async function POST(reqest: NextRequest) {
  const { title, body, name, email } = await reqest.json();
  const _title = sanitaizeText(title);
  const _body = convertLinesToParagraphs(sanitaizeText(body));
  const _name = sanitaizeText(name);
  const _email = sanitaizeText(email);
  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: env.NODEMAILER_EMAIL,
      pass: env.NODEMAILER_PASSWORD,
    },
  });
  const mailOptions = {
    from: env.NODEMAILER_EMAIL,
    to: env.NODEMAILER_EMAIL,
    subject: `Message from お問い合わせ(${_email})`,
    text: `氏名: ${_name}`,
    html: `
    <p>氏名: ${_name}</p>
    <p>タイトル: ${_title}</p>
    <p>内容　------------------------</p>
    <div>${_body}</div>`,
  };
  const mailThanksOptions = {
    from: env.NODEMAILER_EMAIL,
    to: _email,
    subject: `お問い合わせいただきありがとうございます。`,
    text: `${_name}様`,
    html: `
    <p>${_name}様</p>
    <p>以下内容でお問い合わせを受け付けました。</p>
    <p>3営業日以内に改めてご連絡させていただきます。</p>
    <p>お時間をいただき恐縮ですが、今しばらくお待ちいただけますと幸いです。</p>
    <p>内容　------------------------</p>
    <p>タイトル: ${_title}</p>
    <div>${_body}</div>`,
  };

  try {
    await transport.sendMail(mailOptions);
    await transport.sendMail(mailThanksOptions);
    return NextResponse.json({ message: "Success", status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed", status: 500 });
  }
}
