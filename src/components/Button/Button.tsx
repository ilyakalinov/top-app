import { ButtonProps } from './Button.props';
import styles from './Button.module.css';
import ArrowIcon from './Arrow.svg';
import cn from 'classnames';

export const Button = ({ children, apperance, arrow = 'none', className, ...props }: ButtonProps): JSX.Element => {
    return (
        <button
            className={cn(styles.button, className, {
                [styles.primary]: apperance == 'primary',
                [styles.ghost]: apperance == 'ghost',
            })}
            {...props}>
            {children}
            {arrow !== 'none' && (
                <span
                    className={cn(styles.arrow, {
                        [styles.arrow_down]: arrow == 'down',
                        [styles.arrow_right]: arrow == 'right',
                    })}>
                    <ArrowIcon />
                </span>
            )}
        </button>
    );
};
