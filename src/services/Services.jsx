import React from "react";

import inforCardServices from "../assets/fake-data/serviceData";

const Services = () => {
  return (
    <>
      <section>
        <div className="container">
          <div className="services">
            {inforCardServices.map((item, index) => (
              <div
                className="services__card"
                key={index}
                style={{ backgroundColor: item.bgColor }}
              >
                <span className="services__card__icon">
                  <i className={item.icon}></i>
                </span>
                <div className="services__card__contents">
                  <h1>{item.title}</h1>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
