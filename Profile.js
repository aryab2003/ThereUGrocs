import React, { useState } from "react";
import styled from "styled-components";

const FullPage = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
`;

const ProfileContainer = styled.div`
  width: 100%;
  max-width: 800px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const ProfileHeader = styled.header`
  text-align: center;
  margin-bottom: 30px;
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  animation: rotateImage 5s linear infinite;
  transition: transform 0.3s ease-in-out;

  @keyframes rotateImage {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  &:hover {
    transform: scale(1.1);
  }
`;

const ProfileInfo = styled.div`
  text-align: center;
  color: #333;
`;

const ProfileName = styled.h1`
  font-size: 2rem;
  margin-bottom: 10px;
`;

const ProfileDetails = styled.p`
  font-size: 1.2rem;
  color: #666;
`;
const AccountOptions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const AccountLabel = styled.label`
  margin-right: 10px;
  font-size: 1.2rem;
  color: #333;
`;

const ToggleSwitch = styled.div`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
`;

const ToggleSlider = styled.label`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  border-radius: 34px;
  transition: background-color 0.3s;

  &:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    border-radius: 50%;
    transition: 0.3s;
  }

  input:checked + & {
    background-color: #2196f3;
  }

  input:checked + &:before {
    transform: translateX(26px);
  }
`;

const AccountStatus = styled.span`
  font-size: 1.2rem;
  color: #333;
`;
const Profile = () => {
  const [isAccountEnabled, setIsAccountEnabled] = useState(true);

  const handleAccountToggle = () => {
    setIsAccountEnabled(!isAccountEnabled);
  };

  return (
    <FullPage>
      <ProfileContainer>
        <ProfileHeader>
          <ProfileImage
            src="https://i.guim.co.uk/img/media/437adb05d43fd4f7aba3dfbab5200a6776775557/496_0_748_935/master/748.jpg?width=445&dpr=1&s=none"
            alt="Profile Picture"
          />
          <ProfileInfo>
            <ProfileName>Joanna Kims</ProfileName>
            <ProfileDetails>Email: jkims@gmail.com</ProfileDetails>
            <ProfileDetails>Location:Indiana,USA</ProfileDetails>
          </ProfileInfo>
        </ProfileHeader>
        <section>
          <AccountOptions>
            <AccountLabel>Account Status:</AccountLabel>
            <ToggleSwitch>
              <input
                type="checkbox"
                id="accountToggle"
                checked={isAccountEnabled}
                onChange={handleAccountToggle}
              />
              <ToggleSlider htmlFor="accountToggle" />
            </ToggleSwitch>
            <AccountStatus>
              {isAccountEnabled ? "Active" : "Disabled"}
            </AccountStatus>
          </AccountOptions>
        </section>
      </ProfileContainer>
    </FullPage>
  );
};

export default Profile;
