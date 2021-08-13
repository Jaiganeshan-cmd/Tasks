import { useRef } from "react";
import React, { useState } from "react";
import { addTask } from "../slices/TaskSlice";
import { useDispatch } from "react-redux";
import Joi from "joi";

function AddTask() {
  const desc = useRef();
  const date = useRef();
  const time = useRef();
  const user = useRef();

  const dispatch = useDispatch();
  let [id, setId] = useState(0);
  const handleCancel = () => {};

  const handleSave = (e) => {
    e.preventDefault();
    setId(id + 1);
    const Description = desc.current.value;
    const Date = date.current.value;
    const Time = time.current.value;
    const User = user.current.value;
    const task = {
      id: id,
      desc: Description,
      date: Date,
      time: Time,
      userName: User,
    };
    const validation = validate(task);
    if (validation.error) {
      alert(validation.error);
    } else {
      dispatch(addTask(task));
      desc.current.value = "";
      date.current.value = "";
      time.current.value = "";
      user.current.value = "";
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
              ref={time}
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
            ref={user}
            autoComplete="off"
          />
        </div>
        <div className=" buttons container">
          <input
            type="button"
            value="Cancel"
            className="cancel_button button_pos"
            onClick={handleCancel}
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
