import React, { useState } from "react";
import styled from "styled-components";
import QRCode from "qrcode.react";

const PaymentContainer = styled.div`
  color: #333;
  font-family: "Roboto", sans-serif;
  padding: 20px;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const PaymentSuccess = styled.div`
  margin-top: 30px;
`;

const PaymentInfo = styled.div`
  margin-bottom: 30px;
`;

const PaymentInstructions = styled.div`
  margin-top: 20px;
`;

const PaymentPage = () => {
  const [paymentScanned, setPaymentScanned] = useState(false);

  // Function to simulate payment scanning
  const scanPayment = () => {
    // Simulate scanning after a delay (2 seconds in this example)
    setTimeout(() => {
      setPaymentScanned(true);
    }, 4000);
  };

  return (
    <PaymentContainer>
      <Title>Payment</Title>
      {paymentScanned ? (
        <PaymentSuccess>
          <h3>Payment Successful!</h3>
          <p>Thank you for your purchase.</p>
        </PaymentSuccess>
      ) : (
        <>
          <PaymentInfo>
            <h3>Scan the QR code to complete your payment</h3>
            <QRCode value="Aryaisthebest" />
          </PaymentInfo>
          <PaymentInstructions>
            <p>
              Scan the QR code with your payment app and follow the instructions
              to complete the transaction.
            </p>
            <p>Once completed, your payment will be processed.</p>
          </PaymentInstructions>
          <button onClick={scanPayment}>Simulate Scan</button>
        </>
      )}
    </PaymentContainer>
  );
};

export default PaymentPage;
