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
    <Grid
      container
      alignItems="center"
      height="80vh"
      width="80%"
      style={{ margin: "0 auto" }}
    >
      <Grid item>
        <header>
          <Typography fontSize="2rem">
            Book consultations with our doctors
          </Typography>
          <Typography fontSize="1rem" color="GrayText">
            Schedule a medical appointment with ease. Browse top-rated
            specialists, select your preferred doctor, and book a time that
            suits your schedule, all in just a few clicks.
          </Typography>
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
