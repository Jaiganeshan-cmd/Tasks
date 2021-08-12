import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import "./App.css";
import AddTask from "./components/AddTask";
import ShowTasks from "./components/ShowTasks";
import { allTasks } from "./slices/TaskSlice";

function App() {
  const tasks = useSelector(allTasks);
  // const tasks = 1;
  console.log(tasks);
  const [add, setAdd] = useState(true);
  useEffect(() => {
    setAdd(false);
  }, [tasks]);

  const addClicked = () => {
    console.log("adder");
    setAdd(!add);
  };
  return (
    <div className="App">
      <div>
        <div className="header">
          <p className="task_nos">TASKS {tasks.length}</p>
          <button className="addNewTask" onClick={addClicked}>
            +
          </button>
        </div>
        {tasks.length ? <ShowTasks /> : null}
        {add ? <AddTask /> : null}
      </div>
    </div>
  );
}

export default App;
