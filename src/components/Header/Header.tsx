import { Link, useLocation } from "react-router-dom"
import styles from "./Header.module.scss"

const Header = () => {
    const location = useLocation()

    return (
        <header className={styles.container}>
            <Link to="/" className={`${styles.headerButton} ${location.pathname === "/" ? styles.active : ""}`}>
                <p className={styles.headerText}>Home</p>
            </Link>
            <Link to="/tasks" className={`${styles.headerButton} ${location.pathname === "/tasks" ? styles.active : ""}`}>
                <p className={styles.headerText}>Add task</p>
            </Link>
            {/* <Link to="/progress" className={`${styles.headerButton} ${location.pathname === "/progress" ? styles.active : ""}`}>
                <p className={styles.headerText}>Прогресс</p>
            </Link> */}
            <Link to="/tasks" className={`${styles.headerButton} ${location.pathname === "/habbits" ? styles.active : ""}`}>
                <p className={styles.headerText}>Habbits</p>
            </Link>
            <Link to="/tasks" className={`${styles.headerButton} ${location.pathname === "/stats" ? styles.active : ""}`}>
                <p className={styles.headerText}>Stats</p>
            </Link>
        </header>
    )
}

export default Header