import React, { useState } from "react";
import PropTypes from "prop-types";
import ConsultationAndReportsLayout from "../shared/Layout";
import { Grid, Typography } from "@mui/material";
import {
  TOP_DOCTORS,
  THROAT_DOCTORS,
  STOMACH_DOCTORS,
  MUSCLE_PAIN_DOCTORS,
  OTHER_DOCTORS,
} from "../../../utils/constants";

const Consultations = (props) => {
  const searchByOptions = ["Ailment", "Speciality", "Name", "Hospital name"];

  return (
    <Grid container alignItems="center" height="80vh">
      <Grid item>
        <header>
          <Typography fontSize="2rem">Book consultations</Typography>
        </header>
        <br />
        <ConsultationAndReportsLayout
          searchOptions={searchByOptions}
          doctorSearchOptions={[
            ...MUSCLE_PAIN_DOCTORS,
            ...THROAT_DOCTORS,
            ...STOMACH_DOCTORS,
            ...OTHER_DOCTORS,
          ]}
          topOptions={TOP_DOCTORS}
          optionCardKey="doctor"
        />
      </Grid>
    </Grid>
  );
};

Consultations.propTypes = {};

export default Consultations;
