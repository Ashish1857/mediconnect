import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [medicines, setMedicines] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchMedicineData = async () => {
      try {
        const response = await fetch('https://XavierDai.github.io/medicine.json');
        const data = await response.json();
        setMedicines(data);
      } catch (error) {
        console.error('Failed to fetch medicines:', error);
      }
    };

    fetchMedicineData();
  }, []);

  const addToCart = (medicineId) => {
    const foundMedicine = medicines.find(medicine => medicine.id === medicineId);
    if (foundMedicine) {
      setCartItems(currentItems => {
        const itemExists = currentItems.find(item => item.id === medicineId);
        if (itemExists) {
          return currentItems.map(item =>
            item.id === medicineId ? { ...item, quantity: item.quantity + 1 } : item
          );
        }
        return [...currentItems, { ...foundMedicine, quantity: 1 }];
      });
    }
  };

  const updateQuantity = (itemId, action) => {
    setCartItems(currentItems =>
      currentItems.map(item =>
        item.id === itemId
          ? {
              ...item,
              quantity: action === 'increase' ? item.quantity + 1 : Math.max(item.quantity - 1, 1),
            }
          : item
      )
    );
  };
  

  const removeItem = (medicineId) => {
    setCartItems(currentItems => currentItems.filter(item => item.id !== medicineId));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeItem }}>
      {children}
    </CartContext.Provider>
  );
};
