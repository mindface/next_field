import BaseNavi from "../components/BaseNavi";
import BackgroundRender from "../components/BackgroundRender";
import "../styles/style.sass";

export const metadata = {
  url: "https://next-field.vercel.app",
  title: "next-field",
  description: "next-field for Next.js",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>
        <BackgroundRender />
        {children}
        <BaseNavi />
      </body>
    </html>
  )
}
