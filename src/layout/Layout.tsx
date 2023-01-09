import styles from './Layout.module.css';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FunctionComponent, useRef } from 'react';
import { AppContextProvider, IAppContext } from '@/context/app.context';
import UpController from '@/components/UpController';
import { useState } from 'react';
import cn from 'classnames';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface LayoutProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const Layout = ({ children }: LayoutProps): JSX.Element => {
    const [isActiveLink, setActiveLink] = useState<boolean>(false);

    const bodyRef = useRef<HTMLDivElement>(null);

    const skipToLink = (key: KeyboardEvent) => {
        if (key.code === 'Space' || key.code === 'Enter') {
            key.preventDefault();
            bodyRef.current?.focus();
        }
        setActiveLink(false);
    };
    return (
        <div className={styles.wrapper}>
            {/* Ссылка для перехода сразу к контенту 
                    страницы при навигации с клавиатуры */}
            <a
                onFocus={() => setActiveLink(true)}
                tabIndex={1}
                className={cn(styles.toLink, {
                    [styles.activeLink]: isActiveLink,
                })}
                //@ts-ignore
                onKeyDown={(key: KeyboardEvent) => {
                    skipToLink(key);
                }}>
                Сразу к содержанию
            </a>
            <Header className={styles.header} />
            <Sidebar className={styles.sidebar} />
            {/* Содержимое 
                    layout */}
            <div
                className={styles.body}
                ref={bodyRef}
                tabIndex={0}>
                {children}
            </div>
            <Footer className={styles.footer} />
            <UpController />
        </div>
    );
};

export const withLayout = <T extends Record<string, unknown> & IAppContext>(Component: FunctionComponent<T>) => {
    return function withLayoutComponent(props: T): JSX.Element {
        return (
            <AppContextProvider
                menu={props.menu}
                firstCategory={props.firstCategory}>
                <Layout>
                    <Component {...props} />
                </Layout>
            </AppContextProvider>
        );
    };
};
