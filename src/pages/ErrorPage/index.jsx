import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  background-color: ${({ theme }) => theme.background};

  h1 {
    font-size: 4rem;
    color: ${({ theme }) => theme.primary};
  }

  p {
    font-size: 1.5rem;
    color: ${({ theme }) => theme.text};
  }

  button {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: var(--color-primary);
    color: transparent;
    border: 2px solid var(--color-primary);
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: transparent;
      color: var(--color-primary);
    }
  }
`;

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <ErrorWrapper>
      <h1>Something Went Wrong</h1>
      <p>We couldn't process your request. Please try again later.</p>
      <button onClick={() => navigate("/")}>Go Home</button>
    </ErrorWrapper>
  );
};

export default ErrorPage;
