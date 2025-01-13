import React from "react";
import styled from "styled-components";

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.background};
`;

const StyledSpinner = styled.div`
  border: 4px solid ${({ theme }) => theme.spinnerBackground};
  border-top: 4px solid ${({ theme }) => theme.primary};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Spinner = () => (
    <SpinnerWrapper>
        <StyledSpinner />
    </SpinnerWrapper>
);

export default Spinner;
