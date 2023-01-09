import styles from './Footer.module.css';
import cn from 'classnames';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface FooterProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const Footer = ({ className, ...props }: FooterProps): JSX.Element => {
    return (
        <footer
            {...props}
            className={cn(className, styles.footer)}>
            <div>OwlTop © 2020 - 2021 Все права защищены</div>
            <a
                href='#'
                target='blank'>
                Пользовательское соглашение
            </a>
            <a
                href='#'
                target='blank'>
                Политика конфиденциальности
            </a>
        </footer>
    );
};
