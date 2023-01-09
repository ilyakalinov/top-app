import Menu from '@/components/Menu';
import Search from '@/components/Search';
import cn from 'classnames';
import MainLogo from './mainLogo.svg';
import styles from './Sidebar.module.css';
import { useRouter } from 'next/router';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface SidebarProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const Sidebar = ({ className, ...props }: SidebarProps): JSX.Element => {
    const router = useRouter();

    const onStart = () => {
        router.push({
            pathname: '/',
        });
    };

    return (
        <div
            className={cn(className, styles.sidebar)}
            {...props}>
            <div>
                <MainLogo
                    className={styles.logo}
                    onClick={onStart}
                />
            </div>
            <Search />
            <Menu {...props} />
        </div>
    );
};
