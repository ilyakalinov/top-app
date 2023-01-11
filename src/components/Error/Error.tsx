import styles from './Error.module.css';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ErrorProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    message: string;
}

export const Error = ({ message }: ErrorProps): JSX.Element => {
    return <div className={styles.error}>{message}</div>;
};
