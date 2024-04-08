import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Typography,
  Autocomplete,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useCart } from "./CartContext";
import BackButton from "./BackButton";

export const OrderWithoutPres = () => {
  const [drugs, setDrugs] = useState([]);
  const [originalDrugs, setOriginalDrugs] = useState([]);
  const { cartItems, addToCart, removeItem, updateQuantity } = useCart();
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    fetch("https://XavierDai.github.io/medicine.json")
      .then((response) => response.json())
      .then((data) => {
        setDrugs(data);
        setOriginalDrugs(data);
      })
      .catch((error) => console.error("Error fetching drugs:", error));
  }, []);

  const clearSearch = () => {
    setInputValue("");
    setDrugs(originalDrugs);
  };

  const performSearch = (value) => {
    if (value) {
      const filteredDrugs = originalDrugs.filter((drug) =>
        drug.name.toLowerCase().includes(value.toLowerCase())
      );
      setDrugs(filteredDrugs);
    } else {
      setDrugs(originalDrugs);
    }
  };

  return (
    <div style={{ width: "80%", margin: "auto" }}>
      <Typography fontSize="2rem" sx={{ color: "#05B8A3" }}>
        Order your medicines
      </Typography>
      <Typography fontSize="1rem" color="GrayText">
        Schedule a medical appointment with ease. Browse top-rated specialists,
        select your preferred doctor, and book a time that suits your schedule,
        all in just a few clicks.
      </Typography>

      <br />

      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ marginBottom: "20px" }}
      >
        <Grid item xs={12} style={{ display: "flex", alignItems: "center" }}>
          <Autocomplete
            freeSolo
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
              performSearch(newInputValue);
            }}
            options={drugs.map((option) => option.name)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search medicine"
                variant="outlined"
                fullWidth
              />
            )}
            style={{ flexGrow: 1 }}
          />
          <Button onClick={clearSearch} style={{ marginLeft: "10px" }}>
            Clear search
          </Button>
        </Grid>
      </Grid>

      <hr />
      <br />

      <Grid container spacing={3}>
        {drugs.map((drug) => {
          const inCart = cartItems.find((item) => item.id === drug.id);
          return (
            <Grid item xs={6} sm={3} md={3} key={drug.id}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  overflow: "hidden",
                  height: "100%",
                  padding: "5px",
                  border: "none",
                  width: 1,
                }}
              >
                <Link to={`/product?drug=${drug.id}`}>
                  <CardMedia
                    component="img"
                    sx={{ width: "100%", height: 140 }}
                    image={drug.image_url}
                    alt={drug.name}
                  />
                </Link>
                <CardContent
                  sx={{
                    flex: "1",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    width: "100%",
                    padding: "16px",
                  }}
                >
                  <Typography
                    gutterBottom
                    variant="h5"
                    sx={{
                      width: "100%",
                      textAlign: "left",
                      fontWeight: "normal",
                    }}
                  >
                    {drug.name}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      width: "100%",
                      textAlign: "left",
                      fontWeight: "bold",
                    }}
                  >
                    ${drug.price}
                  </Typography>
                  <div style={{ width: "100%", marginTop: "10px" }}>
                    {inCart ? (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          width: "100%",
                        }}
                      >
                        {/* 包裹加减按钮和数量显示在一个带边框的容器中 */}
                        <div
                          style={{
                            display: "flex",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            alignItems: "center",
                          }}
                        >
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => updateQuantity(drug.id, "decrease")}
                            sx={{ minWidth: "30px", border: "0px" }}
                          >
                            -
                          </Button>
                          <Typography display="inline" sx={{ margin: "0 1vw" }}>
                            {inCart.quantity}
                          </Typography>
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => updateQuantity(drug.id, "increase")}
                            sx={{ minWidth: "30px", border: "0px" }}
                          >
                            +
                          </Button>
                        </div>
                        <Button
                          size="small"
                          color="secondary"
                          onClick={() => removeItem(drug.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => addToCart(drug.id, 1)}
                        sx={{ width: "100%" }}
                      >
                        Add to Cart
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <Grid container justifyContent="flex-end" style={{ marginTop: "20px" }}>
        <BackButton />
        <Button
          component={Link}
          to="/checkout"
          variant="contained"
          color="primary"
        >
          Check Out
        </Button>
      </Grid>
    </div>
  );
};
