import React from "react";

const Square = props => {
  return (
    <button
      className={props.highlightWinSquares + ' '+ props.value}
      onClick={props.updateStateOnClick}
    >
      {props.value}
    </button>
  );
};

export default Square;
