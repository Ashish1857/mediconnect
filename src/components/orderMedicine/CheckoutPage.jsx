import React, { useContext } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';
import BackButton from './BackButton';

const CheckoutPage = () => {
  const { cartItems, updateQuantity, removeItem } = useCart();
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div style={{ width: '80%', margin: 'auto', marginTop: '5%' }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'rgb(23, 55, 84)', textAlign: 'left', marginLeft: '0px',marginBottom:'2vh' }}>
        ITEM(S) IN YOUR CART:
      </Typography>
      <div style={{ borderTop: '1px solid #e0e0e0'}}>
      {cartItems.map((item) => (
        <Card key={item.id} sx={{
          display: 'flex',
          marginBottom: '0px',
          marginTop: '0px',
          boxShadow: 'none', // 去除阴影
          borderLeft: 'none', // 去除左边框
          borderRight: 'none', // 去除右边框
          borderBottom: '1px solid #e0e0e0', // 设置下边框为淡灰色
          padding: '16px', // 增加上下左向内的间距
        }}>
          <div style={{ width: 151, height: 151, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Link to={`/product?drug=${item.id}`}>
              <CardMedia
                component="img"
                sx={{ height: 151, width: 'auto', maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                image={item.image_url}
                alt={item.name}
              />
            </Link>
          </div>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, alignItems: 'flex-start' }}>
            <Typography gutterBottom sx={{ fontWeight: 'bold' }} component="div">
              {item.name}
            </Typography>
            <Typography variant="body2" style={{ color: item.stock === 'in_stock' ? 'green' : 'red' }}>
              {item.stock}
            </Typography>
            <Typography variant="body1" sx={{ textAlign: 'left' }}>
              {item.description}
            </Typography>
            <Grid container spacing={2}>
              <Grid item>
                <Button onClick={() => updateQuantity(item.id, 'decrease')}>-</Button>
                <Typography display="inline">{` ${item.quantity} `}</Typography>
                <Button onClick={() => updateQuantity(item.id, 'increase')}>+</Button>
              </Grid>

              <Grid item>
                <Button onClick={() => removeItem(item.id)}>Delete</Button>
              </Grid>
            </Grid>
          </CardContent>
          <Typography sx={{ alignSelf: 'center', marginRight: 2, fontWeight: 'bold' }}>
            ${item.price}
          </Typography>
        </Card>
      ))}
    </div>
      <Grid container justifyContent="flex-end" spacing={2} style={{ marginTop: "20px" }}>
        <Grid item xs={12} style={{ textAlign: "right" }}>
          <Typography variant="h6">Total: ${totalPrice.toFixed(2)}</Typography>
        </Grid>
        <Grid item>
          <BackButton />
        </Grid>
        <Grid item>
          <Button component={Link} to="/medicine" variant="contained" sx={{ bgcolor: 'lightblue', '&:hover': { bgcolor: '#add8e6' } }}>
            Add more
          </Button>
        </Grid>
        <Grid item>
          <Button component={Link} to="/payment" variant="contained" color="primary">
            Checkout
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default CheckoutPage;
