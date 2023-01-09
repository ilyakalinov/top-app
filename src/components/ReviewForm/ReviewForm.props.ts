import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { ReviewModel } from '@/interfaces/product.interface';

export interface ReviewFormProps extends DetailedHTMLProps<HTMLAttributes<HTMLFormElement>, HTMLFormElement> {
    productId: string;
}
