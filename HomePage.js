import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
    color: #fff;
    background: linear-gradient(to right, #ff0000, #45103E); 
  }
`;

const Wrapper = styled.div`
  padding: 20px;
  text-align: center;
  font-family: Monospace;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 1.5rem;
  text-align: center;
`;

const ServicesSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 40px;
`;

const ServiceBox = styled.div`
  background-color: black;
  color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  flex: 1 1 200px;
  min-width: 200px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
  }
`;

const ExploreSection = styled.div`
  margin-top: 40px;
  font-family: Pacifico;
`;

const ExploreText = styled.p`
  font-size: 1.5rem;
  color: #fff;
`;

const Arrow = styled.span`
  display: block;
  margin-top: 10px;
  font-size: 2rem;
`;

const Locations = styled.div`
  margin-top: 40px;
`;

const LocationTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 10px;
`;

const LocationList = styled.ul`
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 0;
`;

const LocationItem = styled.li`
  width: 200px;
  background-color: black;
  border-radius: 10px;
  overflow: hidden;

  img {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 10px 10px 0 0;
  }
`;

const LocationText = styled.p`
  padding: 10px;
  font-size: 1.2rem;
  color: #fff;
`;

const LoginPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
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

const LogoutButton = styled.button`
  padding: 8px 16px;
  background-color: black;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: blue;
  }
`;

const HomePage = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const storedLoggedIn = localStorage.getItem("loggedIn");
    if (storedLoggedIn === "true") {
      setLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    if (username === "user" && password === "password") {
      setLoggedIn(true);
      localStorage.setItem("loggedIn", "true");
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUsername("");
    setPassword("");
  };

  if (!loggedIn) {
    return (
      <LoginPage>
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
        <LoginButton onClick={handleLogin}>Login</LoginButton>
      </LoginPage>
    );
  }
  return (
    <Wrapper>
      <GlobalStyle />
      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      <Title>There U Grocs</Title>
      <Description>Your Go-To-Grocer</Description>
      <ServicesSection>
        {" "}
        <ServiceBox>
          <img
            src="https://www.healthyeating.org/images/default-source/home-0.0/nutrition-topics-2.0/general-nutrition-wellness/2-2-2-3foodgroups_fruits_detailfeature.jpg?sfvrsn=64942d53_4"
            alt="Service 1"
          />
        </ServiceBox>
        <ServiceBox>
          <img
            src="https://media.istockphoto.com/id/589415708/photo/fresh-fruits-and-vegetables.jpg?s=612x612&w=0&k=20&c=aBFGUU-98pnoht73co8r2TZIKF3MDtBBu9KSxtxK_C0="
            alt="Service 2"
          />
        </ServiceBox>
        <ServiceBox>
          <img
            src="https://t3.ftcdn.net/jpg/02/26/53/80/360_F_226538033_C42p96JDNwkSdQs86Agxd1TtaVJsyJ71.jpg"
            alt="Service 3"
          />
        </ServiceBox>
        <ServiceBox>
          <img
            src="https://domf5oio6qrcr.cloudfront.net/medialibrary/9685/iStock-544807136.jpg"
            alt="Service 4"
          />
        </ServiceBox>
      </ServicesSection>
      <Locations>
        <LocationTitle>Available Locations</LocationTitle>
        <LocationList>
          <LocationItem>
            <img
              src="https://cdn.britannica.com/91/110191-050-7BCFD56B/Victoria-Memorial-Hall-Kolkata-India.jpg"
              alt="Kolkata"
            />
            <LocationText>Kolkata</LocationText>
          </LocationItem>
          <LocationItem>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdwj-qOGDvdw47TwUxx_QnTjMmBA0To6yThw&usqp=CAU"
              alt="Mumbai"
            />
            <LocationText>Mumbai</LocationText>
          </LocationItem>
          <LocationItem>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Delhi%2C_India%2C_India_Gate.jpg/1200px-Delhi%2C_India%2C_India_Gate.jpg"
              alt="Delhi"
            />
            <LocationText>Delhi</LocationText>
          </LocationItem>
          {/* Add more locations as needed */}
        </LocationList>
      </Locations>

      <ExploreSection>
        <ExploreText>Explore More</ExploreText>
        <Arrow>&#8595;</Arrow>
      </ExploreSection>
    </Wrapper>
  );
};

export default HomePage;
