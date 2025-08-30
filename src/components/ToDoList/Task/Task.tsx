import styles from './Task.module.scss'
import { useEffect, useState } from 'react'

type TaskProps = {
    title: string,
    description: string,
    taskType: string,
    addTasks: 
        {
            id: number
            name: string
        }[]
    onDoneTask: () => void
    onSkipTask: () => void
    countAddTasks: (arg: number) => void
}

const Task = ({ title, description, addTasks, onDoneTask, onSkipTask, countAddTasks, taskType}: TaskProps) => {
    const [checkedTasks, setCheckedTasks] = useState<{ [key: number]: boolean }>({})

    const handleCheckboxChange = (id: number) => {
        setCheckedTasks((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }))

    }
    const completedTasksCount = Object.values(checkedTasks).filter(Boolean).length
    
    useEffect(() => {
        countAddTasks(completedTasksCount)
    }, [completedTasksCount, countAddTasks])


    return(
        <div className={styles.container}>
        <h5 className={styles.cardTitle}>{title}</h5>
        <div>
            <p className={styles.taskType}>{taskType}</p>
        </div>
            <div className={styles.cardBody}>
                <p className={styles.cardText}>{description}</p>
                <div className={styles.addTaskCard}>
                    <ul className={styles.addTaskListGroup}>
                    {addTasks.map((addTask) => {
                        return(
                        <li className={styles.addTaskListGroupItem} key={addTask.id}>
                            <input type='checkbox' name={addTask.name} id={String(addTask.id)} checked={checkedTasks[addTask.id] || false} onChange={() => handleCheckboxChange(addTask.id)}/>
                            <label htmlFor={String(addTask.id)}>{addTask.name}</label>
                        </li>
                        )
                    })}
                    </ul>
                </div>
            </div>
            <div className={styles.btnGroup}>
                    <button className={styles.btn} onClick={onDoneTask}>Congrats</button>
                    <button className={styles.btn} onClick={onSkipTask}>Sad</button>
            </div>
        </div>
    )
}

export default Task