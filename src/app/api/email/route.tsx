import { NextResponse, type NextRequest } from "next/server";
import nodemailer from "nodemailer";
import { env } from "process";
import { redirect } from "next/navigation";

// test用
export async function GET(reqest:NextRequest) {
  try {
    return NextResponse.json({ name: "Contact Api" });
  } catch (error) {
    throw error;
  }
}

export async function POST(reqest:NextRequest) {
  const { title, body, name, email } = await reqest.json();
  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: env.NODEMAILER_EMAIL,
      pass: env.NODEMAILER_PASSWORD
    }
  });
  const mailOptions = {
    from: env.NODEMAILER_EMAIL,
    to: env.NODEMAILER_EMAIL,
    subject: `Message from お問い合わせ(${email})`,
    text: `氏名: ${name}`,
    html: `
    <p>氏名: ${name}</p>
    <p>タイトル: ${title}</p>
    <p>内容　------------</p>
    <div>${body}</div>`
  }
  try {
    await transport.sendMail(mailOptions);
    return NextResponse.json({ message: "Success", status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed", status: 500 });
  }
}
