import React, { useState } from "react";
import { removeTask, updateTask } from "../slices/TaskSlice";
import { useDispatch } from "react-redux";
import Joi from "joi";
import { TrashIcon } from "@heroicons/react/solid";

function EditTask({ id, desc, date, time, userName }) {
  const dispatch = useDispatch();
  const [Desc, setDesc] = useState(desc);
  const [Date, setDate] = useState(date);
  const [Time, setTime] = useState(time);
  const [User, setUser] = useState(userName);
  const handleDelete = () => {
    dispatch(removeTask(id));
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
      id: id,
      desc: Desc,
      date: Date,
      time: Time,
      userName: User,
    };
    const validation = validate(task);
    if (validation.error) {
      alert(validation.error);
    } else {
      dispatch(updateTask(task));
    }
  };
  function validate(inputs) {
    const schema = Joi.object({
      id: Joi.number(),
      desc: Joi.string().required(),
      date: Joi.date().required(),
      time: Joi.required(),
      userName: Joi.string().required(),
    });
    return schema.validate(inputs);
  }
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
          <input
            type="text"
            id="user"
            placeholder="User Name.."
            className="input_field"
            value={User}
            onChange={handleUserChange}
            autoComplete="off"
          />
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
