import React from "react";
import PropTypes from "prop-types";
import {
  Autocomplete,
  ButtonBase,
  Card,
  CardContent,
  Grid,
  TextField,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const ConsultationAndReportsLayout = (props) => {
  const navigate = useNavigate();
  return (
    <Grid container>
      <Grid item xs={12}>
        <Autocomplete
          disablePortal
          fullWidth
          id="combo-box-demo"
          options={props.searchOptions}
          onChange={(_, value) => props.onSearchChange(value)}
          renderInput={(params) => (
            <TextField {...params} label="Search your ailment" />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <Grid
          container
          spacing={2}
          marginY={2}
          justifyContent="center"
          className="linkcontent"
        >
          {props.topOptions.map(({ name, id }) => (
            <Grid item key={name} xs={12} md={3}>
              <Card>
                <ButtonBase
                  onClick={() => navigate(`/${props.optionCardKey}/${id}`)}
                >
                  <CardContent>{name}</CardContent>
                </ButtonBase>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

ConsultationAndReportsLayout.propTypes = {};

export default ConsultationAndReportsLayout;
