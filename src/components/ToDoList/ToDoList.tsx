import styles from './ToDoList.module.scss'
import Tasks from '../data/MockData'


const ToDoList = () => {
    return(
        <div className={styles.container}>
            <div>
                <p>Задачи</p>
            </div>
        </div>
    )
}

export default ToDoList