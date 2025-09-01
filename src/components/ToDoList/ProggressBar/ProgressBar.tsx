import { useLayoutEffect, useRef } from 'react';
import styles from './ProgressBar.module.scss';

type ProgressBarProps = {
    value: number
    tasksLength: number
};

const ProgressBar = ({ value, tasksLength }: ProgressBarProps) => {
    const progressRef = useRef<HTMLDivElement>(null)
    const percentage = (value / tasksLength) * 100

    useLayoutEffect(() => {
        if (progressRef.current) {
            progressRef.current.style.width = `${percentage}%`
        }
    }, [percentage]);

    return (
        <div className={styles.progressBarContainer}>
            <div
                className={styles.progressBarFill}
                style={{ width: 0 }}
                ref={progressRef}
            ></div>
        </div>
    )
}

export default ProgressBar