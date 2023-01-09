import styles from './Advantages.module.css';
import { AdvantagesProps } from './Advantages.props';
import ChackIcon from './ChackIcon.svg';

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
