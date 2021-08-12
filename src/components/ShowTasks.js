import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { allTasks } from "../slices/TaskSlice";
import { BellIcon, CheckIcon, PencilIcon } from "@heroicons/react/solid";
import { useState } from "react";

import EditTask from "./EditTask";

function ShowTasks() {
  const tasks = useSelector(allTasks);
  const [edit, setEdit] = useState(false);
  useEffect(() => {
    setEdit(false);
  }, [tasks]);
  const handleEdit = () => {
    setEdit(!edit);
  };
  return (
    <>
      {tasks.map((task) => (
        <div>
          <div className="tasks_bar">
            <div className="details">
              <p>{task.desc}</p>
              <p className="show_date">{task.date}</p>
            </div>
            <div className="icons">
              <div className="edit m-l" onClick={handleEdit}>
                <PencilIcon />
              </div>
              <div className="bell">
                <BellIcon />
              </div>
              <div className="check">
                <CheckIcon />
              </div>
            </div>
          </div>
          {edit && (
            <EditTask
              desc={task.desc}
              id={task.id}
              date={task.date}
              time={task.time}
              userName={task.userName}
            />
          )}
        </div>
      ))}
    </>
  );
}

export default ShowTasks;
