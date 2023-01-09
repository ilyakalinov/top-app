import Card from '@/components/Card';
import styles from './HhData.module.css';
import Star from './StarIcon.svg';
import { priceRu } from '@/helpers/helpers';
import { IHhData } from '@/interfaces/page.interface';

export interface HhDataProps extends IHhData {}

const card = (salaryValye: number, level: string, rate: number) => {
    return (
        <div>
            <div className={styles.title}>{level}</div>
            <div className={styles.salaryValye}>{priceRu(salaryValye)}</div>
            <div className={styles.rate}>
                <Star className={rate >= 1 ? styles.filled : null} />
                <Star className={rate >= 2 ? styles.filled : null} />
                <Star className={rate >= 3 ? styles.filled : null} />
            </div>
        </div>
    );
};

export const HhData = ({ count, juniorSalary, middleSalary, seniorSalary }: HhDataProps): JSX.Element => {
    return (
        <div className={styles.hh}>
            <Card className={styles.count}>
                <div className={styles.title}>Всего вакансий</div>
                <div className={styles.countValue}>{count}</div>
            </Card>
            <Card className={styles.salary}>
                {card(juniorSalary, 'Начальный', 1)}
                {card(middleSalary, 'Средний', 2)}
                {card(seniorSalary, 'Профессионал', 3)}
            </Card>
        </div>
    );
};
