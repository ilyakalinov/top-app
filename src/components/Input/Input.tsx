import cn from 'classnames';
import React, { ForwardedRef, forwardRef } from 'react';
import Error from '@/components/Error';
import styles from './Input.module.css';
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';

export interface InputProps extends DetailedHTMLProps<HTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    error?: FieldError;
}

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
