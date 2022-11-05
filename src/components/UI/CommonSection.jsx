import React from "react";

const CommonSection = ({ title }) => {
  return (
    <section className="common__section">
      <div className="container">
        <h1>{title}</h1>
      </div>
    </section>
  );
};

export default CommonSection;
