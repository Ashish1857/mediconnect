import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
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
import { Person, Download } from "@mui/icons-material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { getFromStorage, updateStorage } from "./../../utils/localStorage";
import { v4 as uuid } from "uuid";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { cloneDeep } from "lodash";
import dayjs from "dayjs";
import { PDFDownloadLink } from "@react-pdf/renderer";
import DownloadFile from "./DownloadFile";

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
      <Grid
        container
        alignItems="center"
        height="80vh"
        width="80%"
        style={{ margin: "0 auto" }}
      >
        <Grid
          container
          direction="column"
          rowSpacing={4}
          justifyContent="center"
        >
          <Grid item>
            <FontAwesomeIcon size="5x" color="green" icon={faCircleCheck} />
          </Grid>
          <Grid item>
            <header>
              <Typography fontSize="2rem">
                Your Consultation is Successfully Booked!
              </Typography>
              <Typography fontSize="1rem" color="GrayText">
                If you need to change your appointment time, please contact our
                support team.
              </Typography>
            </header>
          </Grid>
          <Grid item>
            <main>
              <Card>
                <CardContent>
                  <Typography>Hospital: {doctorDetails.hospital}</Typography>
                  <Typography>Doctor: {doctorDetails.name}</Typography>
                  <Typography>Rating: {doctorDetails.rating}</Typography>
                  <Typography>
                    Date and time: {dayjs(formValues.datetime).format("llll")}
                  </Typography>
                  <Typography>
                    Consultation ID: {formValues.bookingId}
                  </Typography>
                </CardContent>
              </Card>
              <br />
              <br />
              <PDFDownloadLink
                document={<DownloadFile />}
                fileName={`${formValues.bookingId}-consultation-confirmations.pdf`}
              >
                {({ blob, url, loading, error }) => {
                  console.log({ loading });
                  return loading ? (
                    <Button
                      variant="contained"
                      startIcon={<Download />}
                      disabled
                      sx={{ marginRight: "1rem" }}
                    >
                      Loading...
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      startIcon={<Download />}
                      sx={{ marginRight: "1rem" }}
                    >
                      Download confirmation receipt
                    </Button>
                  );
                }}
              </PDFDownloadLink>
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
        width="80%"
        style={{ margin: "0 auto", padding: "1rem 0" }}
      >
        <Grid item xs={12}>
          <Grid item xs={12}>
            <Grid container>
              <Card sx={{ width: "100%" }}>
                <CardContent sx={{ display: "flex" }}>
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
                  <Grid
                    item
                    xs={9}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <Typography variant="body1" align="left">
                      Name: Dr. {doctorDetails.name}
                      <br />
                      Doctor ID: {doctorDetails.id}
                      <br />
                      Rating: {doctorDetails.rating}
                      <br />
                      Speciality: {doctorDetails.speciality}
                      <br />
                      Visiting hospital: {doctorDetails.hospital}
                    </Typography>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Grid item xs={12} style={{ margin: "1.5rem 0" }}>
            <div style={{ background: "#05B8A3", padding: "1rem" }}>
              <Typography fontSize="2rem" color="#033759">
                {"Select date and time for your consultation".toUpperCase()}
              </Typography>
              <Typography fontSize="1rem" color="#fff">
                Pick the perfect time for your health consultation with Dr.{" "}
                {doctorDetails.name}, and let us take care of the rest.
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12}>
            <Grid container xs={12}>
              <Grid item xs={4}>
                <Card>
                  <CardContent>
                    <Typography fontSize="1.25rem">Patient details</Typography>
                    <br />
                    <Typography fontSize="1rem">
                      Patient name: Dummy patient
                      <br />
                      Phone number: +1-(XXX)-XXX-XXXX
                      <br />
                      Email: xyz@abcd.com
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={8}>
                <Grid
                  container
                  rowSpacing={2}
                  marginTop={2}
                  marginBottom={2}
                  paddingLeft={2}
                >
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                          disablePast
                          label="Select a date and time of your choice"
                          onChange={(value) =>
                            updateForm(
                              "datetime",
                              dayjs(value).toISOString() || null
                            )
                          }
                          slotProps={{
                            actionBar: {
                              actions: ["clear", "accept"],
                            },
                          }}
                        />
                      </LocalizationProvider>
                    </FormControl>
                  </Grid>

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
    </main>
  );
};

Doctors.propTypes = {};

export default Doctors;
