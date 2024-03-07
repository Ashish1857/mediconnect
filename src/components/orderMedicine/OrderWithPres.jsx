import React, { useState, useContext } from 'react';
import { Container, Grid, Typography, Button, TextField, Box, Paper, IconButton, styled } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import BackButton from './BackButton';

const Input = styled('input')({
  display: 'none',
});

export function OrderWithPres() {

  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [prescriptionNumber, setPrescriptionNumber] = useState('');
  const [name, setName] = useState('');
  const [file, setFile] = useState(null);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // Existing form handling logic

    try {
      const response = await fetch('https://XavierDai.github.io/prescriptions.json');
      const prescriptions = await response.json();
      const prescription = prescriptions.find(p => p.prescription_no === prescriptionNumber);

      if (prescription) {

        prescription.content.forEach(id => {

          console.log(id);
          addToCart(id);


        });
        navigate('/checkout');
      } else {
        console.log('Prescription not found');
      }
    } catch (error) {
      console.error('Failed to fetch prescription data:', error);
    }
  };




  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };

  const handleFileDelete = () => {
    setFile(null);
    document.getElementById('file-upload').value = ''; // Reset file input
  };

  return (
    <Container maxWidth="lg" sx={{
      height: 'calc(100vh - 90px)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      mt: '10vh',
    }}>
      <Typography variant="h5" component="h5" gutterBottom align="center" sx={{ mb: 4 }}>
        Please upload your prescription:
      </Typography>

      <Grid container spacing={3} justifyContent="center" alignItems="flex-start">
        {/* 左边部分 - 处方信息 */}
        <Grid item xs={12} md={5}>
          <Typography variant="h6" gutterBottom>
            Enter information
          </Typography>
          <Box mb={2}>
            <Typography variant="body1" gutterBottom align="left">
              Prescription No.
            </Typography>
            <TextField
              fullWidth
              label="Pescription No."
              variant="outlined"
              value={prescriptionNumber}
              onChange={(e) => setPrescriptionNumber(e.target.value)}
              margin="small"
            />
          </Box>
          <form onSubmit={handleFormSubmit}>
            <Box mb={2}>
              <Typography variant="body1" gutterBottom align="left">
                Name
              </Typography>
              <TextField
                fullWidth
                label="Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                margin="small"
              />
            </Box>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </form>
        </Grid>

        <Grid item xs={1}>
          <Typography variant="h5" align="center">
            or
          </Typography>
        </Grid>


        <Grid item xs={12} md={5}>
          <Typography variant="h6" gutterBottom>
            Upload document
          </Typography>
          <Paper
            variant="outlined"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
              minHeight: '150px',
              backgroundColor: '#f5f5f5',
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: '#e8e8e8',
              },
              marginTop: '20px',
            }}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => document.getElementById('file-upload').click()}
          >
            <CloudUploadIcon sx={{ fontSize: 60, mb: 2 }} />
            <Typography>Drag docs here or click here to upload</Typography>
          </Paper>
          <Input
            accept=".pdf"
            id="file-upload"
            multiple
            type="file"
            onChange={handleFileChange}
          />
          {file && (
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Typography variant="body1">{file.name}</Typography>
              <Box sx={{ mt: 2 }}>
                <Button variant="contained" color="primary" onClick={handleFormSubmit} sx={{ mr: 2 }}>
                  Submit
                </Button>
                <IconButton color="error" onClick={handleFileDelete}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          )}
        </Grid>
      </Grid>
      <Grid container justifyContent="flex-end">
                <BackButton />
                

            </Grid>

    </Container>
  );
}
