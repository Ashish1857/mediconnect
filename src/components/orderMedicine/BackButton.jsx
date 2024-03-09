import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Button sx={{ marginRight: '10px' }} startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}>
      Back
    </Button>
  );
};

export default BackButton;
