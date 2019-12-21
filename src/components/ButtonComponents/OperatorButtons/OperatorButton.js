import React from "react";

const OperatorButton = (props) => {
  const {value, char, className} = props;
  return (
    <>
      {/* Display a button element rendering the data being passed down from the parent container on props */}
      <button className={className}>{value}</button>
    </>
  );
};

export default OperatorButton;