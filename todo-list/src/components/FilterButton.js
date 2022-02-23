import React from "react";
import style from "../index.module.css";

function FilterButton(props) {


  return (
    <div className={style.buttons}>
{/* tu musiałem usunąc 2 inne buttony tak zeby w komponencie znajdował sie tylko jeden inaczej renderują sie one pod sobą i wszystko się rozlatuje(sprawdzcie sami)*/}
      <button
//8. Wrzucamy propsy z App do komponentu
        type="button"
        aria-pressed={props.isPressed}
        onClick={() => props.setFilter(props.name)}
      >
      {props.name}
      </button>
    </div>
  );
}

export default FilterButton;
