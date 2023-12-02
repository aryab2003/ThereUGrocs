import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import fetchProductsFromAPI from "./fetchProductsFromAPI";
import { Link } from "react-router-dom";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #45103E;
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif; /* Or any other font you prefer */
    color: #fff; /* Text color */
  }
`;
const Header = styled.header`
  background-color: grey;
  opacity: 90%;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: box-shadow 0.3s ease; /* Added transition */

  &:hover {
    box-shadow: 0 0 10px blue; /* Glow effect */
  }
`;

const Logo = styled.h1`
  font-size: 24px;
  color: #333;
  margin-left: 0;
  margin-right: auto;
  font-family: "Pacifico", sans-serif;

  @media screen and (min-width: 768px) {
    wrap-direction: row;
  }
`;

const ProductGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const ProductCard = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 20px;
  text-align: center;
  width: 600px;

  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ProductImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 15px;
`;

const ProductName = styled.h2`
  font-weight: bold;
  color: #333;
`;

const ProductPrice = styled.p`
  color: #666;
  margin-top: 5px;
`;

const AddToCartButton = styled.button`
  padding: 8px 16px;
  background-color: #ff6b81;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #d63031;
  }
`;

const CartContainer = styled.div`
  background-color: #f5f5f5;
  padding: 50px;
  margin: 50px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  transition: transform 0.3s ease;
  justify-content: center;
  &:hover {
    transform: translateY(5px);
  }
`;

const TotalPrice = styled.p`
  font-weight: bold;
  margin-top: 10px;
  color: black;
`;

const CheckoutButton = styled.button`
  padding: 10px 20px;
  background-color: #27ae60;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #219653;
  }
`;
const Footer = styled.footer`
  background-color: #333;
  color: #fff;
  padding: 20px;
  text-align: center;
`;

const FooterLink = styled.a`
  color: #fff;
  text-decoration: none;
  margin: 0 10px;
  transition: color 0.3s ease;

  &:hover {
    color: #ff6b81;
  }
`;

const ContactInfo = styled.p`
  margin-top: 10px;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ccc;
  padding: 20px;
  width: 300px;
`;

const LoginInput = styled.input`
  margin-bottom: 10px;
  padding: 8px;
`;

const LoginButton = styled.button`
  padding: 8px 16px;
  background-color: #27ae60;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #219653;
  }
`;
const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const LogoutButton = styled.button`
  padding: 10px 20px;
  background-color: #ff6b81;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #d63031;
  }
`;

const SearchContainer = styled.div`
  margin: 20px auto;
  width: 80%;
  max-width: 600px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px;
  border-radius: 25px;
  border: 2px solid #ddd;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s ease;

  &::placeholder {
    color: #aaa;
  }

  &:focus {
    border-color: #ff6b81;
  }
`;

const GroceryWebsite = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchProductsFromAPI().then((data) => {
      setProducts(data);
    });
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "example" && password === "password") {
      setLoggedIn(true);
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUsername("");
    setPassword("");
  };
  const totalPrice = cart.reduce((total, product) => {
    const productPrice = parseFloat(product.price);
    return isNaN(productPrice) ? total : total + productPrice;
  }, 0);
  if (!loggedIn) {
    return (
      <PageContainer>
        <LoginForm onSubmit={handleLogin}>
          <LoginInput
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <LoginInput
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <LoginButton type="submit">Login</LoginButton>
        </LoginForm>
      </PageContainer>
    );
  }
  return (
    <div>
      <GlobalStyle />
      <Header>
        <Logo>There U Grocs</Logo>

        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </Header>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SearchContainer>
      <ProductGrid>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id}>
            <ProductImage src={product.imageURL} alt={product.name} />
            <ProductName>{product.name}</ProductName>
            <ProductPrice>${product.price}</ProductPrice>
            <AddToCartButton onClick={() => addToCart(product)}>
              Add to Cart
            </AddToCartButton>
          </ProductCard>
        ))}
      </ProductGrid>

      <CartContainer>
        <TotalPrice>Total: ${isNaN(totalPrice) ? "0" : totalPrice}</TotalPrice>

        <Link to="/proceed-to-pay">
          <CheckoutButton>Checkout</CheckoutButton>
        </Link>
      </CartContainer>

      <Footer>
        <p>Follow us:</p>
        <FooterLink href="https://facebook.com">Facebook</FooterLink>
        <FooterLink href="https://twitter.com">Twitter</FooterLink>

        <ContactInfo>Contact us at: thereugrocs@gmail.com</ContactInfo>
      </Footer>
    </div>
  );
};

export default GroceryWebsite;
