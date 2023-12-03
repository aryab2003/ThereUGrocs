import React from "react";
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
  overflow: hidden; /* Ensure images don't overflow the box */

  img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Cover the entire box without stretching */
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
const HomePage = () => {
  return (
    <Wrapper>
      <GlobalStyle />
      <Title>There U Grocs</Title>
      <Description>Your Go-To-Grocer</Description>
      <ServicesSection>
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
      <ExploreSection>
        <ExploreText>Explore More</ExploreText>
        <Arrow>&#8595;</Arrow>
      </ExploreSection>
    </Wrapper>
  );
};

export default HomePage;
