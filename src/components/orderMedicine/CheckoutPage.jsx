import React, { useContext } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useCart } from "./CartContext";
import BackButton from "./BackButton";

const CheckoutPage = () => {
  const { cartItems, updateQuantity, removeItem } = useCart();
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div style={{ width: "80%", margin: "auto", marginTop: "5%" }}>
      {cartItems.map((item) => (
        <Card
          key={item.id}
          sx={{
            display: "flex",
            marginBottom: 2,
            marginTop: 2,
            padding: "0.5rem",
          }}
        >
          <Link to={`/product?drug=${item.id}`}>
            <CardMedia
              component="img"
              sx={{ width: 150, height: 200, objectFit: "cover" }}
              image={item.image_url}
              alt={item.name}
            />
          </Link>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "65%",
              alignItems: "flex-start",
            }}
          >
            <Typography gutterBottom variant="h5" component="div">
              {item.name}
            </Typography>
            <Typography
              variant="body2"
              style={{ color: item.stock === "in_stock" ? "green" : "red" }}
            >
              {item.stock}
            </Typography>
            <Typography variant="body1">{item.description}</Typography>
            <Grid
              container
              spacing={2}
              style={{ margin: "1rem 0" }}
              alignItems="baseline"
            >
              <Grid
                item
                style={{
                  padding: "0.25rem",
                  border: "1px solid lightblue",
                  borderRadius: "5px",
                  margin: "0.25rem",
                }}
              >
                <Button
                  variant="outlined"
                  onClick={() => updateQuantity(item.id, "decrease")}
                >
                  -
                </Button>
                <Typography display="inline">{` ${item.quantity} `}</Typography>
                <Button
                  variant="outlined"
                  onClick={() => updateQuantity(item.id, "increase")}
                >
                  +
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" onClick={() => removeItem(item.id)}>
                  Delete
                </Button>
              </Grid>
            </Grid>
          </CardContent>
          <Typography
            sx={{ width: "5%", textAlign: "right", fontWeight: "bold" }}
          >
            ${item.price}
          </Typography>
        </Card>
      ))}
      <Grid
        container
        justifyContent="flex-end"
        spacing={2}
        style={{ marginTop: "20px" }}
      >
        <Grid item xs={12} style={{ textAlign: "right" }}>
          <Typography variant="h6">Total: ${totalPrice.toFixed(2)}</Typography>
        </Grid>
        <Grid item>
          <BackButton />
        </Grid>
        <Grid item>
          <Button component={Link} to="/medicine" variant="outlined">
            Add more
          </Button>
        </Grid>
        <Grid item>
          <Button
            component={Link}
            to="/payment"
            variant="contained"
            color="primary"
          >
            Checkout
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default CheckoutPage;
