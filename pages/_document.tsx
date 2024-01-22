import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
          <Script
            strategy="afterInteractive"
            type="text/javascript"
            src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}`}
            onError={(e) => console.error("Error", e)}
          />
        </body>
      </Html>
    );
  }
}
