import styles from './UpController.module.css';
import cn from 'classnames';
import UpIcon from './UpIcon.svg';
import { useScrollY } from '@/hooks/useScrollY';
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface UpControllerProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const UpController = ({ className, ...props }: UpControllerProps): JSX.Element => {
    const control = useAnimation();
    const y = useScrollY();

    useEffect(() => {
        control.start({ opacity: y / document.body.scrollHeight });
    }, [y, control]);

    const scrollY = () =>
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });

    return (
        //@ts-ignore
        <motion.div
            className={cn(styles.up, className)}
            onClick={() => scrollY()}
            animate={control}
            initial={{ opacity: 0 }}
            {...props}>
            <UpIcon />
        </motion.div>
    );
};
