import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header"
import TaskCreator from "./components/TaskCreator/TaskCreator";
import styles from "./App.module.scss"
import ToDoList from "./components/ToDoList/ToDoList"
const App = () => {
  return(
  <div className={styles.app}>
      <main className={styles.container}>
          <Router>
              <Header />
              <Routes>
                  <Route path="/" element={<ToDoList />} />
                  <Route path="/tasks" element={<TaskCreator />} />
                  {/* <Route path="/progress" element={<ToDoList />} /> */}
              </Routes>
          </Router>
      </main>
    </div>
  )
}

export default App
