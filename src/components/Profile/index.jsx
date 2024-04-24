import React from "react";
import PropTypes from "prop-types";
import { Grid, Typography } from "@mui/material";
import { useUser } from "../../context/UserContext";

const Profile = (props) => {
  const { user = {} } = useUser();
  return (
    <Grid
      container
      alignItems="center"
      width="80%"
      style={{ margin: "0 auto" }}
    >
      <Grid item>
        <Typography fontSize="2rem" fontWeight={400} textAlign="left">
          Profile
        </Typography>
        <div className="title-highlighter"></div>
        <br />
        <Typography textAlign="left">
          First name: {user.firstName}
          <br />
          Last name: {user.lastName}
          <br />
          Mobile number: {user.phone}
        </Typography>
      </Grid>
    </Grid>
  );
};

Profile.propTypes = {};

export default Profile;
