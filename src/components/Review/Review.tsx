import styles from './Review.module.css';
import cn from 'classnames';
import UserIcon from './UserIcon.svg';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Rating } from '@/components/Rating/Rating';
import { forwardRef, ForwardedRef } from 'react';
import { motion } from 'framer-motion';
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { ReviewModel } from '@/interfaces/product.interface';

export interface ReviewProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    review: ReviewModel;
}

export const Review = motion(
    forwardRef(({ review, className, ...props }: ReviewProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
        const { name, title, description, createdAt, rating } = review;

        return (
            <div
                className={cn(styles.review, className)}
                ref={ref}
                {...props}>
                <div className={styles.reviewTop}>
                    <UserIcon className={styles.userIcon} />
                    <div>
                        <span className={styles.name}>{name}: </span>
                        <span className={styles.title}>{title}</span>
                    </div>
                    <div className={styles.date}>{format(new Date(createdAt), 'dd MMMM yyyy', { locale: ru })}</div>
                    <div className={styles.rating}>
                        <Rating
                            isEditable={false}
                            rating={rating}
                        />
                    </div>
                </div>
                <div className={styles.description}>{description}</div>
            </div>
        );
    })
);
