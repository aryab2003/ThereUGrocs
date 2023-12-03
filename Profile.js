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

const LeftPane = styled.div`
  width: 20%;
  height: 60%;
  margin-top: 200px;
  margin-left: 15px;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 0 10px 10px 0;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    left: 0px;
  }
`;

const OptionList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    margin-bottom: 15px;

    button {
      padding: 3px 2px;
      border: none;
      border-radius: 5px;
      background-color: #4caf50;
      color: #fff;
      cursor: pointer;
      font-size: 1.2rem;
      transition: background-color 0.3s;

      &:hover {
        background-color: #45a049;
      }
    }

    h3 {
      margin-bottom: 10px;
      font-size: 1.5rem;
      color: #333;
    }

    input {
      width: calc(100% - 40px);
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 5px;
      margin-bottom: 10px;
      font-size: 1rem;

      &:focus {
        outline: none;
        border-color: #2196f3;
      }
    }

    p {
      font-size: 1rem;
      color: #666;
    }
  }
`;
const PrivacySettings = styled.div`
  display: ${({ isVisible }) => (isVisible ? "block" : "none")};
  margin-top: 20px;
  font-size: 1.2rem;
  color: #333;
  overflow: auto; /* Add overflow to enable scrolling */
  max-height: 150px;
`;

const DropdownButton = styled.button`
  padding: 10px 20px;
  margin-top: -600px;
  margin-right: 100px;
  border: none;
  border-radius: 5px;
  background-color: #4caf50;
  color: #fff;
  cursor: pointer;
  font-size: 1.2rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }

  @media (max-width: 768px) {
    margin-right: 0;
  }
`;

const Profile = () => {
  const [isAccountEnabled, setIsAccountEnabled] = useState(true);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [leftPaneVisible, setLeftPaneVisible] = useState(false);

  const toggleLeftPane = () => {
    setLeftPaneVisible(!leftPaneVisible);
  };

  const [profileData, setProfileData] = useState({
    name: "Joanna Kims",
    email: "jkims@gmail.com",
    location: "Indiana, USA",
  });
  const [editedProfileData, setEditedProfileData] = useState({});

  const [changePasswordData, setChangePasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  // ... (Handle functions for editing profile remain the same)

  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setChangePasswordData({
      ...changePasswordData,
      [name]: value,
    });
    setPasswordMismatch(false); // Reset password mismatch error on input change
  };

  const handleChangePassword = () => {
    const { currentPassword, newPassword, confirmNewPassword } =
      changePasswordData;

    // Check if new password matches the confirmation
    if (newPassword !== confirmNewPassword) {
      setPasswordMismatch(true);
      return;
    }

    // Here you would typically perform an API call to change the password
    // For demonstration, we'll just update the state
    setProfileData({ ...profileData, password: newPassword }); // Update password
    setChangePasswordData({
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    }); // Reset password fields after changing
  };

  const handleAccountToggle = () => {
    setIsAccountEnabled(!isAccountEnabled);
  };

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
  const [showPrivacySettings, setShowPrivacySettings] = useState(false);

  const togglePrivacySettings = () => {
    setShowPrivacySettings(!showPrivacySettings);
  };

  return (
    <FullPage>
      <DropdownButton onClick={toggleLeftPane}>
        {leftPaneVisible ? "Hide" : "Show"} Menu
      </DropdownButton>
      {leftPaneVisible && (
        <LeftPane>
          <OptionList>
            <li>
              <button onClick={handleEditProfile}>Edit Profile</button>
            </li>
            <li>
              <button onClick={togglePrivacySettings}>
                Show Privacy Settings
              </button>
              <PrivacySettings isVisible={showPrivacySettings}>
                <p>
                  Customize profile, third-party access, and account management
                  for a better privacy.
                </p>
              </PrivacySettings>
            </li>
            <li>
              <h3>Change Password</h3>
              <input
                type="password"
                name="currentPassword"
                value={changePasswordData.currentPassword}
                placeholder="Current Password"
                onChange={handlePasswordInputChange}
              />
              <input
                type="password"
                name="newPassword"
                value={changePasswordData.newPassword}
                placeholder="New Password"
                onChange={handlePasswordInputChange}
              />
              <input
                type="password"
                name="confirmNewPassword"
                value={changePasswordData.confirmNewPassword}
                placeholder="Confirm New Password"
                onChange={handlePasswordInputChange}
              />
              {passwordMismatch && <p>Passwords do not match</p>}
              <button onClick={handleChangePassword}>Change Password</button>
            </li>
            <li>
              <button>Logout</button>
            </li>
          </OptionList>
        </LeftPane>
      )}
      <ProfileContainer>
        <ProfileHeader>
          <ProfileImage
            src="https://i.guim.co.uk/img/media/437adb05d43fd4f7aba3dfbab5200a6776775557/496_0_748_935/master/748.jpg?width=445&dpr=1&s=none"
            alt="Profile Picture"
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
                <button onClick={handleCancelEdit}>Cancel</button>
                <button onClick={handleSaveProfile}>Save</button>
              </div>
            ) : (
              <div>
                <ProfileName>{profileData.name}</ProfileName>
                <ProfileDetails>Email: {profileData.email}</ProfileDetails>
                <ProfileDetails>
                  Location: {profileData.location}
                </ProfileDetails>
                <button onClick={handleEditProfile}>Edit Profile</button>
              </div>
            )}
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
