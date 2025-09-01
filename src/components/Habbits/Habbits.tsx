import { Link } from 'react-router-dom'
import styles from './Habbits.module.scss'
import Habbit from './Habbit/Habbit'
import { HabbitsData } from '../data/MockData'

const Habbits = () => {
    return(
        <section className={styles.container}>
        <header className={styles.header}>
            <p className={styles.header__title}>My Habits</p>
            <Link to="/" className={styles.header__button}>
            <p className={styles.headerButtonText}>Add Habit</p>
            </Link>
        </header>

        <div className={styles.grid}>
            {HabbitsData.map((habbit, index) => (
            <div key={index} className={styles.card}>
                <Habbit goal={habbit.goal} progress={habbit.progress} title={habbit.title}/>
            </div>
            ))}
        </div>
        </section>
    )
}

export default Habbits