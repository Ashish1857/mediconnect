import React, { useState } from "react";
import PropTypes from "prop-types";
import ConsultationAndReportsLayout from "../shared/Layout";

const Consultations = (props) => {
  const [topOptions, setTopOptions] = useState([
    { name: "Doctor 1", id: 1 },
    { name: "Doctor 2", id: 2 },
    { name: "Doctor 3", id: 3 },
    { name: "Doctor 4", id: 4 },
    { name: "Doctor 5", id: 5 },
  ]);

  const ailments = [
    "Stomach",
    "Muscle pain",
    "Throat",
    "Sport injury",
    "Other",
  ];

  const handleSearchChange = (searchValue) => {
    const newOptions = [];
    for (let index = 1; index < 6; index++) {
      newOptions.push({ name: `${searchValue} Doctor ${index}`, id: index });
    }
    setTopOptions(() => newOptions);
  };

  console.log({ topOptions });

  return (
    <>
      <ConsultationAndReportsLayout
        searchOptions={ailments}
        topOptions={topOptions}
        onSearchChange={handleSearchChange}
        optionCardKey="doctor"
      />
    </>
  );
};

Consultations.propTypes = {};

export default Consultations;
