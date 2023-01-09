import cn from 'classnames';
import Input from '@/components/Input';
import styles from './Search.module.css';
import { useState } from 'react';
import Button from '@/components/Button';
import VectorIcon from './VectorIcon.svg';
import { useRouter } from 'next/router';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface SearchProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const Search = ({ className, ...props }: SearchProps): JSX.Element => {
    const [search, setSearch] = useState<string>('');

    const router = useRouter();

    const startSearch = () => {
        router.push({
            pathname: '/search',
            query: {
                q: search,
            },
        });
    };

    const starSearchByKeyDown = (e: KeyboardEvent) => e.key == 'Enter' && startSearch();

    return (
        <div
            className={cn(className, styles.search)}
            {...props}>
            <Input
                placeholder='Поиск...'
                value={search}
                className={cn(className, styles.input)}
                onChange={(e) => setSearch((e.target as HTMLInputElement).value)}
                //@ts-ignore
                onKeyDown={starSearchByKeyDown}
            />
            <Button
                apperance='primary'
                className={styles.button}
                onClick={() => {
                    startSearch();
                }}>
                <VectorIcon />
            </Button>
        </div>
    );
};
