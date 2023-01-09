import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import { FieldError } from 'react-hook-form';

export interface RatingProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    isEditable?: boolean;
    rating: number;
    setRating?: (rating: number) => void;
    error?: FieldError;
}
