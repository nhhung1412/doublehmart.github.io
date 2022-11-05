import React, { useEffect } from "react";

const Helmet = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  document.title = "DoubleHMart - " + props.title;
  return <div>{props.children}</div>;
};

export default Helmet;
