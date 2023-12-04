import React, { useState } from "react";
import styled from "styled-components";

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const InputField = styled.input`
  margin: 10px;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 250px;
`;

const SubmitButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  border-radius: 5px;
  background-color: #2196f3;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0d47a1;
  }
`;

const ErrorMessage = styled.p`
  color: red;
`;

const Title = styled.h1`
  font-family: monospace;
  text-align: center;
  font-size: 2.5rem;
`;

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (username.trim() === "" || password.trim() === "") {
      setError("Please enter both username and password.");
    } else {
      setError("");

      onLogin(username, password);
    }
  };

  return (
    <div>
      <Title>Login Page</Title>
      <LoginForm onSubmit={handleLogin}>
        <InputField
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <InputField
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <SubmitButton type="submit">Login</SubmitButton>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </LoginForm>
    </div>
  );
};

export default LoginPage;
