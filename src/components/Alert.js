import React, { useContext } from "react";

export default function Alert(props) {

  function cpatalize(word) {
    let a = word.charAt(0).toUpperCase() + word.slice(1);
    return a;
  }

  return (
    props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
      <strong>{cpatalize(props.alert.type)} </strong> : {props.alert.msg}
    </div>
  );
}
