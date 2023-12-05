import React, { useState, useEffect } from "react";
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

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    max-width: 90%;
    overflow-x: auto;
    max-height: 200px; /* Set a specific height for triggering the scroll */
    margin: 20px auto;
    padding: 0 10px;
  }
`;
const ToggleButton = styled.button`
  background-color: #333;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 20px;

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
  align-items: flex-start; /* Adjusted alignment to move the footer content to the left */
  max-width: 40%;
  height: 50%;
  margin-left: 5%; /* Added margin to further move the footer to the left */

  @media (max-width: 768px) {
    height: 100%;
    max-width: 100vw;
    margin-left: 0; /* Reset margin for smaller screens */
    align-items: center; /* Center alignment for smaller screens */
  }
`;

const FooterLink = styled.a`
  color: #fff;
  text-decoration: none;
  margin: 25px;
  transition: color 0.3s ease;
  display: flex;
  flex-direction: column;

  &:hover {
    color: #ff6b81;
  }
`;

const Divider = styled.hr`
  width: 100%;
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

const CursorTrail = styled.div`
  position: fixed;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  opacity: 10%;
`;

const ProfilePage = () => {
  const [isPaneOpen, setIsPaneOpen] = useState(false);
  const [isAccountEnabled, setIsAccountEnabled] = useState(true);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changedPassword, setChangedPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match. Please re-enter.");
      return;
    }

    if (isLoggedIn) {
      setChangedPassword(true);
      setPassword(newPassword);
      toast.success("Password changed successfully!");
    } else {
      toast.error("You need to log in first.");
    }
  };

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
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

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
    setIsEditingProfile(false);
    setProfileData({ ...editedProfileData });
    setEditedProfileData({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfileData({
      ...editedProfileData,
      [name]: value !== "" ? value : profileData[name],
    });
  };

  const handleAccountToggle = () => {
    setIsAccountEnabled(!isAccountEnabled);
    if (isAccountEnabled) {
      toast.error("You cannot use this account anymore until you login again");
    }
  };

  const togglePane = () => {
    setIsPaneOpen(!isPaneOpen);
  };

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
    const randomShade = Math.floor(Math.random() * 51);
    const randomColor = 255 - randomShade;
    const colorHex = randomColor.toString(16);

    const hexValue = `#${colorHex}${colorHex}${colorHex}`;

    return hexValue;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setTrail([]);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [trail]);

  const [bio, setBio] = useState(
    "Jane is an avid traveler and passionate photographer. Her adventures have taken her across continents."
  );

  const [editedBio, setEditedBio] = useState("");
  const [isEditingBio, setIsEditingBio] = useState(false);

  const handleEditBio = () => {
    setIsEditingBio(true);
    setEditedBio(bio);
  };

  const handleCancelEditBio = () => {
    setIsEditingBio(false);
    setEditedBio("");
  };

  const handleSaveBio = () => {
    setIsEditingBio(false);
    setBio(editedBio);
    setEditedBio("");
  };

  const handleBioInputChange = (e) => {
    const inputBio = e.target.value;
    if (inputBio.length <= 50) {
      setEditedBio(inputBio);
    }
  };

  return (
    <>
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
        <ProfileContainer>
          <LeftPane isOpen={isPaneOpen}>
            <ul>
              <div>
                <input
                  type="password"
                  placeholder="Current Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button onClick={handleChangePassword}>Change Password</button>
              </div>
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
                    <ToggleButton onClick={handleCancelEdit}>
                      Cancel
                    </ToggleButton>
                    <ToggleButton onClick={handleSaveProfile}>
                      Save
                    </ToggleButton>
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
              {isEditingBio ? (
                <div>
                  <textarea
                    value={editedBio}
                    onChange={handleBioInputChange}
                    rows="5"
                    cols="50"
                  />
                  <ToggleButton onClick={handleCancelEditBio}>
                    Cancel
                  </ToggleButton>
                  <ToggleButton onClick={handleSaveBio}>Save</ToggleButton>
                </div>
              ) : (
                <div>
                  <p>{bio}</p>
                  <ToggleButton onClick={handleEditBio}>Edit Bio</ToggleButton>
                </div>
              )}
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
              <FooterLink href="">About Us</FooterLink>
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
            <ContactInfo>All Rights Reserved © 2023</ContactInfo>
          </Footer>
        </ProfileContainer>
      </div>
    </>
  );
};

export default ProfilePage;
