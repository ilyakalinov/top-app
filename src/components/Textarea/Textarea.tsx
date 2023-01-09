import styles from './Textarea.module.css';
import cn from 'classnames';
import { TextareaProps } from './Textarea.props';
import { ForwardedRef, forwardRef } from 'react';
import Error from '@/components/Error';

export const Textarea = forwardRef(
    (
        { value, placeholder = '', error, className, ...props }: TextareaProps,
        ref: ForwardedRef<HTMLTextAreaElement>
    ): JSX.Element => {
        return (
            <div className={cn(styles.textareaWrapper, className)}>
                <textarea
                    className={cn(styles.textarea, {
                        [styles.error]: error,
                    })}
                    value={value}
                    placeholder={placeholder}
                    ref={ref}
                    {...props}
                />
                {error?.message && <Error message={error.message} />}
            </div>
        );
    }
);
