import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <title>ZipCo AU Merchants</title>
        <link
          rel='shortcut icon'
          type='image/png'
          href='https://assets.zip.co/static-assets/favicon-6b39856d70bb5ac2f3a0-1.png'
        ></link>
        <meta property='og:title' content='ZipCo AU Merchants' key='title' />
        <meta
          name='description'
          content='ZipCo Australian Merchants'
          key='desc'
        />
        <meta
          property='og:description'
          content='ZipCo Australian Merchants that you can enjoy cashback and discount'
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
