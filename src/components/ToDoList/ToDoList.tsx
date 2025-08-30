import styles from './ToDoList.module.scss'
import Tasks from '../data/MockData'
import Task from './Task/Task'
import { useState, useRef, useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'

const ToDoList = () => {
    const [currIndex, setCurrIndex] = useState(0)
    const [countMainTasks, setCountMainTasks] = useState(0)
    const [countAddTasks, setCountAddTasks] = useState(0)
    const [cardWidth, setCardWidth] = useState(0)
    const taskItemRef = useRef<HTMLDivElement>(null)
    const taskListRef = useRef<HTMLDivElement>(null)

    const hasTasks = currIndex < Tasks.length 

    const handleNextTask = (isCompleted: boolean) => {
        if (isCompleted) {
            setCountMainTasks((prev) => prev + 1);
        }

        setCurrIndex((prevIndex) => (prevIndex < Tasks.length ? prevIndex + 1 : prevIndex));
    };

    useLayoutEffect(() => {
        if (taskItemRef.current) {
            setCardWidth(taskItemRef.current.offsetWidth);
        }
    }, []);

    const calculateTranslateX = () => {
        const gap = 20; // Ширина gap между карточками
        if (!taskListRef.current || !taskItemRef.current) return 0;
        const containerWidth = taskListRef.current.offsetWidth;
        return -(currIndex * (cardWidth + gap)) + (containerWidth - cardWidth) / 2;
    };

    return (
        <section className={styles.container}>
            <header className={styles.header}>
                <p className={styles.header__title}>My Tasks</p>
                <Link to="/tasks" className={`${styles.header__button} ${location.pathname === "/tasks" ? styles.active : ""}`}>
                    <p className={styles.headerButtonText}>Add task</p>
                </Link>
            </header>
            <div className={styles.doneTasks}>
                <p>Completed tasks: {countMainTasks}</p>
                <p>Completed add tasks: {countAddTasks}</p>
            </div>
            <div className={styles.taskWrapper}>
            <div
                className={styles.taskList} ref={taskListRef}
                style={{ transform: `translateX(${calculateTranslateX()}px)` }} // Используем динамический расчет
            >
                
                {hasTasks? (Tasks.map((item, index) => {
                return(          
                    <div key={index} className={`${styles.taskItem} ${index === currIndex ? styles.activeTask : ''}`} ref={taskItemRef}>
                        <Task
                            title={item.name}
                            description={item.description}
                            addTasks={item.addTasks}
                            onDoneTask={() => handleNextTask(true)}
                            onSkipTask={() => handleNextTask(false)}
                            countAddTasks={setCountAddTasks}
                            taskType={item.type}
                        />
                    </div>
                )})): <p style={{ transform: `translateX(calc(50%)` }}>У вас закончились задания</p>}
            </div>
        </div>
        </section>
    )
}

export default ToDoList;