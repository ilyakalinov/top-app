import styles from './ReviewForm.module.css';
import { ReviewFormProps } from './ReviewForm.props';
import CloseIcon from './CloseIcon.svg';
import { Rating } from '@/components/Rating/Rating';
import Input from '@/components/Input';
import Textarea from '@/components/Textarea';
import Button from '@/components/Button';
import { Controller, useForm } from 'react-hook-form';
import { IReviewSent, ReviewInterface } from '@/interfaces/reviewFrom.interface';
import React, { useState } from 'react';
import axios from 'axios';
import { API } from '@/helpers/api';
import cn from 'classnames';
import { useEffect } from 'react';

export const ReviewForm = ({ productId, className, ...props }: ReviewFormProps): JSX.Element => {
    const {
        control,
        formState: { errors },
        register,
        handleSubmit,
        reset,
    } = useForm<ReviewInterface>();

    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    const onSubmit = async (formData: ReviewInterface) => {
        try {
            const { data } = await axios.post<IReviewSent>(API.review.createDemo, { ...formData, productId });

            setIsSuccess(data.message ? true : false);
            setError(!data.message ? 'Что-то пошло не так, попробуйте позже' : '');
            data.message && reset();
        } catch (e: any) {
            setError(e.message);
            console.log(e);
        }
        setTimeout(() => setIsSuccess(false), 6000);
        setTimeout(() => setError(''), 6000);
    };

    return (
        <>
            <form
                className={styles.form}
                onSubmit={handleSubmit(onSubmit)}
                {...props}>
                <Input
                    {...register('name', { required: { value: true, message: 'Заполните имя' } })}
                    error={errors.name}
                    className={styles.formName}
                    placeholder='Имя'
                />
                <Input
                    {...register('title', { required: { value: true, message: 'Заполните заголовок отзыва' } })}
                    error={errors.title}
                    className={styles.formTitle}
                    placeholder='Заголовок отзыва'
                />
                <div className={styles.rating}>
                    <span>Оценка: </span>
                    <Controller
                        control={control}
                        name={'rating'}
                        rules={{ required: { value: true, message: 'Укажите оценку' } }}
                        render={({ field }) => (
                            <Rating
                                isEditable
                                rating={field.value}
                                setRating={field.onChange}
                                ref={field.ref}
                                error={errors.rating}
                            />
                        )}
                    />
                </div>
                <Textarea
                    {...register('description', { required: { value: true, message: 'Заполните текст отзыва' } })}
                    error={errors.description}
                    placeholder='Текст отзыва'
                    className={styles.description}
                />
                <div className={styles.submit}>
                    <Button apperance='primary'>Отправить</Button>
                    <span>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
                </div>
            </form>
            <div
                className={cn(styles.success, styles.messageCard, {
                    [styles.active]: isSuccess,
                })}>
                <div className={styles.successTitle}>Ваш отзыв отправлен</div>
                <div>Спасибо, ваш отзыв будет опубликован после проверки </div>
                <CloseIcon
                    className={styles.closeIcon}
                    onClick={() => setIsSuccess(false)}
                />
            </div>
            <div
                className={cn(styles.error, styles.messageCard, {
                    [styles.active]: error,
                })}>
                <div>Что-то пошло не так, попробуйте позже</div>
                <CloseIcon
                    className={styles.closeIcon}
                    onClick={() => setError('')}
                />
            </div>
        </>
    );
};
