import  styles  from './Header.module.scss'

const Header = () => {
    return(
        <div className={styles.container}>
            <button className={styles.headerButton}>
                <p className={styles.headerText}>Главная</p>
            </button>
            <button className={styles.headerButton}>
                <p className={styles.headerText}>Продукты</p>
            </button>
            <button className={styles.headerButton}>
                <p className={styles.headerText}>Прогресс</p>
            </button>
        </div>
    )
}

export default Header