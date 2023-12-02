// Cart.js

import React from "react";
import styled from "styled-components";

const CartContainer = styled.div`
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 10px;
`;

const CartItem = styled.div`
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
`;

const Cart = ({ cartItems }) => {
  return (
    <CartContainer>
      <h2>Your Cart</h2>
      {cartItems ? (
        cartItems.map((item, index) => (
          <CartItem key={index}>
            <p>{item.name}</p>
            <p>${item.price}</p>
          </CartItem>
        ))
      ) : (
        <p>No items in cart</p>
      )}
    </CartContainer>
  );
};

export default Cart;
