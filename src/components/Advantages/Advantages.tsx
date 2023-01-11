import styles from './Advantages.module.css';
import ChackIcon from './ChackIcon.svg';
import { TopPageAdvantage } from '@/interfaces/page.interface';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface AdvantagesProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    advantages: TopPageAdvantage[];
}

export const Advantages = ({ advantages }: AdvantagesProps): JSX.Element => {
    return (
        <>
            {advantages.map((a) => (
                <div
                    key={a._id}
                    className={styles.advantage}>
                    <ChackIcon />
                    <div className={styles.title}>{a.title}</div>
                    <hr className={styles.vline} />
                    <div>{a.description}</div>
                </div>
            ))}
        </>
    );
};
