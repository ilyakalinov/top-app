import { GetStaticProps } from 'next';
import { withLayout } from '@/layout/Layout';
import axios from 'axios';
import { MenuItem } from '@/interfaces/menu.interface';
import { API } from '@/helpers/api';
import Head from 'next/head';
import Paragraph from '@/components/Paragraph';

interface SearchProps extends Record<string, unknown> {}

export function Search({ menu, firstCategory }: SearchProps) {
    return (
        <>
            <Head>
                <title>Результаты поиска</title>
                <meta
                    name='description'
                    content='Результаты поиска'
                />
            </Head>
            <Paragraph size='l'>Результаты поиска:</Paragraph>
            <div>Пока пусто</div>
        </>
    );
}

//получаем массив меню
export const getStaticProps: GetStaticProps<SearchProps> = async () => {
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

export default withLayout(Search);
