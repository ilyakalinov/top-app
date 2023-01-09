import { ParagraphProps } from './Paragraph.props';
import styles from './Paragraph.module.css';
import cn from 'classnames';

export const Paragraph = ({ children, size = 's', className, ...props }: ParagraphProps): JSX.Element => {
    return (
        <p
            className={cn(styles.button, className, {
                [styles.small]: size == 's',
                [styles.middle]: size == 'm',
                [styles.large]: size == 'l',
            })}
            {...props}>
            {children}
        </p>
    );
};
