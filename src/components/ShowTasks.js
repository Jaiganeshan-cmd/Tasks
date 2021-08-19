import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { allTasks } from "../slices/TaskSlice";
import { BellIcon, CheckIcon, PencilIcon } from "@heroicons/react/solid";
import { useState } from "react";

import EditTask from "./EditTask";

function ShowTasks({ id, desc, date, time, userName }) {
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
      <div>
        <div className="tasks_bar">
          <div className="details">
            <p>{desc}</p>
            <p className="show_date">{date}</p>
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
            key={id}
            desc={desc}
            id={id}
            date={date}
            time={time}
            userName={userName}
          />
        )}
      </div>
    </>
  );
}

export default ShowTasks;
