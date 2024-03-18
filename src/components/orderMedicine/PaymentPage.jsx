import React, { useState } from 'react';
import { Box, Grid, Typography, TextField, Button, IconButton, Paper, Divider, styled } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart } from './CartContext';

const Input = styled('input')({
    display: 'none',
});

const CheckoutPage = () => {
    const { cartItems } = useCart();
    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const tax = (totalPrice * 0.1).toFixed(2);
    const shippingCost = 5.00; // Flat shipping cost
    const discount = 0; // Assuming no discounts applied
    const finalTotal = (parseFloat(totalPrice) + parseFloat(tax) + shippingCost - discount).toFixed(2);

    const [file, setFile] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [addressLine1, setAddressLine1] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [country, setCountry] = useState('');

    const [cardHolder, setCardHolder] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleFileDelete = () => {
        setFile(null);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        alert('Payment information and address submitted.');
    };

    return (
        <div style={{ width: '80%', margin: 'auto', marginTop: '20px' }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={7} sx={{ paddingRight: '20px' }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'rgb(23, 55, 84)', textAlign: 'left' }}>Your Address</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth label="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} size="small" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth label="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} size="small" />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField fullWidth label="Address Line 1" value={addressLine1} onChange={(e) => setAddressLine1(e.target.value)} size="small" />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField fullWidth label="Address Line 2" value={addressLine2} onChange={(e) => setAddressLine2(e.target.value)} size="small" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth label="City" value={city} onChange={(e) => setCity(e.target.value)} size="small" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth label="State/Province/Region" value={state} onChange={(e) => setState(e.target.value)} size="small" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth label="ZIP / Postal Code" value={zipCode} onChange={(e) => setZipCode(e.target.value)} size="small" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth label="Country" value={country} onChange={(e) => setCountry(e.target.value)} size="small" sx={{ mb: 2 }} />
                        </Grid>
                    </Grid>

                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'rgb(23, 55, 84)', textAlign: 'left' }}>Upload your Prescription</Typography>
                    <Paper variant="outlined" sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '20px',
                        minHeight: '150px',
                        backgroundColor: '#f5f5f5',
                        cursor: 'pointer',
                        '&:hover': { backgroundColor: '#e8e8e8' },
                        marginTop: '20px',
                    }} onClick={() => document.getElementById('file-upload').click()}>
                        <CloudUploadIcon sx={{ fontSize: 60, mb: 2 }} />
                        <Typography>Drag and drop or click to upload</Typography>
                        <Input accept=".pdf" id="file-upload" type="file" onChange={handleFileChange} />
                    </Paper>
                    {file && (
                        <Box sx={{ mt: 2, textAlign: 'left' }}>
                            <Typography variant="body1">{file.name}</Typography>
                            <IconButton color="error" onClick={handleFileDelete}><DeleteIcon /></IconButton>
                        </Box>
                    )}
                </Grid>

                <Grid item xs={12} md={5} sx={{ borderLeft: 1, borderColor: 'divider', pl: 4 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'rgb(23, 55, 84)', textAlign: 'left' }}>Review Your Cart</Typography>
                    {cartItems.map((item, index) => (
                        <Typography key={index} sx={{ textAlign: 'left' }}>{`${item.name} - Quantity: ${item.quantity}`}</Typography>
                    ))}
                    <Divider sx={{ my: 2 }} />

                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'rgb(23, 55, 84)', textAlign: 'left' }}>Add Payment</Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <TextField fullWidth label="Cardholder Name" value={cardHolder} onChange={(e) => setCardHolder(e.target.value)} size="small" />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField fullWidth label="Card Number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} size="small" />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth label="Expiry Date" value={expiry} onChange={(e) => setExpiry(e.target.value)} size="small" />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth label="CVV" value={cvv} onChange={(e) => setCvv(e.target.value)} size="small" />
                            </Grid>
                        </Grid>
                        
                    </Box>

                    <Divider sx={{ my: 2 }} />
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'rgb(23, 55, 84)', textAlign: 'left' }}>Cart Breakdown</Typography>
                    <Typography sx={{ textAlign: 'left' }}>Total: ${totalPrice.toFixed(2)}</Typography>
                    <Typography sx={{ textAlign: 'left' }}>Tax: ${tax}</Typography>
                    <Typography sx={{ textAlign: 'left' }}>Shipping: ${shippingCost.toFixed(2)}</Typography>
                    <Typography sx={{ textAlign: 'left' }}>Discount: -${discount.toFixed(2)}</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'left' }}>Final Total: ${finalTotal}</Typography>
                    <Button type="submit" variant="contained" color="primary" sx={{ mt: 2, mb: 2 }}>
                        Submit Payment
                    </Button>
                </Grid >
            </Grid >
        </div >
    );
};

export default CheckoutPage;
