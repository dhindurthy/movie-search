import React from "react";
import "./styles.scss";

function Input(props) {
  return (
    <React.Fragment>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        autoComplete="off"
        id={props.id}
        list={props.list}
        onChange={props.onInputChange}
        onKeyDown={props.onInputKeyDown}
      />
    </React.Fragment>
  );
}
export default Input;
