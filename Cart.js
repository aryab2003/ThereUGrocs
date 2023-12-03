import React from "react";
import styled from "styled-components";

const CartContainer = styled.div`
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 10px;
  color: black; /* Set font color to black */
  font-family: "Arial", sans-serif; /* Use Arial font or any preferred font */
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
      {cartItems && cartItems.length > 0 ? (
        <h2>You Might Like To Come Back To Them Later</h2>
      ) : (
        <h2>Loading Wonders For You</h2>
      )}
      {cartItems && cartItems.length > 0 ? (
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
