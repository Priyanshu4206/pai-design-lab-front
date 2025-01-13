import React, { useRef, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import useInView from "../../hooks/useInView";

const scaleUp = keyframes`
  from{
    opacity: 0;
    scale: 0.75;
  }
  to{
    opacity: 1;
    scale: 1;
  }
`;

const StatsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 5rem 0;
  padding: 5rem;
  position: relative;

  @media (max-width: 768px) {
    padding: 5rem 1rem;
  }
`;

const StatCard = styled.div`
  flex: 1 1 calc(33.33% - 20px);
  text-align: center;
  padding: 20px;
  min-width: 250px;
  border: 1px solid transparent;
  opacity: 0;
  animation: ${({ inView }) => inView ? scaleUp : "none"} 1s ease-out forwards;

  &:nth-child(3n + 2) {
    border-left: 1px solid var(--color-accent);
    border-right: 1px solid var(--color-accent);
  }
  &:nth-child(3n + 1) {
    border-right: 1px solid var(--color-accent);
  }
  &:nth-child(3n) {
    border-left: 1px solid var(--color-accent);
  }
  &:not(:nth-child(-n + 3)) {
    border-top: 1px solid var(--color-accent);
  }

  @media (max-width: 768px) {
    min-width: 150px;
    margin-bottom: 20px;
    border: none;
  }
  
  @media screen and (max-width: 487px){
      &:nth-child(1) {
        border-top: 1px solid var(--color-accent);
     }
  }

  @media screen and (max-width: 339px){
      &:nth-child(n) {
        border-top: 1px solid var(--color-accent);
     }
  }
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 300;
  color: var(--color-primary);
  animation: ${({ inView }) => inView ? scaleUp : "none"} 1s ease-out forwards;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const StatDescription = styled.div`
  font-size: 1rem;
  font-weight: 300;
  color: var(--color-secondary);
  margin-top: 10px;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const StatsSection = () => {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef);

  const statsData = [
    { value: 2024, label: "Year of Establishment" },
    { value: 2, label: "Companies Served" },
    { value: 25, suffix: "+", label: "Completed Projects" },
    { value: 60000, suffix: " Sqft+", label: "Total Built-up Area" },
    { value: 100, suffix: "%", label: "On-time Completion Rate" },
  ];

  return (
    <StatsContainer ref={sectionRef}>
      {statsData.map((stat, index) => (
        <StatCard key={index} inView={inView}>
          <AnimatedNumber
            inView={inView}
            value={stat.value}
            suffix={stat.suffix || ""}
          />
          <StatDescription>{stat.label}</StatDescription>
        </StatCard>
      ))}
    </StatsContainer>
  );
};

const AnimatedNumber = ({ value, suffix, inView }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (inView) {
      const baseDuration = 1500;
      const minDuration = 5000;
      const effectiveDuration = value <= 50 ? minDuration : baseDuration;

      const intervalDelay = 30;
      const totalSteps = Math.ceil(effectiveDuration / intervalDelay);
      const increment = Math.max(value / totalSteps, 1);

      let current = 0;

      const interval = setInterval(() => {
        current += increment;
        if (current >= value) {
          current = value;
          clearInterval(interval);
        }
        setCount(Math.ceil(current));
      }, intervalDelay);

      return () => clearInterval(interval);
    }
  }, [inView, value]);

  return (
    <StatNumber inView={inView}>
      {count}
      {suffix}
    </StatNumber>
  );
};

export default StatsSection;
