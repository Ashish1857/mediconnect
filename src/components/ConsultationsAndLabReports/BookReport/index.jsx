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
  Typography,
} from "@mui/material";
import { LAB_TESTS } from "../../../utils/constants";
import { Link, useParams } from "react-router-dom";
import { Download, Vaccines } from "@mui/icons-material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { v4 as uuid } from "uuid";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { cloneDeep } from "lodash";
import dayjs from "dayjs";
import { getFromStorage, updateStorage } from "../../../utils/localStorage";
import { PDFDownloadLink } from "@react-pdf/renderer";
import DownloadFile from "../../Doctors/DownloadFile";

const BookReport = (props) => {
  const [formValues, setFormValues] = useState({});
  const updateForm = (key, value) => {
    setFormValues((formValues) => ({
      ...formValues,
      [key]: value,
    }));
  };

  const addToStorage = (value) => {
    const consultations = getFromStorage("reports");
    const consultationsCopy = cloneDeep(consultations) || [];
    const valueCopy = cloneDeep(value);
    valueCopy.bookingId = uuid();
    consultationsCopy.push(valueCopy);
    updateForm("bookingId", valueCopy.bookingId);
    updateStorage(`reports`, consultationsCopy);
  };

  const ALL_DOCTORS = [...LAB_TESTS];
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [testDetails, setTestDetails] = useState({});
  const [isFormComplete, setFormAsCompleted] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setIsLoading(() => true);
      const currentTestDetails = ALL_DOCTORS.find(
        ({ id }) => id === Number(params.reportid)
      );
      setTestDetails(() => currentTestDetails);
      setIsLoading(() => false);
    }

    return () => {
      setTestDetails(() => {});
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
        <Grid container direction="column" rowSpacing={2}>
          <Grid item>
            <FontAwesomeIcon size="5x" color="green" icon={faCircleCheck} />
          </Grid>
          <Grid item>
            <header>
              <Typography sx={{ fontSize: "2rem" }}>Lab test booked</Typography>
            </header>
          </Grid>
          <Grid item alignItems="center">
            <Card>
              <CardContent>
                <main>
                  <Typography>Hospital: {testDetails.hospital}</Typography>
                  <Typography>Test: {testDetails.name}</Typography>
                  <Typography>
                    Date and time:{" "}
                    {dayjs(formValues.datetime).format("llll") || null}
                  </Typography>
                  <Typography>
                    Consultation ID: {formValues.bookingId}
                  </Typography>
                </main>
              </CardContent>
            </Card>
          </Grid>
          <br />
          <br />
          <div>
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
          </div>
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
        // height="80vh"
        width="80%"
        style={{ margin: "0 auto" }}
      >
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Grid container>
                <Grid item xs={3} justifyContent="center" alignItems="center">
                  <Avatar
                    sx={{
                      bgcolor: "#033759",
                      width: "100px",
                      height: "100px",
                      margin: "0 auto",
                    }}
                  >
                    <Vaccines />
                  </Avatar>
                </Grid>
                <Grid
                  item
                  xs={9}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Typography fontSize="1.5rem" align="left" fontWeight={300}>
                    Test name: {testDetails.name}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <div style={{ margin: "1.5rem 0", textAlign: "left" }}>
            <Typography fontSize="2rem">Book your lab test</Typography>
            <Typography fontSize="1rem" color="GrayText">
              Easily manage your health by booking laboratory tests with our
              certified labs—quick, convenient, and reliable
            </Typography>
            <div className="title-highlighter"></div>
          </div>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={4}>
                <Card>
                  <CardContent>
                    <Typography fontSize="1.25rem" fontWeight={400}>
                      Patient details
                    </Typography>
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
                  direction="column"
                  rowSpacing={2}
                  marginTop={2}
                  marginBottom={2}
                  paddingLeft={2}
                >
                  <Grid item>
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
                            addToStorage({ ...testDetails, ...formValues });
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

BookReport.propTypes = {};

export default BookReport;
