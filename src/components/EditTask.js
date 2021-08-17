import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { TrashIcon } from "@heroicons/react/solid";

function EditTask({ id, desc, date, time, userName }) {
  const dispatch = useDispatch();
  const [Desc, setDesc] = useState(desc);
  const [Date, setDate] = useState(date);
  const [Time, setTime] = useState(time);
  const [User, setUser] = useState(userName);
  console.log(User);
  const handleDelete = () => {
    const url = `https://stage.api.sloovi.com/task/lead_c1de2c7b9ab94cb9abad131b7294cd8b/${id}?company_id=company_0336d06ff0ec4b3b9306ddc288482663`;
    dispatch({
      type: "deleteApi",
      payload: {
        url,
        method: "delete",
        headers: {
          Authorization:
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MjkwOTQ2ODksIm5iZiI6MTYyOTA5NDY4OSwianRpIjoiYmMzM2UyNDItZTYzMy00MjdiLTkxMzctZjc1OWY4NjNiZTY5IiwiaWRlbnRpdHkiOnsibmFtZSI6Ik1haGkgTVNEIENTSyBDYXB0YWluIiwiZW1haWwiOiJnb29kQHRlc3QzLmNvbSIsInVzZXJfaWQiOiJ1c2VyXzQxYzFkNDg1NjRhODQzNWQ4MTU2NDM5OTZkOWEzODhmIiwiaWNvbiI6Imh0dHA6Ly93d3cuZ3JhdmF0YXIuY29tL2F2YXRhci9mZDE3ZDIwNjUwYzk5NTk0YWVmNmQxMjVhMjU5ODdlYT9kZWZhdWx0PWh0dHBzJTNBJTJGJTJGczMuc2xvb3ZpLmNvbSUyRmF2YXRhci1kZWZhdWx0LWljb24ucG5nIiwiYnlfZGVmYXVsdCI6Im91dHJlYWNoIn0sImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyJ9.5ru9K2M1hSc10nI4EdfA64nV1Q5zwtF4F7bYovwq3bM",
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        onSuccess: "task/removeTask",
        id: id,
      },
    });
  };
  //handling changes

  const handleDescChange = (e) => {
    setDesc(e.target.value);
  };
  const handleDateChange = (e) => {
    setDate(e.target.value);
  };
  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };
  const handleUserChange = (e) => {
    setUser(e.target.value);
  };
  const handleClick = (e) => {
    e.preventDefault();

    const task = {
      assigned_user: userName[0].id,
      task_date: Date,
      task_time: 0,
      is_completed: 0,
      time_zone: 1900,
      task_msg: Desc,
    };
    console.log(Desc);
    const url = `https://stage.api.sloovi.com/task/lead_c1de2c7b9ab94cb9abad131b7294cd8b/${id}?company_id=company_0336d06ff0ec4b3b9306ddc288482663`;

    dispatch({
      type: "updateApi",
      payload: {
        url,
        method: "put",
        headers: {
          Authorization:
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MjkwOTQ2ODksIm5iZiI6MTYyOTA5NDY4OSwianRpIjoiYmMzM2UyNDItZTYzMy00MjdiLTkxMzctZjc1OWY4NjNiZTY5IiwiaWRlbnRpdHkiOnsibmFtZSI6Ik1haGkgTVNEIENTSyBDYXB0YWluIiwiZW1haWwiOiJnb29kQHRlc3QzLmNvbSIsInVzZXJfaWQiOiJ1c2VyXzQxYzFkNDg1NjRhODQzNWQ4MTU2NDM5OTZkOWEzODhmIiwiaWNvbiI6Imh0dHA6Ly93d3cuZ3JhdmF0YXIuY29tL2F2YXRhci9mZDE3ZDIwNjUwYzk5NTk0YWVmNmQxMjVhMjU5ODdlYT9kZWZhdWx0PWh0dHBzJTNBJTJGJTJGczMuc2xvb3ZpLmNvbSUyRmF2YXRhci1kZWZhdWx0LWljb24ucG5nIiwiYnlfZGVmYXVsdCI6Im91dHJlYWNoIn0sImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyJ9.5ru9K2M1hSc10nI4EdfA64nV1Q5zwtF4F7bYovwq3bM",
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: JSON.stringify(task),
        onSuccess: "task/updateTask",
      },
    });
  };

  const arrays = ["", "jai", "people", "Anderw", "Hulk", "irfan"];

  const handleChange = (e) => {
    setUser(e.target.value);
    console.log(userName);
  };
  return (
    <div>
      <form className="newTask">
        <div className="task_desc container">
          <label htmlFor="Task Description">Task Description</label>
          <input
            type="text"
            placeholder="Enter new Task..."
            id="Task Description"
            className="input_field"
            value={Desc}
            onChange={handleDescChange}
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
              value={Date}
              onChange={handleDateChange}
              autoComplete="off"
            />
          </div>
          <div className="time">
            <label htmlFor="time">Time</label>
            <input
              type="time"
              id="time"
              className="input_field"
              value={Time}
              onChange={handleTimeChange}
              autoComplete="off"
            />
          </div>
        </div>
        <div className="container user">
          <label htmlFor="user">Assigned User</label>
          <select
            name="Cars"
            htmlFor="user"
            className="arrows"
            onChange={handleChange}
            value={User}
          >
            {User.map((user) => (
              <option value={user.id}>{user.name}</option>
            ))}
          </select>
        </div>
        <div className=" buttons container">
          <div className="delete" onClick={handleDelete}>
            <TrashIcon />
          </div>
          <input
            type="button"
            value="Cancel"
            className="cancel_button button_pos"
          />
          <input
            type="submit"
            value="Save"
            className="save_button button_pos"
            onClick={handleClick}
          />
        </div>
      </form>
    </div>
  );
}

export default EditTask;
