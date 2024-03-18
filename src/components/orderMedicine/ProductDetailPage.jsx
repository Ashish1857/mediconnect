import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Grid, Card, CardMedia, CardContent, Button, Typography, Autocomplete, TextField } from '@mui/material';
import BackButton from './BackButton';
import { useCart } from './CartContext';

const ProductDetailPage = () => {
    const { cartItems, addToCart, removeItem, updateQuantity } = useCart();
    const location = useLocation();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const [drugs, setDrugs] = useState([]);
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const drugId = queryParams.get('drug');
        const fetchProductData = async () => {
            try {
                const response = await fetch('https://XavierDai.github.io/medicine.json');
                const data = await response.json();
                const matchingProduct = data.find(product => product.id.toString() === drugId);
                setDrugs(matchingProduct);
            } catch (error) {
                console.error('Failed to fetch product data:', error);
            }
        };
        fetchProductData();
    }, [location]);

    const handleAddToCart = () => {
        addToCart(product.id, quantity);
    };

    const handleQuantityChange = (type) => {
        if (type === 'increase') {
            setQuantity(quantity + 1);
        } else if (type === 'decrease' && quantity > 1) {
            setQuantity(quantity - 1);
        }
    };


    const inCart = cartItems.find(item => item.id === drugs.id);
    return (
        <div style={{ width: '80%', margin: 'auto' }}>
        <Grid item xs={12} sm={6} md={6} key={drugs.id}>

   
                    <CardMedia
                        component="img"
                        sx={{ width: '25%', flexShrink: 0 }}
                        image={drugs.image_url}
                        alt={drugs.name}
                    />
       
                <CardContent sx={{
                    flex: '1',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                }}>
                    <Typography gutterBottom variant="h5">{drugs.name}</Typography>
                    <Typography variant="body2" color="text.secondary">{drugs.description}</Typography>
                    <Typography variant="body1">${drugs.price}</Typography>
                    <div>
                        {inCart ? (
                            <>
                                <Button size="small" onClick={() => updateQuantity(drugs.id, 'decrease')}>-</Button>
                                <Typography display="inline" sx={{ margin: '0 10px' }}>{inCart.quantity}</Typography>
                                <Button size="small" onClick={() => updateQuantity(drugs.id, 'increase')}>+</Button>
                                <Button size="small" color="secondary" onClick={() => removeItem(drugs.id)} sx={{ marginLeft: '10px' }}>Remove</Button>
                            </>
                        ) : (
                            <Button size="small" color="primary" onClick={() => addToCart(drugs.id, 1)}>Add to Cart</Button>
                        )}
                    </div>
                </CardContent>
                <BackButton />
        </Grid>






        </div>
    );
};

export default ProductDetailPage;
