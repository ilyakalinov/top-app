import { API } from '@/helpers/api';
import { firstLevelMenu } from '@/helpers/helpers';
import { MenuItem } from '@/interfaces/menu.interface';
import { withLayout } from '@/layout/Layout';
import axios from 'axios';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import Head from 'next/head';
import { ParsedUrlQuery } from 'querystring';

interface SearchProps extends Record<string, unknown> {}

export function Type({ menu, firstCategory }: SearchProps) {
    return (
        <>
            <Head>
                <title>{firstLevelMenu[firstCategory ? Number(firstCategory) : 0].name}</title>
                <meta
                    name='description'
                    content={`${firstCategory}`}
                />
            </Head>
            {firstLevelMenu[firstCategory ? Number(firstCategory) : 0].name}
        </>
    );
}

//устанавливаем пути
export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: firstLevelMenu.map((m) => '/' + m.route),
        fallback: false,
    };
};

//получаем массив меню
export const getStaticProps: GetStaticProps<SearchProps> = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {
    //404 если не получили параметры
    if (!params) return { notFound: true };

    const firstCategoryItem = firstLevelMenu.find((m) => m.route == params.type);

    //404 если не нашли совпадений в пути и роуте айтемов меню(при неверном адресе)
    if (!firstCategoryItem) return { notFound: true };

    const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
        firstCategory: firstCategoryItem.id,
    });

    return {
        props: {
            menu,
            firstCategory: firstCategoryItem.id,
        },
    };
};

export default withLayout(Type);
