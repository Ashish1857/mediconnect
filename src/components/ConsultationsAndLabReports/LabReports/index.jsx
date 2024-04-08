import React, { useState } from "react";
import PropTypes from "prop-types";
import ConsultationAndReportsLayout from "../shared/Layout";
import { Grid, Typography } from "@mui/material";
import { LAB_TESTS } from "../../../utils/constants";

const Consultations = (props) => {
  const searchByOptions = ["Hospital", "Test name"];

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"      
      width="80%"
      style={{ margin: "0 auto", padding: "1rem 0" }}
    >
      <Grid item width="100%">
        <header>
          <Typography fontSize="2rem" style={{ color: "#05B8A3" }}>
            Book your lab tests
          </Typography>
          <Typography fontSize="1rem" color="GrayText">
            Easily manage your health by booking laboratory tests with our
            certified labs—quick, convenient, and reliable
          </Typography>
        </header>
        <br />
        <ConsultationAndReportsLayout
          isLabtestUI
          searchOptions={searchByOptions}
          doctorSearchOptions={LAB_TESTS}
          topOptions={LAB_TESTS}
          optionCardKey="report"
        />
      </Grid>
    </Grid>
  );
};

Consultations.propTypes = {};

export default Consultations;
