import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import axios from 'axios';
import { withLayout } from '@/layout/Layout';
import { ParsedUrlQuery } from 'querystring';
import { MenuItem } from '@/interfaces/menu.interface';
import { TopLavelCategory, TopPageModel } from '@/interfaces/page.interface';
import { ProductModel } from '@/interfaces/product.interface';
import { firstLevelMenu } from '@/helpers/helpers';
import { TopPageComponent } from '@/page-components/TopPageComponent/TopPageComponent';
import { API } from '@/helpers/api';
import Head from 'next/head';

interface TopPageProps extends Record<string, unknown> {
    menu: MenuItem[];
    firstCategory: TopLavelCategory;
    page: TopPageModel;
    products: ProductModel[];
}

export function TopPage({ firstCategory, page, products }: TopPageProps) {
    return (
        <>
            {page && products && (
                <>
                    <Head>
                        <title>{page.metaTitle}</title>
                        <meta
                            name='description'
                            content={page.metaDescription}
                        />
                    </Head>
                    <TopPageComponent
                        firstCategory={firstCategory}
                        page={page}
                        products={products}
                    />
                </>
            )}
        </>
    );
}

//устанавливаем пути
export const getStaticPaths: GetStaticPaths = async () => {
    let paths: string[] = [];

    for (const m of firstLevelMenu) {
        const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
            firstCategory: m.id,
        });
        paths = paths.concat(menu.flatMap((s) => s.pages.map((p) => `/${m.route}/${p.alias}`)));
    }

    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps<TopPageProps> = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {
    //404 если не получили параметры
    if (!params) return { notFound: true };

    const firstCategoryItem = firstLevelMenu.find((m) => m.route == params.type);

    //404 если не нашли совпадений в пути и роуте айтемов меню(при неверном адресе)
    if (!firstCategoryItem) return { notFound: true };

    try {
        //получаем массив меню
        const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
            firstCategory: firstCategoryItem.id,
        });

        //404 если не получили массив меню
        if (menu.length === 0) return { notFound: true };

        //получаем страницу с учетом params.alias
        const { data: page } = await axios.get<TopPageModel>(API.topPage.byAlias + params.alias);

        //получаем все продукт с учетом page.category
        const { data: products } = await axios.post<ProductModel[]>(API.product.find, {
            category: page.category,
            limit: 10,
        });

        return {
            props: {
                menu,
                firstCategory: firstCategoryItem.id,
                page,
                products,
            },
        };
    } catch {
        //404 если не получили массив меню
        return { notFound: true };
    }
};

export default withLayout(TopPage);
