import Header from "./components/Header/Header"
import styles from "./App.module.scss"
import ToDoList from "./components/ToDoList/ToDoList"
const App = () => {
  return(
    <div className={styles.container}>
      <Header />
      <ToDoList />
    </div>
  )
}

export default App
