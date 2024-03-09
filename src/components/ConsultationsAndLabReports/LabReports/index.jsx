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
      height="80vh"
      width="80%"
      style={{ margin: "0 auto" }}
    >
      <Grid item width="100%">
        <header>
          <Typography fontSize="2rem">Book your lab tests</Typography>
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
