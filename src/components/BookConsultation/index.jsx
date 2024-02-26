import React, { useState } from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import {
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  FormHelperText,
  Grid,
  Button,
  TextField,
  Box,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { getFromStorage, updateStorage } from "../../utils/localStorage";
import { cloneDeep } from "lodash";
import { v4 as uuid } from "uuid";

/**
 * 1. What is you ailment?
 * 2. when is the consultation needed?
 * A. These are options you take if need consultation asap B. These are options that you take when you need one for later
 * A.3. Select the hospital                                B.3. Select the date and time
 * A.4. Select the doctor                                  B.4. Select the hospital
 * A.5. Finished show the consultation confirmation details B.5. Select the doctor from the available ones
 *                                                         B.6. Finished show the consultation confirmation details
 */

const ailments = {
  "Stomach issues": "stomach",
  "Throat issues": "throat",
  "Muscle pain": "muscle-pain",
  Heartache: "heartache",
  Other: "other",
};

const BookConsultation = () => {
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

  const [isFormComplete, setFormAsCompleted] = useState(false);

  if (isFormComplete) {
    return (
      <div>
        <FontAwesomeIcon size="5x" color="green" icon={faCircleCheck} />
        <Typography variant="h4">Consultation booked</Typography>
        <Box>
          <Typography>Hospital: {formValues.hospital}</Typography>
          <Typography>Doctor: {formValues.doctor}</Typography>
          <Typography>Date and time: {formValues.datetime}</Typography>
          <Typography>Consultation ID: {formValues.bookingId}</Typography>
        </Box>
        <Link to="/">
          <Button variant="contained">Go to home</Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Typography variant="h4">Book a consultation</Typography>
      <Grid
        container
        direction="column"
        rowSpacing={2}
        marginTop={2}
        marginBottom={2}
      >
        <Grid item>
          <FormControl fullWidth>
            <InputLabel htmlFor="ailment">What is your ailment?</InputLabel>
            <Select
              labelId="ailment"
              onChange={(event) => {
                if (event.target.value !== "other") {
                  updateForm("otherAilment", "");
                }
                updateForm("ailment", event.target.value);
              }}
              label="Book a consultation"
              aria-describedby="ailmenthelp"
            >
              {Object.entries(ailments).map(([name, value]) => (
                <MenuItem value={value} key={name + value}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormHelperText id="ailmenthelp">
            If you do not find your ailment please select other from the
            options.
          </FormHelperText>
        </Grid>
        {formValues.ailment === "other" && (
          <Grid item>
            <TextField
              fullWidth
              label="Please describe your issue in a few words"
              aria-describedby="otherissue"
              disabled={!formValues.ailment}
              onChange={(event) =>
                updateForm("otherAilment", event.target.value)
              }
            ></TextField>
          </Grid>
        )}

        <Grid item>
          <FormControl fullWidth>
            <InputLabel htmlFor="bookwhen">
              For when do you need the consultation?
            </InputLabel>
            <Select
              labelId="bookwhen"
              onChange={(event) => {
                if (event.target.value === "asap") {
                  updateForm("datetime", null);
                }
                updateForm("bookwhen", event.target.value);
              }}
              label="For when do you need the consultation?"
              disabled={
                formValues.ailment === "other"
                  ? !formValues.otherAilment
                  : !formValues.ailment
              }
            >
              <MenuItem value="asap">Book now</MenuItem>
              <MenuItem value="later">Book for later</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {formValues.bookwhen === "later" && (
          <Grid item>
            <FormControl fullWidth>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  disablePast
                  disabled={!formValues.bookwhen}
                  label="Select a date and time of your choice"
                  onChange={(value) => updateForm("datetime", value)}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>
        )}

        <Grid item>
          <FormControl fullWidth>
            <InputLabel htmlFor="hospital">
              Select the hospital
            </InputLabel>
            <Select
              labelId="hospital"
              onChange={(event) => updateForm("hospital", event.target.value)}
              label="Select from the available hospitals"
              disabled={
                formValues.bookwhen === "later"
                  ? !formValues.datetime
                  : !formValues.bookwhen
              }
            >
              <MenuItem value="hospital1">Hospital 1</MenuItem>
              <MenuItem value="hospital2">Hospital 2</MenuItem>
              <MenuItem value="hospital3">Hospital 3</MenuItem>
              <MenuItem value="hospital4">Hospital 4</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Button
                type="button"
                color="success"
                variant="contained"
                disabled={!formValues.hospital}
                fullWidth
                onClick={() => {
                  addToStorage(formValues);
                  setFormAsCompleted(() => true);
                }}
              >
                Book consultation
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Link to="/">
                <Button
                  type="button"
                  color="error"
                  variant="contained"
                  fullWidth
                >
                  Cancel
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

BookConsultation.propTypes = {};

export default BookConsultation;
