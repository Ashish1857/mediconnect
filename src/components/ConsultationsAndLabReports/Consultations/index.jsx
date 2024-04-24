import React, { useState } from "react";
import PropTypes from "prop-types";
import ConsultationAndReportsLayout from "../shared/Layout";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import {
  TOP_DOCTORS,
  THROAT_DOCTORS,
  STOMACH_DOCTORS,
  MUSCLE_PAIN_DOCTORS,
  OTHER_DOCTORS,
} from "../../../utils/constants";
import TopOptions from "../shared/TopOptions";

const Consultations = (props) => {
  const searchByOptions = ["Ailment", "Speciality", "Name", "Hospital name"];

  return (
    <>
      <Grid
        container
        width="80%"
        style={{ margin: "0 auto", padding: "1rem 0", textAlign: "left" }}
      >
        <Grid item>
          <header>
            <Typography fontSize="2rem" fontWeight={300}>
              Find your preferred doctor
            </Typography>
            <Typography fontSize="1rem" color="GrayText">
              Schedule a medical appointment with ease. Browse top-rated
              specialists, select your preferred doctor, and book a time that
              suits your schedule, all in just a few clicks.
            </Typography>
            <div className="title-highlighter" />
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
          {/* <div className="my-divider" style={{ marginTop: "32px" }} /> */}
        </Grid>
        <TopOptions topOptions={TOP_DOCTORS} optionCardKey="doctor" />
      </Grid>
    </>
  );
};

Consultations.propTypes = {};

export default Consultations;
