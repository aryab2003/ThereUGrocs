import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ProceedContainer = styled.div`
  color: #333;
  font-family: "Roboto", sans-serif;
  padding: 20px;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 20px;
`;

const PaymentForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormField = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 1.2rem;
`;

const InputField = styled.input`
  padding: 10px;
  font-size: 1rem;
  width: 250px;
`;

const PaymentGatewaySection = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PaymentGateway = styled.div`
  margin-right: 20px;
`;

const PaymentGatewayLabel = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const PaymentGatewayRadio = styled.input`
  margin-right: 5px;
`;

const ProceedButton = styled.button`
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

const ProceedToPayPage = () => {
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });

  const [selectedGateway, setSelectedGateway] = useState("paypal");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails({ ...paymentDetails, [name]: value });
  };

  const handleGatewayChange = (e) => {
    setSelectedGateway(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Payment Details Submitted:", paymentDetails);
    console.log("Selected Gateway:", selectedGateway);
  };

  return (
    <ProceedContainer>
      <Title>Proceed to Pay</Title>
      <PaymentForm onSubmit={handleSubmit}>
        <FormField>
          <Label htmlFor="cardNumber">Card Number:</Label>
          <InputField
            type="text"
            id="cardNumber"
            name="cardNumber"
            value={paymentDetails.cardNumber}
            onChange={handleInputChange}
            required
          />
        </FormField>
        <FormField>
          <Label htmlFor="expirationDate">Expiration Date:</Label>
          <InputField
            type="text"
            id="expirationDate"
            name="expirationDate"
            value={paymentDetails.expirationDate}
            onChange={handleInputChange}
            required
          />
        </FormField>
        <FormField>
          <Label htmlFor="cvv">CVV:</Label>
          <InputField
            type="text"
            id="cvv"
            name="cvv"
            value={paymentDetails.cvv}
            onChange={handleInputChange}
            required
          />
        </FormField>
        <PaymentGatewaySection>
          <PaymentGateway>
            <PaymentGatewayLabel>
              <PaymentGatewayRadio
                type="radio"
                name="gateway"
                value="paypal"
                checked={selectedGateway === "paypal"}
                onChange={handleGatewayChange}
              />
              PayPal
            </PaymentGatewayLabel>
          </PaymentGateway>
          <PaymentGateway>
            <PaymentGatewayLabel>
              <PaymentGatewayRadio
                type="radio"
                name="gateway"
                value="stripe"
                checked={selectedGateway === "stripe"}
                onChange={handleGatewayChange}
              />
              Stripe
            </PaymentGatewayLabel>
          </PaymentGateway>
        </PaymentGatewaySection>
        <Link to="/payment">
          <ProceedButton>Proceed to Payment</ProceedButton>
        </Link>
      </PaymentForm>
    </ProceedContainer>
  );
};

export default ProceedToPayPage;
