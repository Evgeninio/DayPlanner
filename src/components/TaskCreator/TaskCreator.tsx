import { useState } from "react"
import styles from "./TaskCreator.module.scss"
import Tasks from "../data/MockData"
import { TasksTypes } from "../data/MockData"
import { Link } from "react-router-dom"

const TaskCreator = () => {
    const [task, setTask] = useState({
        name: "",
        description: "",
        type: '',
        addTasks: [] as { id: number; name: string }[],
    })

    const handleTaskChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value } = e.target
        setTask((prev) => ({
            ...prev,
            [id]: value,
        }))
    }

    const handleAddTask = () => {
        setTask((prev) => ({
            ...prev,
            addTasks: [...prev.addTasks, { id: prev.addTasks.length + 1 + Tasks.length, name: "" }],
        }))
    }

    const handleRemoveTask = (id: number) => {
        setTask((prev) => ({
            ...prev,
            addTasks: prev.addTasks.filter((taskItem) => taskItem.id !== id),
        }))
    }

    const handleAdditionalTaskChange = (index: number, value: string) => {
        const updatedTasks = [...task.addTasks];
        updatedTasks[index] = { ...updatedTasks[index], name: value };
        setTask((prev) => ({
            ...prev,
            addTasks: updatedTasks,
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (task.name.trim() === "" || task.description.trim() === "") {
            alert("Заполните все поля!")
            return
        }
        Tasks.push({ ...task })
        console.log("Задание добавлено:", task)
        setTask({ name: "", description: "", type: '', addTasks: [] })
    }
    console.log(Tasks)
    return (
        <>
        <form className={styles.form} onSubmit={handleSubmit}>
        <header className={styles.headerContainer}>
            <p className={styles.headerTitle}>Task creator</p>
            <Link to="/" className={`${styles.header__button} ${location.pathname === "/" ? styles.active : ""}`}>
                <p className={styles.headerButtonText}>Home</p>
            </Link>
        </header>
            <div className={styles.container}>
            <div className={styles.formGroup}>
                <label htmlFor="name">Task</label>
                <input
                    type="text"
                    className={styles.textInput}
                    id="name"
                    value={task.name}
                    onChange={handleTaskChange}
                    placeholder="Task title"
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="description">Task description</label>
                <textarea
                    className={styles.formControl}
                    id="description"
                    value={task.description}
                    onChange={handleTaskChange}
                    placeholder="Введите описание задачи"
                />
            </div>
            <div className={styles.formGroup}>
                <label id='type'>Example select</label>
                <select 
                className={styles.formControl} 
                onChange={handleTaskChange}
                id='type'
                >
                   {TasksTypes.map((item) => {
                    return(<option key={item} value={item}>{item}</option>)
                   })}
                </select>
            </div>
            <button type="button" className={styles.addButton} onClick={handleAddTask}>
                ➕ Добавить дополнительное задание
            </button>
            {task.addTasks.map((taskItem, index) => (
                <div key={taskItem.id} className={styles.formGroup}>
                    <label htmlFor={`addTask${taskItem.id}`}>Доп. задание {index + 1}</label>
                    <input
                        type="text"
                        className={styles.textInput}
                        id={`addTask${taskItem.id}`}
                        value={taskItem.name}
                        onChange={(e) => handleAdditionalTaskChange(index, e.target.value)}
                        placeholder="Введите задание"
                    />
                    <button
                    type='button'
                    className={styles.removeButton}
                    onClick={() => handleRemoveTask(taskItem.id)}> ❌ </button>
                </div>
            ))}
            <button type="submit" className={styles.submitButton}>
                Submit
            </button>
            </div>
        </form>
        </>
    )
}

export default TaskCreator