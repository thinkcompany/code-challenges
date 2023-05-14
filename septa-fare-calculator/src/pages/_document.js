import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  //  This is where we would have to setup styled-components so that we can render the styles and themes
  // via context to avoid performance issues
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
