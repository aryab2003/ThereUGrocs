import React, { useState, useEffect } from "react";
import styled from "styled-components";

const CartContainer = styled.div`
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 10px;
  color: black;
  font-family: "Arial", sans-serif;
`;

const CartItem = styled.div`
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
`;

const Cart = ({ cartItems }) => {
  const [cart, setCart] = useState(
    cartItems.map((item) => ({ ...item, quantity: 1 }))
  );

  const increaseQuantity = (index) => {
    const updatedCart = cart.map((item, i) =>
      i === index ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
  };

  const decreaseQuantity = (index) => {
    if (cart[index].quantity > 1) {
      const updatedCart = cart.map((item, i) =>
        i === index ? { ...item, quantity: item.quantity - 1 } : item
      );
      setCart(updatedCart);
    }
  };

  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      setCart(cartItems.map((item) => ({ ...item, quantity: 1 })));
    }
  }, [cartItems]);

  return (
    <CartContainer>
      {cart && cart.length > 0 ? (
        <h2>Your Cart</h2>
      ) : (
        <h2>Loading Wonders For You</h2>
      )}
      {cart && cart.length > 0 ? (
        cart.map((item, index) => (
          <CartItem key={index}>
            <p>{item.name}</p>
            <p>${item.price}</p>
            <p>
              <button onClick={() => decreaseQuantity(index)}>-</button>
              {item.quantity}
              <button onClick={() => increaseQuantity(index)}>+</button>
            </p>
          </CartItem>
        ))
      ) : (
        <p>No items in cart</p>
      )}
    </CartContainer>
  );
};

export default Cart;
