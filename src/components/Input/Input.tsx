import cn from 'classnames';
import React, { ForwardedRef, forwardRef } from 'react';
import Error from '@/components/Error';
import styles from './Input.module.css';
import { InputProps } from './Input.props';

export const Input = forwardRef(
    ({ error, className, ...props }: InputProps, ref: ForwardedRef<HTMLInputElement>): JSX.Element => {
        return (
            <div>
                <input
                    className={cn(className, styles.input, {
                        [styles.error]: error,
                    })}
                    ref={ref}
                    {...props}
                />
                {error?.message && <Error message={error?.message} />}
            </div>
        );
    }
);
