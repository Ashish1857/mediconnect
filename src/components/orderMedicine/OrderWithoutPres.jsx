import React, { useState, useEffect } from 'react';
import { Grid, Card, CardMedia, CardContent, Button, Typography, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';
import BackButton from './BackButton';

export const OrderWithoutPres = () => {
    const [drugs, setDrugs] = useState([]);
    const [originalDrugs, setOriginalDrugs] = useState([]); // Store the original drugs list
    const [searchInput, setSearchInput] = useState('');
    const { cartItems, addToCart, removeItem } = useCart();

    useEffect(() => {
        fetch('https://XavierDai.github.io/medicine.json')
            .then(response => response.json())
            .then(data => {
                setDrugs(data);
                setOriginalDrugs(data); // Set original drugs list
            })
            .catch(error => console.error('Error fetching drugs:', error));
    }, []);

    const handleSearchChange = (event) => {
        setSearchInput(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        if (event.key === 'Enter') {
            const filtered = originalDrugs.filter(drug => 
                drug.name.toLowerCase().includes(searchInput.toLowerCase())
            );
            setDrugs(filtered);
        }
    };

    const clearSearch = () => {
        setSearchInput('');
        setDrugs(originalDrugs); // Reset to original drugs list
    };

    return (
        <div>
            <Grid container justifyContent="center" alignItems="center" style={{ marginBottom: '20px' }}>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        label="搜索药品"
                        variant="outlined"
                        value={searchInput}
                        onChange={handleSearchChange}
                        onKeyPress={handleSearchSubmit}
                        InputProps={{
                            endAdornment: <SearchIcon />,
                        }}
                    />
                </Grid>
                <Button onClick={clearSearch} style={{ marginLeft: '10px' }}>清空搜索</Button>
            </Grid>
            <Grid container spacing={3}>
                {drugs.map((drug) => (
                   <Grid item xs={12} sm={6} md={4} key={drug.id}>
                   <Card sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', overflow: 'hidden' }}>
                       <Link to={`/product?drug=${drug.id}`}>
                           <CardMedia
                               component="img"
                               sx={{ width: 151, flexShrink: 0 }} // 限制图片宽度，防止其撑大卡片
                               image={drug.image_url}
                               alt={drug.name}
                           />
                       </Link>
                       <CardContent sx={{
                           flex: '1',
                           display: 'flex',
                           flexDirection: 'column',
                           alignItems: 'flex-start', // 确保内容靠左
                           overflow: 'hidden', // 防止内容溢出
                           '& > *': {
                               wordBreak: 'break-word',
                               overflowWrap: 'break-word' // 确保文本在需要时可以换行
                           }
                       }}>
                           <Typography gutterBottom variant="h5" component="div" sx={{ textAlign: 'left', width: '100%' }}>
                               {drug.name}
                           </Typography>
                           <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'left', width: '100%' }}>
                               {drug.description}
                           </Typography>
                           <Typography variant="body1" color="text.primary" sx={{ textAlign: 'left', width: '100%' }}>
                               {drug.price}
                           </Typography>
                           {!cartItems.find(item => item.id === drug.id) ? (
                               <Button size="small" color="primary" onClick={() => addToCart(drug.id)}>
                                   添加至购物车
                               </Button>
                           ) : (
                               <Button size="small" color="secondary" onClick={() => removeItem(drug.id)}>
                                   删除
                               </Button>
                           )}
                       </CardContent>

                   </Card>

               </Grid>
                ))}
            </Grid>
            <Grid container justifyContent="flex-end" style={{ marginTop: '20px' }}>
                <BackButton />
                <Button component={Link} to="/checkout" variant="contained" color="primary">
                    Check Out
                </Button>
            </Grid>
        </div>
    );
};
