import Document, { Html, Head, Main, NextScript, DocumentContext, DocumentInitialProps } from 'next/document';

export default class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render(): JSX.Element {
        return (
            <Html lang='ru'>
                <Head>
                    <link
                        rel='icon'
                        href='/favicon.ico'
                    />
                    <link
                        rel='preconnect'
                        href='https://fonts.gstatic.com'
                    />
                    <link
                        rel='preconnect'
                        href='https://mc.yandex.ru'
                    />
                    <link
                        rel='stylesheet'
                        href='https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;500;700&display=swap'
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
