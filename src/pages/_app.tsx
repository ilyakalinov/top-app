import '@/styles/globals.css';
import Head from 'next/head';
import Router from 'next/router';
import { AppProps } from 'next/app';
import ym, { YMInitializer } from 'react-yandex-metrika';
import DownloadLayout from '@/components/DownloadLayout';

export default function App({ Component, pageProps }: AppProps) {
    Router.events.on('routeChangeComplete', (url: string) => {
        if (typeof window !== 'undefined') {
            ym('hit', url);
        }
    });
    return (
        <>
            <Head>
                <title>TopCourses</title>
            </Head>
            <YMInitializer
                accounts={[]}
                options={{ webvisor: true, defer: true }}
                version='2'
            />
            <DownloadLayout />
            <Component {...pageProps} />
        </>
    );
}
