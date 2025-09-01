import styles from './Task.module.scss'
import { useState } from 'react'

type TaskProps = {
    title: string,
    description: string,
    taskType: string,
    addTasks: { id: number; name: string }[],
    onDoneTask: () => void,
    onSkipTask: () => void,
    countAddTasks: (delta: number) => void,
    disabled: boolean
}

const Task = ({ title, description, addTasks, onDoneTask, onSkipTask, countAddTasks, taskType, disabled }: TaskProps) => {
    const [checkedTasks, setCheckedTasks] = useState<{ [key: number]: boolean }>({})

    const handleCheckboxChange = (id: number, checked: boolean) => {
    setCheckedTasks((prevState) => ({
        ...prevState,
        [id]: checked,
    }))

    countAddTasks(checked ? 1 : -1)
    }

    return (
        <div className={styles.container}>
            <h5 className={styles.cardTitle}>{title}</h5>
            <div>
                <p className={styles.taskType}>{taskType}</p>
            </div>
            <div className={styles.cardBody}>
                <p className={styles.cardText}>{description}</p>
                <div className={styles.addTaskCard}>
                    <ul className={styles.addTaskListGroup}>
                        {addTasks.map((addTask) => (
                            <li className={styles.addTaskListGroupItem} key={addTask.id}>
                                <input
                                    type="checkbox"
                                    id={String(addTask.id)}
                                    checked={checkedTasks[addTask.id] || false}
                                    onChange={(e) => handleCheckboxChange(addTask.id, e.target.checked)}
                                />
                                <label htmlFor={String(addTask.id)}>{addTask.name}</label>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className={styles.btnGroup}>
                <button
                    className={styles.btn + ' ' + styles.happy}
                    onClick={onDoneTask}
                    disabled={disabled}
                >
                    Congrats
                </button>
                <button
                    className={styles.btn + ' ' + styles.sad}
                    onClick={onSkipTask}
                    disabled={disabled}
                >
                    Sad
                </button>
            </div>
        </div>
    )
}

export default Task