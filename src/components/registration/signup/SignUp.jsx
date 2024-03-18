import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { styled } from "@mui/system";
import "./SignUp.css";
import { signUpUser } from "../../../utils/api";

const Input = styled("input")({
  display: "none",
});

const ImageUploadContainer = styled("div")(({ theme, hasImage }) => ({
  height: "200px",
  width: "200px",
  border: "1px dashed gray",
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "10px auto", // Centers the div
  "&:hover $hoverOverlay": {
    display: "flex",
  },
  "& $hoverOverlay": {
    display: hasImage ? "none" : "flex",
  },
}));

const HoverOverlay = styled("div")({
  position: "absolute",
  top: 0,
  left: 0,
  height: "100%",
  width: "100%",
  display: "none",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "rgba(255, 255, 255, 0.7)",
  zIndex: 1,
  transition: "display 0.3s ease",
});

const SignUpForm = ({ mobileNumber }) => {
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    age: "",
    height: "",
    weight: "",
    bloodGroup: "",
    profileImage: null,
  });

  const [hovering, setHovering] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setUserDetails((prevDetails) => ({
        ...prevDetails,
        profileImage: URL.createObjectURL(img),
      }));
    }
  };

  const handleSignUp = () => {
    const user = {
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      mobile: mobileNumber,
      age: userDetails.age,
      height: userDetails.height,
      weight: userDetails.weight,
      bloodGroup: userDetails.bloodGroup,
      profileImage: null,
    };
    // Do sign up (e.g., send data to an API)
    console.log("Signed up user:", user);
    signUpUser(user).then((user) => {
      if (user?._id) {
        localStorage.setItem("mobileNumber", mobileNumber);
      }
      setTimeout(() => window.location.reload());
    });
    // Close modal and set user as logged in
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignUp(userDetails);
  };

  useEffect(() => {
    Boolean(userDetails.profileImage);
  });

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      autoComplete="off"
      sx={{ width: "100%" }}
      className="signup-form"
    >
      <ImageUploadContainer
        hasImage={Boolean(userDetails.profileImage)}
        onMouseEnter={() => {
          setHovering(true);
        }}
        onMouseLeave={() => {
          setHovering(false);
        }}
      >
        {userDetails.profileImage && (
          <img
            src={userDetails.profileImage}
            alt="Profile"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        )}
        {/* Overlay that appears on hover or when there is no image */}
        {(!userDetails.profileImage ||
          (hovering && userDetails.profileImage)) && (
          <HoverOverlay className="hoverOverlay" style={{ display: "flex" }}>
            <Typography variant="body1" color="textSecondary">
              Upload your photo
            </Typography>
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <PhotoCamera />
            </IconButton>
          </HoverOverlay>
        )}
        <Input
          accept="image/*"
          id="icon-button-file"
          type="file"
          onChange={handleImageChange}
        />
        <label htmlFor="icon-button-file">
          {/* Invisible button to trigger file input */}
          <Button
            component="span"
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              width: "100%",
              zIndex: 2,
            }}
          />
        </label>
      </ImageUploadContainer>
      <TextField
        label="First Name"
        name="firstName"
        value={userDetails.firstName}
        onChange={handleChange}
        variant="outlined"
        margin="normal"
        sx={{ marginY: 1 }}
        fullWidth
        required
      />
      <TextField
        label="Last Name"
        name="lastName"
        value={userDetails.lastName}
        onChange={handleChange}
        variant="outlined"
        margin="normal"
        sx={{ marginY: 1 }}
        fullWidth
        required
      />
      <TextField
        label="Mobile Number"
        name="mobile"
        value={mobileNumber}
        variant="outlined"
        margin="normal"
        fullWidth
        sx={{ marginTop: 2 }}
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        label="Email"
        name="email"
        value={userDetails.email}
        variant="outlined"
        margin="normal"
        fullWidth
        sx={{ marginTop: 2 }}
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        label="Age"
        name="age"
        value={userDetails.age}
        onChange={handleChange}
        type="number"
        variant="outlined"
        margin="normal"
        fullWidth
        required
      />
      <TextField
        label="Height"
        name="height"
        value={userDetails.height}
        onChange={handleChange}
        variant="outlined"
        margin="normal"
        fullWidth
        required
        placeholder={"Height (cm)"}
      />
      <TextField
        label="Weight"
        name="weight"
        value={userDetails.weight}
        onChange={handleChange}
        variant="outlined"
        margin="normal"
        fullWidth
        required
        placeholder="Weight (Kg)"
      />
      <FormControl variant="outlined" margin="normal" fullWidth>
        <InputLabel>Blood Group</InputLabel>
        <Select
          name="bloodGroup"
          value={userDetails.bloodGroup}
          onChange={handleChange}
          label="Blood Group"
          required
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {["A+", "A-", "B+", "B-", "AB+", "AB-", "O-", "O+"].map(
            (bloodGroup) => (
              <MenuItem key={bloodGroup} value={bloodGroup}>
                {bloodGroup}
              </MenuItem>
            )
          )}
          <MenuItem value="A+">A+</MenuItem>
          <MenuItem value="A-">A-</MenuItem>
        </Select>
      </FormControl>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        style={{ marginTop: "16px" }}
        sx={{ marginY: 2 }}
      >
        Sign Up
      </Button>
    </form>
  );
};

export default SignUpForm;
