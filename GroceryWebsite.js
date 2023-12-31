import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import fetchProductsFromAPI from "./fetchProductsFromAPI";
import { Link } from "react-router-dom";
import Cart from "./Cart";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//import firebase from "firebase/app";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #45103E;
    margin: 0;
    padding: 0;
    font-family: 'Monospace', sans-serif; /* Or any other font you prefer */
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
  font-family: "Pacifico", sans-serif;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;

  justify-content: center;

  @media screen and (min-width: 768px) {
    wrap-direction: row;
  }
`;

const ProductCard = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 20px;
  text-align: center;
  width: 600px;

  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(+5px);
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
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FooterLink = styled.a`
  color: #fff;
  text-decoration: none;
  margin: 35px;
  transition: color 0.3s ease;

  &:hover {
    color: #ff6b81;
  }
`;

const Divider = styled.hr`
  width: 80%;
  margin: 10px 0;
  border: none;
  border-top: 1px solid #fff;
`;

const SocialIcons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 200px;
  margin: 20px auto;
`;

const SocialIconLink = styled.a`
  img {
    width: 40px;
    height: auto;
  }
`;
const FooterContent = styled.div`
  margin-top: 10px;
`;

const ContactInfo = styled.p`
  margin-top: 10px;
`;

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
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
const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top: 4px solid #333;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  color: black;
  animation: spin 10s linear infinite;
  margin: 20px auto;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Message = styled.p`
  text-align: center;
  color: green;
`;

const CursorTrail = styled.div`
  position: fixed;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  opacity: 30%;
`;

const GroceryWebsite = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [displayedItems, setDisplayedItems] = useState(20);
  const [showMessage, setShowMessage] = useState(false);
  const [enableScroll, setEnableScroll] = useState(true);
  const [disabledButtons, setDisabledButtons] = useState([]);

  /*const addProductToFirestore = async (dataToAdd) => {
    try {
      const firestore = firebase.firestore();
      await firestore.collection("products").add(dataToAdd);
    } catch (error) {
      console.error("Error adding document:", error);
    }
  };*/

  useEffect(() => {
    fetchProductsFromAPI().then((data) => {
      setProducts(data);
    });
  }, []);

  const addToCart = (product, index) => {
    if (!disabledButtons[index]) {
      setCart([...cart, product]);
      setDisabledButtons((prev) => {
        const newDisabledButtons = [...prev];
        newDisabledButtons[index] = true;
        return newDisabledButtons;
      });

      // addProductToFirestore(product);

      toast.success(`${product.name} added to cart!`, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 3000,
      });
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPrice = cart.reduce((total, product) => {
    const productPrice = parseFloat(product.price);
    return isNaN(productPrice) ? total : total + productPrice;
  }, 0);

  const ProductGrid = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    overflow-y: ${enableScroll ? "scroll" : "hidden"}; /* Control scrolling */
  `;
  useEffect(() => {
    if (filteredProducts.length > 20) {
      setEnableScroll(false); // Disable scrolling after 20 items are displayed
      setTimeout(() => {
        setEnableScroll(true); // Re-enable scrolling after 4 seconds
      }, 4000);
    }
  }, [filteredProducts]);

  const [trail, setTrail] = useState([]);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    setTrail((prevTrail) => [
      ...prevTrail,
      {
        x: clientX - 5,
        y: clientY - 5,
        color: getRandomColor(),
      },
    ]);
  };

  const getRandomColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return `#${randomColor}`;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setTrail([]);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [trail]);

  return (
    <div onMouseMove={handleMouseMove}>
      {trail.map((point, index) => (
        <CursorTrail
          key={index}
          style={{
            left: `${point.x}px`,
            top: `${point.y}px`,
            backgroundColor: point.color,
          }}
        />
      ))}
      <GlobalStyle />
      <Header>
        <Logo>There U Grocs</Logo>
      </Header>
      <CartContainer>
        <Cart cartItems={cart} />
        <TotalPrice>Total: ${isNaN(totalPrice) ? "0" : totalPrice}</TotalPrice>
        <Link to="/proceed-to-pay">
          <CheckoutButton>Checkout</CheckoutButton>
        </Link>
      </CartContainer>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SearchContainer>
      <ProductGrid>
        {filteredProducts.map((product, index) => (
          <ProductCard key={product.id}>
            <ProductImage src={product.imageURL} alt={product.name} />
            <ProductName>{product.name}</ProductName>
            <ProductPrice>${product.price}</ProductPrice>
            <AddToCartButton
              onClick={() => addToCart(product, index)}
              disabled={disabledButtons[index]}
            >
              {disabledButtons[index] ? "Added" : "Add to Cart"}
            </AddToCartButton>
          </ProductCard>
        ))}
      </ProductGrid>
      {filteredProducts.length > displayedItems && (
        <>
          <Message>More items available</Message>
          <Spinner />
        </>
      )}
      <Cart cartItems={cart} />

      <CartContainer>
        <TotalPrice>Total: ${isNaN(totalPrice) ? "0" : totalPrice}</TotalPrice>

        <Link to="/proceed-to-pay">
          <CheckoutButton>Checkout</CheckoutButton>
        </Link>
      </CartContainer>

      <Footer>
        <FooterContent>
          <FooterLink href="#">About Us</FooterLink>
          <FooterLink href="#">Contact</FooterLink>
          <FooterLink href="#">Privacy Policy</FooterLink>
          <FooterLink href="#">Terms of Service</FooterLink>
        </FooterContent>
        <Divider />
        <SocialIcons>
          <SocialIconLink href="https://www.instagram.com/">
            <img
              src="https://workingwithdog.com/wp-content/uploads/2016/05/new_instagram_logo.jpg"
              alt="Instagram Logo"
            />
          </SocialIconLink>
          <SocialIconLink href="https://www.facebook.com/">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Facebook_Logo_2023.png"
              alt="Facebook Logo"
            />
          </SocialIconLink>
          <SocialIconLink href="https://twitter.com/">
            <img
              src="https://freelogopng.com/images/all_img/1690643591twitter-x-logo-png.png"
              alt="Twitter Logo"
            />
          </SocialIconLink>
        </SocialIcons>
        <ContactInfo>All Rights Reserved</ContactInfo>
        <ContactInfo>© 2023</ContactInfo>
      </Footer>
      <ToastContainer />
    </div>
  );
};

export default GroceryWebsite;
