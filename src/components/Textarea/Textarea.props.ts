import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import { FieldError } from 'react-hook-form';

export interface TextareaProps extends DetailedHTMLProps<HTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
    value?: string;
    placeholder?: string;
    error?: FieldError;
}
