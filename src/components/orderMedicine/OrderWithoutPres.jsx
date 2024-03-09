import React, { useState, useEffect } from 'react';
import { Grid, Card, CardMedia, CardContent, Button, Typography, Autocomplete, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';
import BackButton from './BackButton';

export const OrderWithoutPres = () => {
    const [drugs, setDrugs] = useState([]);
    const [originalDrugs, setOriginalDrugs] = useState([]);
    const { cartItems, addToCart, removeItem, updateQuantity } = useCart();
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        fetch('https://XavierDai.github.io/medicine.json')
            .then(response => response.json())
            .then(data => {
                setDrugs(data);
                setOriginalDrugs(data);
            })
            .catch(error => console.error('Error fetching drugs:', error));
    }, []);

    const clearSearch = () => {
        setInputValue('');
        setDrugs(originalDrugs);
    };

    const performSearch = (value) => {
        if (value) {
            const filteredDrugs = originalDrugs.filter(drug => drug.name.toLowerCase().includes(value.toLowerCase()));
            setDrugs(filteredDrugs);
        } else {
            setDrugs(originalDrugs);
        }
    };

    return (
        <div style={{ width: '80%', margin: 'auto' }}>
            <Grid container justifyContent="center" alignItems="center" style={{ marginBottom: '20px' }}>
                <Grid item xs={12} style={{ display: 'flex', alignItems: 'center' }}>
                    <Autocomplete
                        freeSolo
                        inputValue={inputValue}
                        onInputChange={(event, newInputValue) => {
                            setInputValue(newInputValue);
                            performSearch(newInputValue);
                        }}
                        options={drugs.map((option) => option.name)}
                        renderInput={(params) => (
                            <TextField {...params} label="Search medicine" variant="outlined" fullWidth />
                        )}
                        style={{ flexGrow: 1 }}
                    />
                    <Button onClick={clearSearch} style={{ marginLeft: '10px' }}>Clear search</Button>
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                {drugs.map((drug) => {
                    const inCart = cartItems.find(item => item.id === drug.id);
                    return (
                        <Grid item xs={12} sm={6} md={6} key={drug.id}>
                            <Card sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', overflow: 'hidden' }}>
                                <Link to={`/product?drug=${drug.id}`}>
                                    <CardMedia
                                        component="img"
                                        sx={{ width: 151, flexShrink: 0 }}
                                        image={drug.image_url}
                                        alt={drug.name}
                                    />
                                </Link>
                                <CardContent sx={{
                                    flex: '1',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                }}>
                                    <Typography gutterBottom variant="h5">{drug.name}</Typography>
                                    <Typography variant="body2" color="text.secondary">{drug.description}</Typography>
                                    <Typography variant="body1">${drug.price}</Typography>
                                    <div>
                                        {inCart ? (
                                            <>
                                                <Button size="small" onClick={() => updateQuantity(drug.id, 'decrease')}>-</Button>
                                                <Typography display="inline" sx={{ margin: '0 10px' }}>{inCart.quantity}</Typography>
                                                <Button size="small" onClick={() => updateQuantity(drug.id, 'increase')}>+</Button>
                                                <Button size="small" color="secondary" onClick={() => removeItem(drug.id)} sx={{ marginLeft: '10px' }}>Remove</Button>
                                            </>
                                        ) : (
                                            <Button size="small" color="primary" onClick={() => addToCart(drug.id, 1)}>Add to Cart</Button>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
            <Grid container justifyContent="flex-end" style={{ marginTop: '20px' }}>
                <BackButton />
                <Button component={Link} to="/checkout" variant="contained" color="primary">Check Out</Button>
            </Grid>
        </div>
    );
};
