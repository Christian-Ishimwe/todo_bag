import { Html, Head, Main, NextScript } from "next/document";
import { Theme } from '@radix-ui/themes';

export default function Document() {
  return (
    <Html lang="en">
      <Head
        title="Christian Todo"
      />
      <body className="bg-slate-950">
        <Theme  panelBackground="solid" >
          <Main />
          <NextScript />

        </Theme>
      </body>
    </Html>
  );
}
