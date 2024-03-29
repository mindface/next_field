import Document, { Html, Head, Main, NextScript } from "next/document";
import BaseFooter from "../components/BaseFooter";

interface CustomDocumentInteface {
  url: string;
  title: string;
  description: string;
}

class CustomDocument extends Document implements CustomDocumentInteface {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }
  url = "https://next-field.vercel.app";
  title = "next-field";
  description = "next-field for Next.js";

  componentDidMount() {}

  componentDidUpdate() {}

  render(): JSX.Element {
    return (
      <Html lang="ja">
        <Head>
          <meta name="description" content={this.description} />
          <meta name="og:title" content={this.title} />
          <meta name="og:url" content={this.url} />
        </Head>
        <Main />
        <NextScript />
        <BaseFooter title="&copy; visualizer" />
      </Html>
    );
  }
}

export default CustomDocument;
