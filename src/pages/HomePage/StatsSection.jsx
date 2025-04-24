import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import useInView from "../../hooks/useInView";

const StatsContainer = styled.div`
  padding: 8rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    width: 1px;
    height: 100%;
    background-color: var(--color-border, #e0e0e0);
  }
  
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: var(--color-border, #e0e0e0);
  }
  
  @media (max-width: 768px) {
    padding: 6rem 1.5rem;
    
    &::before, &::after {
      display: none;
    }
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  height: 100%;
  width: 100%;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-gap: 4rem;
  }
`;

const StatQuadrant = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3rem;
  position: relative;
  text-align: center;
  transition: background-color 0.3s ease;
  
  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const StatValue = styled.div`
  font-size: 3.5rem;
  font-weight: 300;
  color: var(--color-primary, #333);
  margin-bottom: 1rem;
  font-family: 'Playfair Display', serif;
  letter-spacing: -0.5px;
  line-height: 1;
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const StatLabel = styled.div`
  font-size: 1rem;
  font-weight: 400;
  color: var(--color-text, #666);
  text-transform: uppercase;
  letter-spacing: 2px;
  max-width: 70%;
  line-height: 1.5;
  
  @media (max-width: 768px) {
    max-width: 80%;
  }
`;

const AnimatedNumber = ({ value, suffix = "", inView }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (inView) {
      const duration = 2500;
      const intervalDelay = 20;
      const totalSteps = Math.ceil(duration / intervalDelay);
      const increment = value / totalSteps;

      let current = 0;

      const interval = setInterval(() => {
        current += increment;
        if (current >= value) {
          current = value;
          clearInterval(interval);
        }
        setCount(Math.floor(current));
      }, intervalDelay);

      return () => clearInterval(interval);
    }
  }, [inView, value]);

  return `${count}${suffix}`;
};

const StatsSection = () => {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef);

  const statsData = [
    {
      value: 2024,
      label: "Year of Establishment"
    },
    {
      value: 25,
      suffix: "+",
      label: "Completed Projects"
    },
    {
      value: 60000,
      suffix: " Sqft+",
      label: "Total Built-up Area"
    },
    {
      value: 100,
      suffix: "%",
      label: "On-time Completion Rate"
    }
  ];

  return (
    <StatsContainer ref={sectionRef}>
      <StatsGrid>
        {statsData.map((stat, index) => (
          <StatQuadrant key={index}>
            <StatValue>
              {inView ? (
                <AnimatedNumber
                  inView={inView}
                  value={stat.value}
                  suffix={stat.suffix}
                />
              ) : (
                `0${stat.suffix || ""}`
              )}
            </StatValue>
            <StatLabel>{stat.label}</StatLabel>
          </StatQuadrant>
        ))}
      </StatsGrid>
    </StatsContainer>
  );
};

export default StatsSection;