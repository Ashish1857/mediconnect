import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Autocomplete,
  Avatar,
  Box,
  ButtonBase,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Person } from "@mui/icons-material";

const ConsultationAndReportsLayout = (props) => {
  const [searchType, setSearchType] = useState(null);
  const handleSelectSearchType = (type) => {
    // const ailments = ["Ailment", "Speciality", "Name"];
    if (type === "speciality" || type === "ailment") {
      setSearchType(() => "speciality");
    } else if (type === "hospital name") {
      setSearchType(() => "hospital");
    } else {
      setSearchType(() => "name");
    }
  };
  const navigate = useNavigate();
  return (
    <main>
      <Grid container alignContent="center">
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item md={6}>
              <Autocomplete
                disablePortal
                options={props.searchOptions}
                onChange={(_, value) => {
                  if (!value) {
                    setSearchType(false);
                  } else {
                    handleSelectSearchType(value.toLowerCase());
                  }
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Search by" />
                )}
              />
            </Grid>
            <Grid item md={6}>
              <Autocomplete
                disablePortal
                options={props.doctorSearchOptions}
                disabled={!searchType}
                noOptionsText="Try a different search"
                onChange={(_, value) => {
                  props.onSearchChange(value);
                }}
                getOptionLabel={(option) => option.name}
                renderOption={(_, option) => {
                  return (
                    <Grid item key={option.name} xs={12}>
                      <Box
                        sx={{
                          borderRadius: "8px",
                          margin: "5px",
                          padding: "8px",
                        }}
                        component="li"
                        {...props}
                      >
                        <ButtonBase
                          sx={{ display: "block", width: "100%" }}
                          onClick={() =>
                            navigate(`/${props.optionCardKey}/${option.id}`)
                          }
                        >
                          <Grid container spacing={1}>
                            <Grid
                              item
                              xs={2}
                              justifyContent="center"
                              alignItems="center"
                            >
                              <Avatar sx={{ bgcolor: "#05B8A3" }}>
                                <Person />
                              </Avatar>
                            </Grid>
                            <Grid item xs={10} justifyContent="flex-start">
                              <Grid container>
                                <Grid item justifyContent="flex-start">
                                  <Typography variant="body1" align="left">
                                    Name: Dr. {option.name}
                                  </Typography>
                                  <Typography variant="body1" align="left">
                                    Doctor ID: {option.id}
                                  </Typography>
                                  <Typography variant="body1" align="left">
                                    Speciality: {option.speciality}
                                  </Typography>
                                  <Typography variant="body1" align="left">
                                    Visiting hospital: {option.hospital}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </ButtonBase>
                      </Box>
                    </Grid>
                  );
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Search" />
                )}
                filterOptions={(options, state) => {
                  const displayOptions = options.filter((option) =>
                    option[searchType]
                      .toLowerCase()
                      .trim()
                      .includes(state.inputValue.toLowerCase().trim())
                  );

                  return displayOptions;
                }}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid container marginTop={4} justifyContent="center">
          <Grid item>
            <Typography fontSize="1.5rem">Our top doctors</Typography>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid
            container
            spacing={2}
            marginY={2}
            justifyContent="center"
            className="linkcontent"
          >
            {props.topOptions.map(({ name, id, speciality, hospital }) => (
              <Grid item key={name} xs={12} md={3}>
                <Card>
                  <ButtonBase
                    sx={{ display: "block", width: "100%" }}
                    onClick={() => navigate(`/${props.optionCardKey}/${id}`)}
                  >
                    <CardContent>
                      <Grid container spacing={1}>
                        <Grid
                          item
                          xs={3}
                          justifyContent="center"
                          alignItems="center"
                        >
                          <Avatar sx={{ bgcolor: "#05B8A3" }}>
                            <Person />
                          </Avatar>
                        </Grid>
                        <Grid item xs={9}>
                          <Grid container>
                            <Grid item justifyContent="flex-start">
                              <Typography variant="body1" align="left">
                                Name: Dr. {name}
                              </Typography>
                              <Typography variant="body1" align="left">
                                Doctor ID: {id}
                              </Typography>
                              <Typography variant="body1" align="left">
                                Speciality: {speciality}
                              </Typography>
                              <Typography variant="body1" align="left">
                                Visiting hospital: {hospital}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </ButtonBase>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </main>
  );
};

ConsultationAndReportsLayout.propTypes = {};

export default ConsultationAndReportsLayout;
