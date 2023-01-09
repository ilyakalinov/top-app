import styles from './Divider.module.css';
import cn from 'classnames';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface DividerProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const Divider = ({ className, ...props }: DividerProps): JSX.Element => {
    return <hr className={cn(className, styles.divider)} />;
};
