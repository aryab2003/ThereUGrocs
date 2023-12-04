import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";

const ProfileContainer = styled.div`
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  align-items: stretch;
  flex-direction: row;

  @media (max-width: 767px) {
    flex-direction: column;
  }
`;

const Header = styled.header`
  background-color: #333;
  color: white;
  padding: 20px;
  text-align: center;
  width: 50%;
  max-height: 600px;
  opacity: 90%;

  @media (max-width: 600px) {
    padding: 10px;
    font-size: 14px;
  }

  @media (max-width: 300px) {
    padding: 16px;
    font-size: 14px;
    min-width: 100vh;
  }
`;

const LeftPane = styled.div`
  background-color: #333;
  color: white;
  width: 200px;
  max-height: 640px;
  transition: transform 0.3s ease-in-out;
  transform: ${({ isOpen }) =>
    isOpen ? "translateX(0)" : "translateX(-100%)"};
  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin-bottom: 10px;
  }

  button {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 5px 10px;
    border-radius: 5px;
    transition: background 0.3s ease;
    text-align: left;

    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 200px;
  }
`;

const Main = styled.main`
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const ProfileDetails = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  @media (max-width: 768px) {
    text-align: center;
  }
`;

const ProfilePicture = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-right: 20px;

  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
  }
`;

const UserInfo = styled.div`
  h2 {
    margin-bottom: 10px;
  }
`;

const UserBio = styled.div`
  margin-top: 20px;
`;

const ToggleButton = styled.button`
  background-color: #333;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #555;
  }
`;

const AccountOptions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
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

const ProfileInfo = styled.div`
  text-align: center;
  color: #333;
`;

const ProfileName = styled.h1`
  font-size: 2rem;
  margin-bottom: 10px;
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const TrackOrder = styled.div`
  margin-top: 20px;
  text-align: center;

  input {
    padding: 8px;
    margin-right: 10px;
  }

  button {
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
  max-width: 50%;
  height: 50%;

  @media (max-width: 768px) {
    height:100%;
    max-width:100vw;
`;

const FooterLink = styled.a`
  color: #fff;
  text-decoration: none;
  margin: 5px;
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

const ProfilePage = () => {
  const [isPaneOpen, setIsPaneOpen] = useState(false);
  const [isAccountEnabled, setIsAccountEnabled] = useState(true);
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [orderStatus, setOrderStatus] = useState("");

  const handleTrackOrder = () => {
    if (orderId) {
      setTimeout(() => {
        const randomStatus =
          Math.random() < 0.5 ? "Delivered" : "Not Delivered";
        setOrderStatus(randomStatus);
      }, 2000);
    }
  };

  const [profileData, setProfileData] = useState({
    name: "Joanna Kims",
    email: "jkims@gmail.com",
    location: "Indiana, USA",
    profilePhoto: "",
  });

  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file); // Read the file as a data URL

      reader.onload = () => {
        setProfileData({ ...profileData, profilePhoto: reader.result });
      };
    }
  };

  const [editedProfileData, setEditedProfileData] = useState({});
  const handleEditProfile = () => {
    setIsEditingProfile(true);
    setEditedProfileData({ ...profileData });
  };

  const handleCancelEdit = () => {
    setIsEditingProfile(false);
    setEditedProfileData({});
  };

  const handleSaveProfile = () => {
    // Here you would typically perform an API call to update the profile
    // For demonstration, we'll just update the state
    setIsEditingProfile(false);
    setProfileData({ ...editedProfileData }); // Update profile data with edited data
    setEditedProfileData({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfileData({
      ...editedProfileData,
      [name]: value !== "" ? value : profileData[name], // Use profileData if value is empty
    });
  };

  const handleAccountToggle = () => {
    setIsAccountEnabled(!isAccountEnabled);
    if (isAccountEnabled) {
      toast.error("You cannot use this account anymore until you login again");
    }
  };

  const handleChangePassword = () => {
    setPasswordChanged(true);
  };

  const togglePane = () => {
    setIsPaneOpen(!isPaneOpen);
  };

  return (
    <ProfileContainer>
      <LeftPane isOpen={isPaneOpen}>
        <ul>
          <li>
            <button onClick={handleChangePassword}>Change Password</button>
          </li>
          <li>
            <ToggleButton onClick={handleEditProfile}>
              Edit Profile
            </ToggleButton>
          </li>
        </ul>
      </LeftPane>

      <Header>
        <h1>Your Profile</h1>
        <ToggleButton onClick={togglePane}>Toggle Pane</ToggleButton>
      </Header>

      <Main>
        <ProfileDetails>
          <ProfilePicture
            src={
              profileData.profilePhoto ||
              "https://in.bmscdn.com/iedb/artist/images/website/poster/large/kiara-advani-1043272-1655467015.jpg"
            }
            alt="Profile"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePhotoChange}
          />
          <ProfileInfo>
            {isEditingProfile ? (
              <div>
                <input
                  type="text"
                  name="name"
                  value={
                    editedProfileData.name !== undefined
                      ? editedProfileData.name
                      : profileData.name
                  }
                  onChange={handleInputChange}
                />
                <input
                  type="email"
                  name="email"
                  value={
                    editedProfileData.email !== undefined
                      ? editedProfileData.email
                      : profileData.email
                  }
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="location"
                  value={
                    editedProfileData.location !== undefined
                      ? editedProfileData.location
                      : profileData.location
                  }
                  onChange={handleInputChange}
                />
                <ToggleButton onClick={handleCancelEdit}>Cancel</ToggleButton>
                <ToggleButton onClick={handleSaveProfile}>Save</ToggleButton>
              </div>
            ) : (
              <div>
                <ProfileName>{profileData.name}</ProfileName>
                <ProfileDetails>Email: {profileData.email}</ProfileDetails>
                <ProfileDetails>
                  Location: {profileData.location}
                </ProfileDetails>
                <ToggleButton onClick={handleEditProfile}>
                  Edit Profile
                </ToggleButton>
              </div>
            )}
          </ProfileInfo>
        </ProfileDetails>
        <UserBio>
          <h2>Bio</h2>
          <p>
            Jane is an avid traveler and passionate photographer. Her adventures
            have taken her across continents, capturing breathtaking landscapes
            and diverse cultures. She believes in the power of storytelling
            through images and uses her photography to inspire others to explore
            the world.
          </p>
        </UserBio>
        <ToastContainer />
        <TrackOrder>
          <input
            type="text"
            placeholder="Enter Order ID"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
          />
          <button onClick={handleTrackOrder}>Track Order</button>
          {orderStatus && (
            <p>
              {" "}
              Your Order with ID:{orderId} is {orderStatus}
            </p>
          )}
        </TrackOrder>
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
      </Main>
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
        <ContactInfo>@2023</ContactInfo>
      </Footer>
    </ProfileContainer>
  );
};

export default ProfilePage;
