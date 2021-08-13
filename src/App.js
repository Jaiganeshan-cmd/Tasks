import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import "./App.css";
import AddTask from "./components/AddTask";
import ShowTasks from "./components/ShowTasks";
import { allTasks } from "./slices/TaskSlice";

function App() {
  const tasks = useSelector(allTasks);
  const [add, setAdd] = useState(true);
  useEffect(() => {
    setAdd(false);
  }, [tasks]);

  const addClicked = () => {
    console.log("adder");
    setAdd(!add);
  };
  return (
    <div className="page">
      <header></header>
      <div className="main">
        <nav></nav>
        <div className="task_box">
          <div>
            <div className="header">
              <p className="task_nos">TASKS {tasks.length}</p>
              <button className="addNewTask" onClick={addClicked}>
                {add ? "-" : "+"}
              </button>
            </div>
            {tasks.length ? (
              <div>
                {tasks.map((task) => (
                  <ShowTasks
                    desc={task.desc}
                    id={task.id}
                    date={task.date}
                    time={task.time}
                    userName={task.userName}
                  />
                ))}
              </div>
            ) : null}
            {add ? <AddTask /> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
