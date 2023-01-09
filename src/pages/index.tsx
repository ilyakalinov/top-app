import { GetStaticProps } from 'next';
import { useState } from 'react';
import Button from '@/components/Button';
import Htag from '@/components/Htag';
import Paragraph from '@/components/Paragraph';
import Rating from '@/components/Rating';
import Tag from '@/components/Tag';
import { withLayout } from '@/layout/Layout';
import axios from 'axios';
import { MenuItem } from '@/interfaces/menu.interface';
import { TopLavelCategory } from '@/interfaces/page.interface';
import Input from '@/components/Input';
import { API } from '@/helpers/api';

export function Home({ menu, firstCategory }: HomeProps) {
    const [counter, setCounter] = useState<number>(0);

    const [rating, setRating] = useState<number>(4);

    return (
        <div>
            <Htag tag='h1'>{counter}</Htag>
            <Button
                onClick={() => setCounter((x) => x - 1)}
                apperance='primary'
                arrow='right'>
                Кнопка
            </Button>
            <Button
                onClick={() => setCounter((x) => x + 1)}
                apperance='ghost'
                arrow='right'>
                Кнопка
            </Button>
            <Paragraph size='l'>Большой</Paragraph>
            <Paragraph size='m'>Средний</Paragraph>
            <Paragraph size='s'>Маленький</Paragraph>
            <Tag
                color='green'
                size='m'
                href='https://www.figma.com/file/eHIyKZXUUtMf1BQiuv6tTA/%D0%9A%D1%83%D1%80%D1%81-2---NextJS?node-id=1%3A2&t=3ZLcmUg4f11KA18P-0'>
                Зеленый
            </Tag>
            <Tag
                color='ghost'
                size='s'>
                Гоуст
            </Tag>
            <Tag
                color='red'
                size='s'>
                Красный
            </Tag>
            <Tag
                color='primary'
                size='s'>
                Primary
            </Tag>
            <Rating
                rating={rating}
                isEditable
                setRating={setRating}
            />
            <Input placeholder='Текст отзыва' />
        </div>
    );
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
    const firstCategory = 0;
    const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
        firstCategory,
    });
    return {
        props: {
            menu,
            firstCategory,
        },
    };
};

interface HomeProps extends Record<string, unknown> {
    menu: MenuItem[];
    firstCategory: TopLavelCategory;
}
