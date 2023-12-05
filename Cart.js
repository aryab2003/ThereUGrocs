import React, { useState, useEffect } from "react";
import styled from "styled-components";

const CartContainer = styled.div`
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 10px;
  color: black;
  font-family: "Arial", sans-serif;
  text-align: center;
`;

const CartItem = styled.div`
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-start; /* Center vertically */
  text-align: flex-start; /* Center horizontally */
`;

const Price = styled.p`
  flex: 1; /* Take up available space */
  text-align: right; /* Align price text to the right */
`;

const Quantity = styled.p`
  margin-left: 150px;
  margin-top: -3px;
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
            <Price>${item.price}</Price>
            <Quantity>
              <p>
                <button onClick={() => decreaseQuantity(index)}>-</button>
                {item.quantity}
                <button onClick={() => increaseQuantity(index)}>+</button>
              </p>
            </Quantity>
          </CartItem>
        ))
      ) : (
        <p>No items in cart</p>
      )}
    </CartContainer>
  );
};

export default Cart;
