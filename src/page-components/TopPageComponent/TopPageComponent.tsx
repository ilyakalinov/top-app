import styles from './TopPageComponent.module.css';
import { TopPageComponentProps } from './TopPageComponent.props';
import Htag from '@/components/Htag';
import Tag from '@/components/Tag';
import HhData from '@/components/HhData';
import { TopLavelCategory } from '@/interfaces/page.interface';
import Advantages from '@/components/Advantages';
import Product from '@/components/Product';
import { useReducer, useEffect } from 'react';
import { sortReduser } from './sort.reduser';
import { SortEnum } from '@/components/Sort/Sort.props';
import Sort from '@/components/Sort';

export const TopPageComponent = ({ products, page, firstCategory }: TopPageComponentProps): JSX.Element => {
    const [{ products: sortedProducts, sort }, dispatchSort] = useReducer(sortReduser, { products, sort: SortEnum.Rating });

    const setSort = (sort: SortEnum) => {
        dispatchSort({ type: sort });
    };

    useEffect(() => {
        dispatchSort({ type: 'reset', initialResetState: products });
    }, [products]);

    return (
        <div>
            <div className={styles.title}>
                <Htag tag='h1'>{page.title}</Htag>
                {products && (
                    <Tag
                        color='gray'
                        size='m'>
                        {products.length}
                    </Tag>
                )}
                <Sort
                    sort={sort}
                    setSort={setSort}
                />
            </div>
            <div>
                {sortedProducts &&
                    sortedProducts.map((p) => (
                        <Product
                            layout
                            product={p}
                            key={p._id}
                        />
                    ))}
            </div>
            {/* Заголовок 
                    вакансии */}
            <div className={styles.hhTitle}>
                <Htag tag='h2'>Вакансия - {page.category}</Htag>
                <Tag
                    color='red'
                    size='m'>
                    hh.ru
                </Tag>
            </div>
            {/* Карчтоки 
                    вакансии */}
            {firstCategory == TopLavelCategory.Courses && <HhData {...page.hh} />}
            {/* Списко 
                    преимушеств 
                        вакансии */}
            {page.advantages && page.advantages.length > 0 && (
                <>
                    <Htag tag='h2'>Преимущество</Htag>
                    <Advantages advantages={page.advantages} />
                </>
            )}
            {/* Описание 
                    вакансии */}
            {page.seoText && (
                <div
                    className={styles.seo}
                    dangerouslySetInnerHTML={{ __html: page.seoText }}
                />
            )}
            {/* Получаемые 
                    навыки */}
            <Htag tag='h2'>Получаемые навыки</Htag>
            {page.tags.map((t) => (
                <Tag
                    color='primary'
                    key={t}>
                    {t}
                </Tag>
            ))}
        </div>
    );
};
