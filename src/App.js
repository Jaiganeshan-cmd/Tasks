import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import AddTask from "./components/AddTask";
import ShowTasks from "./components/ShowTasks";
import { allTasks } from "./slices/TaskSlice";

function App() {
  const dispatch = useDispatch();
  const tasks = useSelector(allTasks);
  const [add, setAdd] = useState(false);
  const [users, setUser] = useState([]);

  useEffect(() => {
    // setAdd(false);
    dispatch({
      type: "getApi",
      payload: {
        url: "https://stage.api.sloovi.com/task/lead_c1de2c7b9ab94cb9abad131b7294cd8b?company_id=company_0336d06ff0ec4b3b9306ddc288482663",
        method: "get",
        headers: {
          Authorization:
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MjkwOTQ2ODksIm5iZiI6MTYyOTA5NDY4OSwianRpIjoiYmMzM2UyNDItZTYzMy00MjdiLTkxMzctZjc1OWY4NjNiZTY5IiwiaWRlbnRpdHkiOnsibmFtZSI6Ik1haGkgTVNEIENTSyBDYXB0YWluIiwiZW1haWwiOiJnb29kQHRlc3QzLmNvbSIsInVzZXJfaWQiOiJ1c2VyXzQxYzFkNDg1NjRhODQzNWQ4MTU2NDM5OTZkOWEzODhmIiwiaWNvbiI6Imh0dHA6Ly93d3cuZ3JhdmF0YXIuY29tL2F2YXRhci9mZDE3ZDIwNjUwYzk5NTk0YWVmNmQxMjVhMjU5ODdlYT9kZWZhdWx0PWh0dHBzJTNBJTJGJTJGczMuc2xvb3ZpLmNvbSUyRmF2YXRhci1kZWZhdWx0LWljb24ucG5nIiwiYnlfZGVmYXVsdCI6Im91dHJlYWNoIn0sImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyJ9.5ru9K2M1hSc10nI4EdfA64nV1Q5zwtF4F7bYovwq3bM",
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        onSuccess: "task/showTasks",
      },
    });
  }, []);

  useEffect(() => {
    const jai = async () => {
      const response = await axios({
        url: "https://stage.api.sloovi.com/team?company_id=company_0336d06ff0ec4b3b9306ddc288482663&product=outreach",
        headers: {
          Authorization:
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MjkwOTQ2ODksIm5iZiI6MTYyOTA5NDY4OSwianRpIjoiYmMzM2UyNDItZTYzMy00MjdiLTkxMzctZjc1OWY4NjNiZTY5IiwiaWRlbnRpdHkiOnsibmFtZSI6Ik1haGkgTVNEIENTSyBDYXB0YWluIiwiZW1haWwiOiJnb29kQHRlc3QzLmNvbSIsInVzZXJfaWQiOiJ1c2VyXzQxYzFkNDg1NjRhODQzNWQ4MTU2NDM5OTZkOWEzODhmIiwiaWNvbiI6Imh0dHA6Ly93d3cuZ3JhdmF0YXIuY29tL2F2YXRhci9mZDE3ZDIwNjUwYzk5NTk0YWVmNmQxMjVhMjU5ODdlYT9kZWZhdWx0PWh0dHBzJTNBJTJGJTJGczMuc2xvb3ZpLmNvbSUyRmF2YXRhci1kZWZhdWx0LWljb24ucG5nIiwiYnlfZGVmYXVsdCI6Im91dHJlYWNoIn0sImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyJ9.5ru9K2M1hSc10nI4EdfA64nV1Q5zwtF4F7bYovwq3bM",
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      setUser([
        {
          name: response.data.results.data[0].name,
          id: response.data.results.data[0].id,
        },
      ]);
    };
    return () => jai();
  }, [add, tasks]);

  const addClicked = () => {
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
                    key={task.task_id}
                    desc={task.task_msg}
                    id={task.id}
                    date={task.task_date}
                    time={
                      task.created
                        ? new Date(task.created)
                            .toISOString()
                            .split("T")[1]
                            .split(".")[0]
                        : task.time
                    }
                    userName={users}
                  />
                ))}
              </div>
            ) : null}
            {add ? <AddTask dropDown={users} /> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
