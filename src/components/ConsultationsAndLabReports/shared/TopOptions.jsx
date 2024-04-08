import React from "react";
import PropTypes from "prop-types";
import {
  Avatar,
  ButtonBase,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Person, Vaccines } from "@mui/icons-material";

const TopOptions = (props) => {
  const navigate = useNavigate();

  return (
    <Grid container>
      <Grid
        container
        marginTop={4}
        justifyContent="center"
        style={{
          background: "#05B8A3",
          padding: "1rem",
          color: "#000",        
        }}
      >
        <Grid item>
          <Typography fontSize="1.5rem">
            {props.isLabtestUI
              ? "Popular lab tests".toUpperCase()
              : "Our top doctors".toUpperCase()}
          </Typography>
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
          {props.topOptions.map(
            ({ name, id, speciality, hospital, rating }) => {
              if (props.isLabtestUI) {
                return (
                  <>
                    <Grid item key={name} xs={12} md={6}>
                      <Card>
                        <ButtonBase
                          sx={{ width: "100%", minHeight: "75px" }}
                          onClick={() =>
                            navigate(`/${props.optionCardKey}/${id}`)
                          }
                        >
                          <CardContent sx={{ display: "flex", width: "100%" }}>
                            <Grid
                              item
                              ms={3}
                              justifyContent="center"
                              alignItems="center"
                            >
                              <Avatar sx={{ bgcolor: "#05B8A3" }}>
                                <Vaccines />
                              </Avatar>
                            </Grid>
                            <Grid
                              item
                              md={9}
                              justifyContent="center"
                              textAlign="center"
                              alignItems="center"
                              sx={{ padding: "0.5rem" }}
                            >
                              <Typography variant="body1" align="left">
                                Test name: {name}
                              </Typography>
                            </Grid>
                          </CardContent>
                        </ButtonBase>
                      </Card>
                    </Grid>
                  </>
                );
              }
              return (
                <Grid item key={name} xs={12} md={6}>
                  <Card>
                    <ButtonBase
                      sx={{
                        display: "block",
                        width: "100%",
                        minHeight: "150px",
                      }}
                      onClick={() => navigate(`/${props.optionCardKey}/${id}`)}
                    >
                      <CardContent sx={{ padding: "0 !important" }}>
                        <Grid container spacing={1}>
                          <Grid
                            item
                            xs={3}
                            justifyContent="center"
                            alignItems="center"
                            display="flex"
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
                                  Rating: {rating}
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
              );
            }
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

TopOptions.propTypes = {};

export default TopOptions;
