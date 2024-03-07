import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Grid, Button } from '@mui/material';
import BackButton from './BackButton';
import { useCart } from './CartContext'; // Ensure this path matches your project structure

// Import statements remain the same

const ProductDetailPage = () => {
    const { addToCart, removeItem, cartItems } = useCart();
    const location = useLocation();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const drugId = queryParams.get('drug');
        const fetchProductData = async () => {
            try {
                const response = await fetch('https://XavierDai.github.io/medicine.json');
                const data = await response.json();
                const matchingProduct = data.find(product => product.id.toString() === drugId);
                setProduct(matchingProduct);
            } catch (error) {
                console.error('Failed to fetch product data:', error);
            }
        };
        fetchProductData();
    }, [location]);

    // Determines if the product is in the cart
    const isInCart = product && cartItems.some(item => item.id === product.id);

    if (!product) return <div>Loading...</div>;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', margin: '20px' }}>
    <div style={{ display: 'flex', marginBottom: '20px' }}>
        <div style={{ flex: 3 }}>
            <img src={product.image_url} alt={product.name} style={{ width: '100%' }} />
        </div>
        <div style={{ flex: 7, paddingLeft: '20px' }}>
            <h2 style={{ textAlign: 'left' }}>{product.name}</h2>
            <p style={{ textAlign: 'left' }}>{product.description}</p>
            <p style={{ textAlign: 'left' }}>Price: ${product.price}</p>
            <p style={{ textAlign: 'left' }}>Stock: {product.stock}</p>
            {!isInCart ? (
                <Button color="primary" onClick={() => addToCart(product.id)}  >
                    Add to Cart
                </Button>
            ) : (
                <Button color="secondary" onClick={() => removeItem(product.id)}>
                    Remove from Cart
                </Button>
            )}
        </div>
    </div>
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <BackButton />
    </div>
</div>

    );
};

export default ProductDetailPage;
