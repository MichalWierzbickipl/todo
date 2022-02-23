import React, { useState } from "react";
import style from "../index.module.css";
import Chevron from "../icons/Chevron.png";


function Form(props) {
  const [name, setName] = useState("");


  function handleChange(e) {
    setName(e.target.value);
  }

  function handleSubmit(e) {
    if (name.trim() !== "") {
      e.preventDefault();
      props.addTask(name);
      setName("");
    } else {
      e.preventDefault();
    }
  }


  

  return (
    <form className={style.header} onSubmit={handleSubmit}>
      {/* tutaj wrzuciłem atrybut type zeby przy wcisnięciu button nie dodawał nowego taska */}
      {props.taskList === 0 && props.filter === "All" ? null :
      (<button type="button" onClick={() => props.toggleAllCompleted()}>
        <img src={Chevron} alt="chevron" />
      </button>)}
      <input
        type="text"
        className={style.input}
        name="text"
        autoComplete="off"
        placeholder="What needs to be done?"
        value={name}
        onChange={handleChange}
      />
    </form>
  );
}

export default Form;
