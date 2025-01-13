import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import useScrollToTop from "../../hooks/useScrollToTop";

const NotFoundWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90vh;
  text-align: center;

  h1 {
    font-size: 8rem;
    letter-spacing: 5px;
    color: ${({ theme }) => theme.primary};
  }

  p {
    font-size: 2rem;
    color: ${({ theme }) => theme.text};
  }

  button {
    margin-top: 20px;
    padding: 20px 36px;
    background-color: var(--color-primary);
    color: var(--color-secondary);
    border: 2px solid var(--color-primary);
    border-radius: 5px;
    cursor: pointer;
    font-size: 1.5rem;

    &:hover {
      background-color: var(--color-secondary);
      color: var(--color-primary);
    }
  }
`;

const NotFoundPage = () => {
  const navigate = useNavigate();
  useScrollToTop();

  return (
    <NotFoundWrapper>
      <h1>404</h1>
      <p>The page you are looking for doesn't exist.</p>
      <button onClick={() => navigate("/")}>Go Home</button>
    </NotFoundWrapper>
  );
};

export default NotFoundPage;
