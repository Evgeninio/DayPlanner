import { useState } from 'react'
import styles from './Habbit.module.scss'
import ProgressBar from '../../ToDoList/ProggressBar/ProgressBar'

type HabbitProps = {
  title: string
  goal: number
  progress: number
}

const Habbit = ({ title, goal, progress }: HabbitProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentProgress, setCurrentProgress] = useState(progress)

  const handleTogglePopup = () => {
    setIsOpen(!isOpen)
  }

  const handleIncrement = () => {
    setCurrentProgress((prev) => (prev < goal ? prev + 1 : prev))
  }

  return (
    <>
      <div className={styles.container} onClick={handleTogglePopup}>
        <header className={styles.habbitHeader}>
          <p className={styles.headerTitle}>{title}</p>
          <button
            className={styles.incrementBtn}
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              handleIncrement()
            }}
          >
            +1
          </button>
        </header>
        <ProgressBar value={currentProgress} tasksLength={goal} />
      </div>

      {isOpen && (
        <div className={styles.popupOverlay} onClick={handleTogglePopup}>
          <div
            className={styles.popup}
            onClick={(e) => e.stopPropagation()}
          >
            <header className={styles.popupHeader}>
              <h2>{title}</h2>
              <button className={styles.closeBtn} onClick={handleTogglePopup}>
                ✖
              </button>
            </header>

            <div className={styles.popupBody}>
              <p><strong>Цель:</strong> {goal}</p>
              <p><strong>Прогресс:</strong> {currentProgress}</p>
              <ProgressBar value={currentProgress} tasksLength={goal} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Habbit

