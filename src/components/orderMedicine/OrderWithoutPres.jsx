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
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import { useCart } from "./CartContext";
import BackButton from "./BackButton";

export const OrderWithoutPres = () => {
  const [drugs, setDrugs] = useState([]);
  const [originalDrugs, setOriginalDrugs] = useState([]); // Store the original drugs list

  const { cartItems, addToCart, removeItem } = useCart();

  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    fetch("https://XavierDai.github.io/medicine.json")
      .then((response) => response.json())
      .then((data) => {
        setDrugs(data);
        setOriginalDrugs(data); // Set original drugs list
      })
      .catch((error) => console.error("Error fetching drugs:", error));
  }, []);

  const clearSearch = () => {
    setInputValue("");
    setDrugs(originalDrugs); // Reset to original drugs list
  };
  const performSearch = (value) => {
    // Filter or fetch data based on the search term
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
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ marginBottom: "20px" }}
      >
        <Grid item xs={12} sm={6}>
          <Autocomplete
            freeSolo
            inputValue={inputValue}
            options={drugs.map((option) => option.name)}
            onInputChange={(event, newInputValue) => {
              // Perform search on input change
              setInputValue(newInputValue);
              performSearch(newInputValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search medicine"
                variant="outlined"
                fullWidth
              />
            )}
          />
        </Grid>
        <Button onClick={clearSearch} style={{ marginLeft: "10px" }}>
          Clear search
        </Button>
      </Grid>
      <Grid container spacing={3}>
        {drugs.map((drug) => (
          <Grid item xs={12} sm={6} md={6} key={drug.id}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                overflow: "hidden",
                minHeight: "250px",
                padding: "0.5rem",
              }}
            >
              <Link to={`/product?drug=${drug.id}`}>
                <CardMedia
                  component="img"
                  sx={{
                    width: "150px",
                    flexShrink: 0,
                    height: "200px",
                    objectFit: "cover",
                  }} // 限制图片宽度，防止其撑大卡片
                  image={drug.image_url}
                  alt={drug.name}
                />
              </Link>
              <CardContent
                sx={{
                  flex: "1",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start", // 确保内容靠左
                  overflow: "hidden", // 防止内容溢出
                  "& > *": {
                    wordBreak: "break-word",
                    overflowWrap: "break-word", // 确保文本在需要时可以换行
                  },
                }}
              >
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{ textAlign: "left", width: "100%" }}
                >
                  {drug.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textAlign: "left", width: "100%" }}
                >
                  {drug.description}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.primary"
                  sx={{ textAlign: "left", width: "100%" }}
                >
                  {drug.price}
                </Typography>
                <br />
                {!cartItems.find((item) => item.id === drug.id) ? (
                  <Button
                    size="small"
                    color="primary"
                    variant="outlined"
                    onClick={() => addToCart(drug.id)}
                  >
                    Add to cart
                  </Button>
                ) : (
                  <Button
                    size="small"
                    color="secondary"
                    variant="outlined"
                    onClick={() => removeItem(drug.id)}
                  >
                    Remove from cart
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
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
