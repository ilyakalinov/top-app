import styles from './Product.module.css';
import cn from 'classnames';
import { ProductProps } from './Product.props';
import { devOfNum, priceRu } from '@/helpers/helpers';
import Card from '@/components/Card';
import Rating from '@/components/Rating';
import Tag from '@/components/Tag';
import Button from '@/components/Button';
import Divider from '@/components/Divider';
import { useRef, useState, ForwardedRef, forwardRef } from 'react';
import Review from '@/components/Review';
import ReviewForm from '@/components/ReviewForm';
import { motion } from 'framer-motion';

export const Product = motion(
    forwardRef(({ product, className }: ProductProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
        const {
            title,
            image,
            price,
            oldPrice,
            credit,
            reviewAvg,
            initialRating,
            categories,
            reviewCount,
            description,
            characteristics,
            advantages,
            disadvantages,
            reviews,
            _id,
        } = product;

        const [isReviewOpened, setIsReviewOpened] = useState(false);
        const reviewRef = useRef<HTMLDivElement>(null);

        const scrollToReview = () => {
            setIsReviewOpened(true);
            reviewRef.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        };

        return (
            <div
                className={className}
                ref={ref}>
                <Card className={styles.product}>
                    <div className={styles.logoPoduct}>
                        <img
                            src={'https://courses-top.ru' + image}
                            alt={title}
                            width={70}
                            height={70}
                        />
                    </div>
                    <div className={styles.titleProduct}>{title}</div>
                    <div className={styles.priceProduct}>
                        {priceRu(price)}
                        {oldPrice && (
                            <Tag
                                size='s'
                                color='green'
                                className={styles.discoutProduct}>
                                {priceRu(price - oldPrice)}
                            </Tag>
                        )}
                    </div>
                    <div className={styles.creditProduct}>
                        {priceRu(credit)}
                        {<span className={styles.month}>/месяц</span>}
                    </div>
                    <div className={styles.ratingProduct}>
                        <Rating
                            isEditable={false}
                            rating={reviewAvg || initialRating}></Rating>
                    </div>
                    <div className={styles.tagsProduct}>
                        {categories.map((category: any) => (
                            <Tag
                                key={category}
                                color='gray'
                                className={styles.tagProduct}>
                                {category}
                            </Tag>
                        ))}
                    </div>
                    <div className={styles.priceTitle}>цена</div>
                    <div className={styles.creditTitle}>кредит</div>
                    <div className={styles.ratingTitle}>
                        {reviewCount}{' '}
                        <a
                            href='#ref'
                            onClick={() => scrollToReview()}>
                            {devOfNum(reviewCount, ['отзыв', 'отзыва', 'отзывов'])}
                        </a>
                    </div>
                    <Divider className={styles.hr} />
                    <div className={styles.descriptionProduct}>{description}</div>
                    <div className={styles.featuresProduct}>
                        {characteristics.map((c: any) => (
                            <div
                                className={styles.characteristics}
                                key={c.name}>
                                <span className={styles.cName}>{c.name}</span>
                                <span className={styles.cDots}></span>
                                <span className={styles.cValue}>{c.value}</span>
                            </div>
                        ))}
                    </div>
                    <div className={styles.advantagesBlockProduct}>
                        {advantages && (
                            <div className={styles.advantages}>
                                <div className={styles.advantagesTitle}>Преимущества</div>
                                <div>{advantages}</div>
                            </div>
                        )}
                        {disadvantages && (
                            <div className={styles.disadvantages}>
                                <div className={styles.disadvantagesTitle}>Недостатки</div>
                                <div>{disadvantages}</div>
                            </div>
                        )}
                    </div>
                    <Divider className={cn(styles.hr, styles.hr2)} />
                    <div className={styles.actions}>
                        <Button
                            apperance='primary'
                            className={styles.rewiewBtn}>
                            Узнать больше
                        </Button>
                        <Button
                            apperance='ghost'
                            arrow={isReviewOpened ? 'down' : 'right'}
                            onClick={() => {
                                setIsReviewOpened(!isReviewOpened);
                            }}>
                            Читать отзывы
                        </Button>
                    </div>
                </Card>
                <Card
                    color='blue'
                    className={cn(styles.review, {
                        [styles.opened]: isReviewOpened,
                        [styles.closed]: !isReviewOpened,
                    })}
                    ref={reviewRef}>
                    {reviews.map((review) => (
                        <div key={review._id}>
                            <Review review={review} />
                            {!!reviews?.length && <Divider />}
                        </div>
                    ))}
                    <ReviewForm productId={_id} />
                </Card>
            </div>
        );
    })
);
