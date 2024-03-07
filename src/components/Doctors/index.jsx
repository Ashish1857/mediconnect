import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import {
  TOP_DOCTORS,
  THROAT_DOCTORS,
  STOMACH_DOCTORS,
  MUSCLE_PAIN_DOCTORS,
  OTHER_DOCTORS,
} from "../../utils/constants";
import { Link, useParams } from "react-router-dom";
import { Person } from "@mui/icons-material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { getFromStorage, updateStorage } from "./../../utils/localStorage";
import { v4 as uuid } from "uuid";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { cloneDeep } from "lodash";
import dayjs from "dayjs";

const Doctors = (props) => {
  const [formValues, setFormValues] = useState({});
  const updateForm = (key, value) => {
    setFormValues((formValues) => ({
      ...formValues,
      [key]: value,
    }));
  };

  const addToStorage = (value) => {
    const consultations = getFromStorage("consultations");
    const consultationsCopy = cloneDeep(consultations) || [];
    const valueCopy = cloneDeep(value);
    valueCopy.bookingId = uuid();
    consultationsCopy.push(valueCopy);
    updateForm("bookingId", valueCopy.bookingId);
    updateStorage(`consultations`, consultationsCopy);
  };

  const ALL_DOCTORS = [
    ...TOP_DOCTORS,
    ...THROAT_DOCTORS,
    ...STOMACH_DOCTORS,
    ...MUSCLE_PAIN_DOCTORS,
    ...OTHER_DOCTORS,
  ];
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [doctorDetails, setDoctorDetails] = useState({});
  const [isFormComplete, setFormAsCompleted] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setIsLoading(() => true);
      const currentDoctorDetails = ALL_DOCTORS.find(
        ({ id }) => id === Number(params.doctorid)
      );
      setDoctorDetails(() => currentDoctorDetails);
      setIsLoading(() => false);
    }

    return () => {
      setDoctorDetails(() => {});
      setIsLoading(() => false);
    };
  }, []);

  if (isLoading) {
    return (
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="body1">Loading...</Typography>
        </Grid>
      </Grid>
    );
  }

  if (isFormComplete) {
    return (
      <Grid container alignItems="center" height="80vh" width="80%">
        <Grid container direction="column" rowSpacing={2}>
          <Grid item>
            <header>
              <Typography sx={{ fontSize: "2rem" }}>
                Consultation booked
              </Typography>
            </header>
          </Grid>
          <Grid item>
            <FontAwesomeIcon size="5x" color="green" icon={faCircleCheck} />
          </Grid>
          <Grid item alignItems="center">
            <main>
              <Box
                textAlign="left"
                alignItems="center"
                sx={{ border: "2px solid grey", padding: "16px" }}
              >
                <Typography>Hospital: {doctorDetails.hospital}</Typography>
                <Typography>Doctor: {doctorDetails.name}</Typography>
                <Typography>
                  Date and time: {dayjs(formValues.datetime).format("llll")}
                </Typography>
                <Typography>Consultation ID: {formValues.bookingId}</Typography>
              </Box>
              <br />
              <Link to="/">
                <Button variant="contained">Go to home</Button>
              </Link>
            </main>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  // #033759;
  return (
    <main>
      <Grid
        container
        alignItems="center"
        height="80vh"
        width="80%"
        style={{ margin: "0 auto" }}
      >
        <Grid item xs={12}>
          <Grid item xs={12}>
            <Grid container sx={{ background: "#05B8A3", padding: "16px" }}>
              <Grid item xs={3} justifyContent="center" alignItems="center">
                <Avatar
                  sx={{
                    bgcolor: "#033759",
                    width: "150px",
                    height: "150px",
                    margin: "0 auto",
                  }}
                >
                  <Person />
                </Avatar>
              </Grid>
              <Grid item xs={9} sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="body1" align="left">
                  Name: Dr. {doctorDetails.name}
                  <br />
                  Doctor ID: {doctorDetails.id}
                  <br />
                  Speciality: {doctorDetails.speciality}
                  <br />
                  Visiting hospital: {doctorDetails.hospital}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={4} sx={{ background: "#F4F4F4" }} padding={2}>
                Patient details
              </Grid>
              <Grid item xs={8} padding={2}>
                <Typography fontSize="2rem">Book your consultation</Typography>
                <Grid
                  container
                  direction="column"
                  rowSpacing={2}
                  marginTop={2}
                  marginBottom={2}
                >
                  <Grid item>
                    <FormControl fullWidth>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                          disablePast
                          label="Select a date and time of your choice"
                          onChange={(value) =>
                            updateForm("datetime", dayjs(value).toISOString())
                          }
                        />
                      </LocalizationProvider>
                    </FormControl>
                  </Grid>

                  <Grid item>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={12}>
                        <Button
                          type="button"
                          color="success"
                          variant="outlined"
                          disabled={!formValues.datetime}
                          fullWidth
                          onClick={() => {
                            addToStorage({ ...doctorDetails, ...formValues });
                            setFormAsCompleted(() => true);
                          }}
                        >
                          Book consultation
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </main>
  );
};

Doctors.propTypes = {};

export default Doctors;
