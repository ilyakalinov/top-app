import styles from './Menu.module.css';
import cn from 'classnames';
import { useContext } from 'react';
import { AppContext } from '@/context/app.context';
import { FirstLevelMenuItem, PageItem } from '@/interfaces/menu.interface';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { firstLevelMenu } from '@/helpers/helpers';
import { motion } from 'framer-motion';

export const Menu = (): JSX.Element => {
    const { menu, setMenu, firstCategory } = useContext(AppContext);
    const router = useRouter();

    const variants = {
        visible: {
            marginBottom: 20,
            transititon: {
                when: 'beforeChildren',
                staggerChildren: 0.1,
            },
        },
        hidden: { marginBottom: 0 },
    };

    const variantsChildren = {
        visible: {
            opacity: 1,
            height: 'auto',
        },
        hidden: { opacity: 0, height: 0 },
    };

    const openSecondLavel = (secondCategory: string) => {
        setMenu &&
            setMenu(
                menu.map((m) => {
                    if (m._id.secondCategory == secondCategory) m.isOpened = !m.isOpened;
                    return m;
                })
            );
    };

    const openSecondLavelKey = (key: KeyboardEvent, secondCategory: string) => {
        if (key.code === 'Space' || key.code === 'Enter') {
            key.preventDefault();
            openSecondLavel(secondCategory);
        }
    };

    const buildFirsLevelMenu = () => {
        return (
            <>
                {firstLevelMenu.map((m) => (
                    <div key={m.route}>
                        <Link href={`/${m.route}`}>
                            <motion.div
                                layout
                                className={cn(styles.firstLevel, {
                                    [styles.firstLevelActive]: m.id === firstCategory,
                                })}>
                                {m.icon}
                                <span>{m.name}</span>
                            </motion.div>
                        </Link>
                        {router.asPath.includes(m.route) && buildSecondLevelMenu(m)}
                    </div>
                ))}
            </>
        );
    };

    const buildSecondLevelMenu = (menuProps: FirstLevelMenuItem) => {
        return (
            <div className={styles.secondBlock}>
                {menu?.map((menuItem) => {
                    if (menuItem.pages.some((p) => p.alias.includes(router.asPath.split('/')[2]))) menuItem.isOpened = true;
                    return (
                        <div key={menuItem._id.secondCategory}>
                            <div
                                tabIndex={0}
                                //@ts-ignore
                                onKeyDown={(key: KeyboardEvent) => {
                                    openSecondLavelKey(key, menuItem._id.secondCategory);
                                }}
                                className={styles.secondLevel}
                                onClick={() => openSecondLavel(menuItem._id.secondCategory)}>
                                {menuItem._id.secondCategory}
                            </div>
                            <motion.div
                                layout
                                variants={variants}
                                initial={menuItem.isOpened ? 'visible' : 'hidden'}
                                animate={menuItem.isOpened ? 'visible' : 'hidden'}
                                className={cn(styles.secondLevelBlock)}>
                                {buildThirdLevelMenu(menuItem.pages, menuProps.route, menuItem.isOpened || false)}
                            </motion.div>
                        </div>
                    );
                })}
            </div>
        );
    };

    const buildThirdLevelMenu = (pages: PageItem[], route: string, isOpened: boolean) => {
        return pages.map((page) => (
            <motion.div
                variants={variantsChildren}
                key={page._id}>
                <Link
                    tabIndex={isOpened ? 0 : -1}
                    href={`/${route}/${page.alias}`}>
                    <span
                        className={cn(styles.thirdLevel, {
                            [styles.thirdLevelActive]: `/${route}/${page.alias}` == router.asPath,
                        })}>
                        {page.category}
                    </span>
                </Link>
            </motion.div>
        ));
    };

    return <div className={styles.menu}>{buildFirsLevelMenu()}</div>;
};
