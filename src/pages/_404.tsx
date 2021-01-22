import * as React from "react";
import { NextPageContext } from "next";
import Head from "next/head";

type Props = {
  title: string;
  errorCode: number;
};

class Error extends React.Component<Props> {
  static async getInitialProps({ res }: NextPageContext): Promise<Props> {
    return {
      title: `Error ${res!.statusCode}`,
      errorCode: res!.statusCode,
    };
  }

  render(): JSX.Element {
    return (
      <div>
        <Head>
          <title>{this.props.title}</title>
        </Head>
        {this.props.errorCode}
      </div>
    );
  }
}

export default Error;
