import React from "react";

const Landingpage = props => {
  console.log(props);
  return (
    <div>
      {props.location.state ? <small>{props.location.state.msg}</small> : null}
      <h3>Landing Page</h3>
    </div>
  );
};

export default Landingpage;
