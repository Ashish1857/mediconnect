import React, { useState, useContext } from 'react';
import { Grid, Card, CardContent, Typography, TextField, Button, Box } from '@mui/material';
import { useCart } from './CartContext';
import BackButton from './BackButton';

const PaymentPage = () => {
    const { cartItems } = useCart();
    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

    // State for form fields
    const [cardHolder, setCardHolder] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Payment Submitted!');
    };

    return (
        <Box sx={{ margin: '20px' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Cart Summary</Typography>
            <Box sx={{ mb: 2 }}>
                {cartItems.map(item => (
                    <Typography key={item.id}>{`${item.name} - Quantity: ${item.quantity}`}</Typography>
                ))}
                <Typography>Total: ${totalPrice}</Typography>
            </Box>

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
    );
};

export default PaymentPage;


