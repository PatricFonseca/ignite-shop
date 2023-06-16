import { Html, Head, Main, NextScript } from 'next/document'
import { getCssText } from '@/styles' 

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <style id='stiches' dangerouslySetInnerHTML={{__html: getCssText()}}/>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
