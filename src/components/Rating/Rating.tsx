import { RatingProps } from './Rating.props';
import styles from './Rating.module.css';
import StarIcon from './StarIcon.svg';
import cn from 'classnames';
import { ForwardedRef, forwardRef, KeyboardEvent, useEffect, useState } from 'react';
import Error from '@/components/Error';

export const Rating = forwardRef(
    (
        { children, isEditable = true, rating, setRating, error, ...props }: RatingProps,
        ref: ForwardedRef<HTMLDivElement>
    ): JSX.Element => {
        const [ratingArray, setRetingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));

        useEffect(() => {
            constructReting(rating);
            // eslint-disable-next-line
        }, [rating]);

        const constructReting = (currentRating: number) => {
            const updatedArray = ratingArray.map((e: JSX.Element, i: number) => (
                <span
                    key={i}
                    className={cn(styles.star, {
                        [styles.filled]: i < currentRating,
                        [styles.editable]: isEditable,
                    })}
                    onMouseEnter={() => changeDisplay(i + 1)}
                    onMouseLeave={() => changeDisplay(rating)}
                    onClick={() => onClick(i + 1)}>
                    {/* todo разобраться с изменением рейтинга */}
                    <StarIcon
                        tabIndex={isEditable ? 0 : 1}
                        onKeyDown={(e: KeyboardEvent<SVGAElement>) => isEditable && handleSpace(i + 1, e)}
                    />
                </span>
            ));

            setRetingArray(updatedArray);
        };

        const changeDisplay = (i: number) => (isEditable ? constructReting(i) : null);

        const onClick = (i: number) => (!isEditable || !setRating ? null : setRating(i));

        const handleSpace = (i = 0, e: KeyboardEvent<SVGElement>) => (e.code != 'Space' || !setRating ? null : setRating(i));

        return (
            <div
                ref={ref}
                className={cn({
                    [styles.error]: error,
                })}
                {...props}>
                {ratingArray.map((e, i) => (
                    <span key={i}>{e}</span>
                ))}
                {error?.message && <Error message={error?.message} />}
            </div>
        );
    }
);
