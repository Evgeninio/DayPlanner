import styles from './ToDoList.module.scss'
import Tasks from '../data/MockData'
import Task from './Task/Task'
import { useState, useRef, useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import ProgressBar from './ProggressBar/ProgressBar'

type SubTask = {
  id: number
  name: string
}

type Task = {
    name: string
    description: string
    type: string
    addTasks: SubTask[]
}

const ToDoList = () => {
    const [currIndex, setCurrIndex] = useState(0)
    const [countMainTasks, setCountMainTasks] = useState(0)
    const [countAddTasks, setCountAddTasks] = useState(0)
    const [cardWidth, setCardWidth] = useState(0)
    const taskItemRef = useRef<HTMLDivElement>(null)
    const taskListRef = useRef<HTMLDivElement>(null)
    const amountAddTasks = (tasks: Task[]) => {
    return tasks.reduce((acc, task) => acc + task.addTasks.length, 0)
    }

    const amount = amountAddTasks(Tasks)
    const hasTasks = currIndex < Tasks.length

    const handleNextTask = (isCompleted: boolean) => {
        if (isCompleted) {
            setCountMainTasks((prev) => prev + 1)
        }

        setCurrIndex((prevIndex) => prevIndex + 1)
    }

    useLayoutEffect(() => {
        if (taskItemRef.current) {
            setCardWidth(taskItemRef.current.offsetWidth)
        }
    }, [])

    const calculateTranslateX = () => {
        const gap = 20
        if (!taskListRef.current || !taskItemRef.current) return 0
        const containerWidth = taskListRef.current.offsetWidth
        return -(currIndex * (cardWidth + gap)) + (containerWidth - cardWidth) / 2
    }

    return (
        <section className={styles.container}>
            <header className={styles.header}>
                <p className={styles.header__title}>My Tasks</p>
                <Link to="/tasks" className={`${styles.header__button} ${location.pathname === "/tasks" ? styles.active : ""}`}>
                    <p className={styles.headerButtonText}>Add task</p>
                </Link>
            </header>
            <div className={styles.doneTasks}>
                <div className={styles.mainDoneTasks}>
                    <p>Main Tasks</p>
                    <div className={styles.progressBarWrapper}>
                        <ProgressBar value={countMainTasks} tasksLength={Tasks.length} />
                    </div>
                </div>
                <div className={styles.addDoneTasks}>
                    <p>Additional Tasks</p> 
                    <div className={styles.progressBarWrapper}>
                        <ProgressBar value={countAddTasks} tasksLength={amount} />
                    </div>
                </div>
            </div>
            <div className={styles.taskWrapper}>
                {hasTasks ? (
                    <div
                        className={styles.taskList}
                        ref={taskListRef}
                        style={{ transform: `translateX(${calculateTranslateX()}px)` }}
                    >
                        {Tasks.map((item, index) => (
                            <div
                                key={index}
                                className={`${styles.taskItem} ${index === currIndex ? styles.activeTask : ''}`}
                                ref={index === currIndex ? taskItemRef : null}
                            >
                                <Task
                                    title={item.name}
                                    description={item.description}
                                    addTasks={item.addTasks}
                                    onDoneTask={() => handleNextTask(true)}
                                    onSkipTask={() => handleNextTask(false)}
                                    countAddTasks={(delta) => setCountAddTasks(prev => prev + delta)}
                                    taskType={item.type}
                                    disabled={index !== currIndex}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className={styles.noTasks}>У вас закончились задания</p>
                )}
            </div>
        </section>
    )
}

export default ToDoList
