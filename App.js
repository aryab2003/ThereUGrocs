import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import HomePage from "./HomePage";
import CartPage from "./Cart";
import GroceryWebsite from "./GroceryWebsite";
import ProceedToPayPage from "./ProceedToPayPage";
import PaymentPage from "./Payment";

import styled from "styled-components";

const Navigation = styled.nav`
  background-color: #f5f5f5;
  padding: 10px 0;
`;

const NavList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NavItem = styled.li`
  margin: 0 10px;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #333;
  font-weight: bold;
  padding: 8px 12px;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff6b81;
    color: #fff;
  }
`;

const App = () => {
  const navigateTo = (path) => {
    window.history.pushState({}, null, path);
  };

  const navLinks = [
    { to: "/", label: "Home", path: "/" },
    { to: "/cart", label: "Cart", path: "/cart" },
    { to: "/products", label: "Products", path: "/products" },
  ];

  return (
    <Router>
      <div>
        <Navigation>
          <NavList>
            {navLinks.map((link) => (
              <NavItem key={link.to}>
                <NavLink to={link.to} onClick={() => navigateTo(link.path)}>
                  {link.label}
                </NavLink>
              </NavItem>
            ))}
          </NavList>
        </Navigation>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route
            path="/products"
            element={<GroceryWebsite navLinks={navLinks} />}
          />
          <Route path="/proceed-to-pay" element={<ProceedToPayPage />} />
          <Route path="/payment" element={<PaymentPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
