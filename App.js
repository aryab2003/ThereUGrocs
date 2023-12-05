import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from "react-router-dom";
import HomePage from "./HomePage";
import LoginPage from "./Login";
import Profile from "./Profile";
import GroceryWebsite from "./GroceryWebsite";
import ProceedToPayPage from "./ProceedToPayPage";
import PaymentPage from "./Payment";

import styled from "styled-components";

const Navigation = styled.nav`
  background-color: black;
  padding: 25px 0;
  display: flex;
  justify-content: center;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.7s ease;
  width: 100%;

  &:hover {
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 300px) {
    min-width: 100vh;
  }
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
  color: #fff;
  font-weight: bold;
  padding: 8px 12px;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff6b81;
    color: #fff;
    transform: translateY(-2px);
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

const App = () => {
  const [loggedIn, setLoggedIn] = React.useState(false);

  // Check localStorage for login status on app load
  React.useEffect(() => {
    const storedLoggedIn = localStorage.getItem("loggedIn");
    if (storedLoggedIn === "true") {
      setLoggedIn(true);
    }
  }, []);

  const handleLogin = (username, password) => {
    // Check user credentials (replace this with your authentication logic)
    if (username === "user" && password === "password") {
      setLoggedIn(true);
      localStorage.setItem("loggedIn", "true");
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem("loggedIn");
  };

  const navigateTo = (path) => {
    window.history.pushState({}, null, path);
  };

  const navLinks = [
    { to: "/", label: "Home", path: "/" },
    { to: "/products", label: "Products", path: "/products" },
    { to: "/profile", label: "Profile", path: "/profile" },
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
          <Route
            exact
            path="/"
            element={
              loggedIn ? (
                <Navigate to="/home" />
              ) : (
                <LoginPage onLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/home"
            element={
              loggedIn ? (
                <HomePage onLogout={handleLogout} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/products"
            element={
              loggedIn ? (
                <GroceryWebsite navLinks={navLinks} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/profile"
            element={loggedIn ? <Profile /> : <Navigate to="/" />}
          />
          <Route
            path="/proceed-to-pay"
            element={loggedIn ? <ProceedToPayPage /> : <Navigate to="/" />}
          />
          <Route
            path="/payment"
            element={loggedIn ? <PaymentPage /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
