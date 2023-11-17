import { ReactNode } from "react";
import type { Metadata } from 'next'
import BaseHeader from "../components/BaseHeader";
import BaseFooter from "../components/BaseFooter";
import BackgroundRender from "../components/BackgroundRender";
import "../styles/style.sass";

export const metadata: Metadata = {
  title: 'next-field',
  description: 'next-field for Next.js',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="ja">
      <body>
        <div className="wrapper">
          <BaseHeader />
          {children}
          <BaseFooter title="&copy; visualizer" />
        </div>
        <BackgroundRender />
      </body>
    </html>
  )
}

