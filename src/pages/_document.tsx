import Document, { Html, Head, Main, NextScript } from "next/document";
import BaseHeader from "../components/BaseHeader";
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
  url = "http://example.com";
  title = "Demo";
  description = "Demo of Next.js";

  componentDidMount(){
  }
  
  componentDidUpdate(){
  }

  render(): JSX.Element {
    return (
      <Html lang="ja">
        <Head>
          <meta name="description" content={this.description} />
          <meta name="og:title" content={this.title} />
          <meta name="og:url" content={this.url} />
        </Head>
        <BaseHeader title="re" />
        <Main />
        <NextScript />
        <BaseFooter title="&copy; visualizer" />
      </Html>
    );
  }
}

export default CustomDocument;
