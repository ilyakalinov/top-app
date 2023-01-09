import cn from 'classnames';
import styles from './Sort.module.css';
import { SortEnum, SortProps } from './Sort.props';
import SortIcon from './SortIcon.svg';

export const Sort = ({ sort, setSort, className, ...props }: SortProps): JSX.Element => {
    return (
        <div
            className={cn(className, styles.sort)}
            {...props}>
            <button
                tabIndex={0}
                onClick={() => setSort(SortEnum.Rating)}
                //@ts-ignore
                onKeyDown={(key: KeyboardEvent) => {
                    () => console.log('sdsa');
                }}
                className={cn(styles.sortBtn, { [styles.active]: sort == SortEnum.Rating })}>
                <SortIcon className={styles.sortIcon} />
                По&nbsp;рейтингу
            </button>
            <button
                tabIndex={0}
                onClick={() => setSort(SortEnum.Price)}
                //@ts-ignore
                onKeyDown={(key: KeyboardEvent) => {
                    () => setSort(SortEnum.Rating);
                }}
                className={cn(styles.sortBtn, { [styles.active]: sort == SortEnum.Price })}>
                <SortIcon className={styles.sortIcon} />
                По&nbsp;цене
            </button>
        </div>
    );
};
