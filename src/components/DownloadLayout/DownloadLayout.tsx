import { Router, useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import styles from './DownloadLayout.module.css';
import Spinner from './Spinner.svg';
import cn from 'classnames';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface DownloadLayoutProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const DownloadLayout = ({ className, ...props }: DownloadLayoutProps): JSX.Element => {
    const { isReady } = useRouter();

    const [download, setDownload] = useState<boolean>(true);

    useEffect(() => {
        setDownloadMode(!isReady);
    }, [isReady]);

    Router.events.on('routeChangeStart', () => setDownloadMode(true));
    Router.events.on('routeChangeComplete', () => setDownloadMode(false));
    Router.events.on('routeChangeError', () => setDownloadMode(false));

    const setDownloadMode = (download: boolean) => {
        setDownload(download);
        document.body.style.overflow = download ? 'hidden' : 'auto';
    };

    return (
        <div
            className={cn(styles.downloadLayout, className, {
                [styles.active]: download,
            })}
            {...props}>
            <Spinner className={styles.spinner} />
        </div>
    );
};
