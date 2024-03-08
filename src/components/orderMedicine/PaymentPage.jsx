import React, { useState, useContext } from 'react';
import { Grid, Card, CardContent, Typography, Paper, TextField, Button, IconButton, Box, styled } from '@mui/material';
import { useCart } from './CartContext';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import BackButton from './BackButton';
import DeleteIcon from '@mui/icons-material/Delete';


const Input = styled('input')({
    display: 'none',
});

const PaymentPage = () => {
    const { cartItems } = useCart();
    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

    // State for form fields
    const [cardHolder, setCardHolder] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');
    const [file, setFile] = useState(null);

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Payment Submitted!');
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
        <div style={{ width: '80%', margin: 'auto', marginTop: '5%' }}>

            <Typography variant="h6" sx={{ mb: 2 }}>1. Upload your Prescription</Typography>
            <Grid item xs={12} md={5}>
                <Typography variant="h6" gutterBottom>
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
                        width: '50%',
                        margin: 'auto'
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

                            <IconButton color="error" onClick={handleFileDelete}>
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    </Box>
                )}
            </Grid>


            <Box sx={{ margin: '20px' }}>
                <Typography variant="h6" sx={{ mb: 2 }}>2. Review your Cart</Typography>
                <Box sx={{ mb: 2 }}>
                    {cartItems.map(item => (
                        <Typography key={item.id}>{`${item.name} - Quantity: ${item.quantity}`}</Typography>
                    ))}
                    <Typography>Total: ${totalPrice}</Typography>
                </Box>



                <Typography variant="h6" sx={{ mb: 2 }}>3. Add payment</Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Cardholder Name"
                                value={cardHolder}
                                onChange={e => setCardHolder(e.target.value)}
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Card Number"
                                value={cardNumber}
                                onChange={e => setCardNumber(e.target.value)}
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <TextField
                                fullWidth
                                label="Expiry Date"
                                value={expiry}
                                onChange={e => setExpiry(e.target.value)}
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <TextField
                                fullWidth
                                label="CVV"
                                value={cvv}
                                onChange={e => setCvv(e.target.value)}
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button type="submit" variant="contained" color="primary">Submit Payment</Button>
                        </Grid>
                    </Grid>
                </form>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <BackButton />
                </Box>
            </Box>
        </div>
    );
};

export default PaymentPage;


