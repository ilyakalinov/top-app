import styles from './Error.module.css';
import { ErrorProps } from './Error.props';

export const Error = ({ message }: ErrorProps): JSX.Element => {
    return <div className={styles.error}>{message}</div>;
};
