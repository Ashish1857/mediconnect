import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Grid, CardMedia, CardContent, Button, Typography } from '@mui/material';
import BackButton from './BackButton';
import { useCart } from './CartContext';

const ProductDetailPage = () => {
    const { cartItems, addToCart, removeItem, updateQuantity } = useCart();
    const location = useLocation();


  const [drugs, setDrugs] = useState([]);
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const drugId = queryParams.get("drug");
    const fetchProductData = async () => {
      try {
        const response = await fetch(
          "https://XavierDai.github.io/medicine.json"
        );
        const data = await response.json();
        const matchingProduct = data.find(
          (product) => product.id.toString() === drugId
        );
        setDrugs(matchingProduct);
      } catch (error) {
        console.error("Failed to fetch product data:", error);
      }
    };
    fetchProductData();
  }, [location]);


    const inCart = cartItems.find(item => item.id === drugs.id);
    return (
        <div style={{ width: '80%', margin: 'auto' }}>
             <Grid container spacing={2}>

             <Grid item xs={12} sm={4}>
                <CardMedia
                    component="img"
                    sx={{ width: '100%', flexShrink: 0 }}
                    image={drugs.image_url}
                    alt={drugs.name}
                />
                </Grid>
                <Grid item xs={12} sm={8}>
                <CardContent sx={{
                    flex: '1',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                }}>
                    <Typography gutterBottom variant="h5" sx={{ mb:'4vh'}}>{drugs.name}</Typography>
                    <Typography variant="body2" color="text.secondary"  sx={{ mb:'1vh'}}>{drugs.description}</Typography>
                    <Typography variant="body1"  sx={{ mb:'1vh'}}>${drugs.price}</Typography>
                    <div>
                        {inCart ? (
                            <>
                                <Button size="small" onClick={() => updateQuantity(drugs.id, 'decrease')} sx={{ minWidth: '30px'}}>-</Button>
                                <Typography display="inline" sx={{ margin: '0 10px' }}>{inCart.quantity}</Typography>
                                <Button size="small" onClick={() => updateQuantity(drugs.id, 'increase')} sx={{ minWidth: '30px' }}>+</Button>
                                <Button size="small" color="secondary" onClick={() => removeItem(drugs.id)} sx={{ marginLeft: '10px' }}>Remove</Button>
                            </>
                        ) : (
                            <Button size="small" color="primary" onClick={() => addToCart(drugs.id, 1)}>Add to Cart</Button>
                        )}
                    </div>
                </CardContent>
                
                </Grid>
            </Grid>
            <BackButton />





        </div>
    );
};

export default ProductDetailPage;
