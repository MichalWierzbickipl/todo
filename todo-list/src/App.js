import React, { useState } from "react";
import style from "./index.module.css";
import Todo from "./components/Todo.js";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import { nanoid } from "nanoid";



//2.tworzymy obiekt FILTER_MAP którego wartości to fukncje którymi będziemy zmieniac widoki tasków wszystkie/niewykonane/wykonane
const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};
//3.tworzymy listę obiektów bazującą na FILTER_MAP
const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  //1.Dodajemy nowego hooka useState do filtrowania tasków, domyślnie ustawiony na 'All' zeby wyświetlały nam sie wszystkie taski
  const [filter, setFilter] = useState("All");

  function addTask(name) {
    const newTask = { id: "todo-" + nanoid(), name: name, completed: false };
    setTasks([...tasks, newTask]);
  }

  function toggleTaskCompleted(id) {
    const updateTask = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updateTask);
  }

  function toggleAllCompleted() {
    const shouldComplete = tasks.some((task) => {
      return !task.completed;
    });
    const updateAll = tasks.map((task) => {
      return { ...task, completed: shouldComplete };
    });
    setTasks(updateAll);
    console.log(tasks);
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  function clearCompleted() {
    setTasks((tasks) => {
      return tasks.filter((task) => {
        return !task.completed;
      });
    });
  }

  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(editedTaskList);
  }

  //9.Dodajemy filter(FILTER_MAP[filter]) przed mapowaniem zeby renderowały nam sie tylko taski które zaznaczymy na przycisku filterList
  
  const taskList = tasks
  .filter(FILTER_MAP[filter])
  .map((task) => (
    <Todo
    id={task.id}
    name={task.name}
    completed={task.completed}
    key={task.id}
    toggleTaskCompleted={toggleTaskCompleted}
    deleteTask={deleteTask}
    editTask={editTask}
    />
    ));
    //5.Tworzymy const filterList w którym mapujemy listę FILTER_NAMES (podobnie jak robiliśmy z <Todo /> kilka linijek wyżej)
  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      //7. dodajemy propsy isPressed -> mowi nam czy przycisk jest wcisnięty czy nie, setFilter -> callback ustawiający aktynwy filter ???
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  const tasksNoun = taskList.length !== 1 ? "items" : "item";
  const footerCounter = `${taskList.length} ${tasksNoun}`;

  return (
    <>
      <h1>todos</h1>
      <div className={style.todo}>
        <Form
          addTask={addTask}
          toggleAllCompleted={toggleAllCompleted}
          taskList={taskList.length}
          filter={filter}
        />

        <ul className={style.list}>
          {taskList}
        </ul>

        {taskList.length === 0 && filter === "All" ? null : (
          <footer className={style.footer}>
            <p className={style.todoCount}>{footerCounter} left</p>
            {/* 6.Wrzucamy const filterList zamiast 3x <FilterButton /> */}
            <div style={{ display: "flex", alignItems: "center" }}>
              {filterList}
            </div>
            <button
              className={style.clearButton}
              onClick={clearCompleted}
              style={{ border: "none" }}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>
    </>
  );
}

export default App;
