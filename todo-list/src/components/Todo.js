import React, { useState } from "react";
import style from "../index.module.css";

function Todo(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(props.name);

  function handleChange(e) {
    setNewName(e.target.value);
  }

  function changeTemplate(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      props.editTask(props.id, newName);
      setNewName(props.name);
      setIsEditing(false);
    }
  }

  const editingTemplate = (
    <div>
      <form onKeyPress={changeTemplate}>
        <input
          className={style.editing}
          type="text"
          value={newName}
          onChange={handleChange}
        ></input>
      </form>
    </div>
  );

  const viewTemplate = (
    <div onDoubleClick={() => setIsEditing(true)}>
      <input
        type="checkbox"
        id={props.id}
        checked={props.completed}
        onChange={() => props.toggleTaskCompleted(props.id)}
      />
      <label htmlFor={props.id}>{props.name}</label>
      <button
        className={style.destroy}
        onClick={() => props.deleteTask(props.id)}
      ></button>
    </div>
  );
  return (
    <>
      <li className={style.toggle}>
        {isEditing ? editingTemplate : viewTemplate}
      </li>
    </>
  );
}

export default Todo;
