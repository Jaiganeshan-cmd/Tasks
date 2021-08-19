import { useRef } from "react";
import React, { useState } from "react";
import { addTask } from "../slices/TaskSlice";
import { useDispatch } from "react-redux";
import moment from "moment";

function AddTask({ dropDown }) {
  console.log(dropDown);
  const desc = useRef();
  const date = useRef();
  const time = useRef();
  const user = useRef();

  const dispatch = useDispatch();
  let [id, setId] = useState(0);
  let [userName, setUserName] = useState("jai");

  const handleSave = (e) => {
    e.preventDefault();
    setId(id + 1);
    const Description = desc.current.value;
    const Date = date.current.value;
    const Time = time.current.value;
    const User = user.current.value;
    var hms = Time;
    var a = hms.split(":");

    var seconds = +a[0] * 60 * 60 + +a[1] * 60 + +a[2];
    const task = {
      assigned_user: user.current.value,
      task_date: Date,
      task_time: seconds,
      is_completed: 0,
      time_zone: 0,
      task_msg: Description,
    };
    dispatch({
      type: "addApi",
      payload: {
        url: "https://stage.api.sloovi.com/task/lead_c1de2c7b9ab94cb9abad131b7294cd8b?company_id=company_0336d06ff0ec4b3b9306ddc288482663",
        method: "post",
        headers: {
          Authorization:
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MjkwOTQ2ODksIm5iZiI6MTYyOTA5NDY4OSwianRpIjoiYmMzM2UyNDItZTYzMy00MjdiLTkxMzctZjc1OWY4NjNiZTY5IiwiaWRlbnRpdHkiOnsibmFtZSI6Ik1haGkgTVNEIENTSyBDYXB0YWluIiwiZW1haWwiOiJnb29kQHRlc3QzLmNvbSIsInVzZXJfaWQiOiJ1c2VyXzQxYzFkNDg1NjRhODQzNWQ4MTU2NDM5OTZkOWEzODhmIiwiaWNvbiI6Imh0dHA6Ly93d3cuZ3JhdmF0YXIuY29tL2F2YXRhci9mZDE3ZDIwNjUwYzk5NTk0YWVmNmQxMjVhMjU5ODdlYT9kZWZhdWx0PWh0dHBzJTNBJTJGJTJGczMuc2xvb3ZpLmNvbSUyRmF2YXRhci1kZWZhdWx0LWljb24ucG5nIiwiYnlfZGVmYXVsdCI6Im91dHJlYWNoIn0sImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyJ9.5ru9K2M1hSc10nI4EdfA64nV1Q5zwtF4F7bYovwq3bM",
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: JSON.stringify(task),
        onSuccess: "task/addTask",
      },
    });

    desc.current.value = "";
    date.current.value = "";
    time.current.value = "";
  };

  const handleChange = (e) => {
    setUserName(e.target.value);
    console.log(userName);
  };
  return (
    <div>
      <form className="newTask">
        <div className="task_desc container">
          <label htmlFor="Task Description">Task Description</label>
          <input
            ref={desc}
            type="text"
            placeholder="Enter new Task..."
            id="Task Description"
            className="input_field"
            autoComplete="off"
          />
        </div>
        <div className="date_time container">
          <div className="date">
            <label htmlFor="Date">Date</label>
            <input
              type="date"
              id="Date"
              className="input_field "
              ref={date}
              autoComplete="off"
            />
          </div>
          <div className="time">
            <label htmlFor="time">Time</label>
            <input
              type="time"
              id="time"
              className="input_field"
              step="1"
              ref={time}
              autoComplete="off"
            />
          </div>
        </div>
        <div className="container user">
          <label htmlFor="user">Assigned User</label>
          {/* <input
            type="text"
            id="user"
            placeholder="User Name.."
            className="input_field"
            ref={user}
            autoComplete="off"
          /> */}
          <select
            htmlFor="user"
            className="arrows"
            onChange={handleChange}
            ref={user}
          >
            <option value=""></option>
            {dropDown.map((user) => (
              <option value={user.id} id="user">
                {user.name}
              </option>
            ))}
          </select>
        </div>
        <div className=" buttons container">
          <input
            type="button"
            value="Cancel"
            className="cancel_button button_pos"
          />
          <input
            type="submit"
            value="Save"
            className="save_button button_pos"
            onClick={handleSave}
          />
        </div>
      </form>
    </div>
  );
}

export default AddTask;
