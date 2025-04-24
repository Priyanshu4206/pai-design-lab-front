import React, { useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import heroVideo from "../../assets/images/home/video.mp4";
import useInView from "../../hooks/useInView";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideIn = keyframes`
  from { transform: translateX(-100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const pullUp = keyframes`
  from { transform: translateY(50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const pullDown = keyframes`
  from { transform: translateY(-50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const scaleUp = keyframes`
  from { transform: scale(0.8); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
`;

const LayoutWrapper = styled.section`
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
`;

const VideoElement = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  animation: ${({ inView }) => (inView ? fadeIn : "none")} 0.2s ease-out forwards;
`;

const ContentWrapper = styled.div`
  background-color: rgba(18, 9, 1, 0.35);
  backdrop-filter: blur(6px);
  color: var(--color-primary);
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 1rem;
  padding: 0 3rem;
  animation: ${({ inView }) => (inView ? slideIn : "none")} 1.2s ease-out forwards;
  
  @media screen and (max-width: 768px) {
    width: 100%;
    padding: 1rem;
    align-items: center;
  }
`;

const Heading = styled.h1`
  font-size: 4.5vw;
  font-weight: 300;
  margin-top: 2rem;
  line-height: 1.5;
  color: var(--color-primary);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  opacity: 0;
  overflow: hidden;
  animation: ${({ inView }) => (inView ? pullUp : "none")} 0.8s ease-out 1.4s forwards;

  @media screen and (max-width: 768px) {
    font-size: 2.25rem;
    text-align: center;
  }
`;

const SubHeading = styled.h2`
  font-size: 1.75vw;
  font-weight: 200;
  line-height: 1.5;
  color: var(--color-secondary);
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
  opacity: 0;
  animation: ${({ inView }) => (inView ? pullDown : "none")} 0.8s ease-out 1.6s forwards;

  @media screen and (max-width: 768px) {
    font-size: 1.25rem;
    text-align: center;
  }
`;

const CTAButton = styled(Link)`
  display: inline-block;
  margin-top: 40px;
  padding: 20px 35px;
  background-color:rgba(43, 43, 43, 0.44);
  color: var(--color-primary);
  font-weight: 600;
  text-decoration: none;
  border-radius: 2px;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  border: 2px solid var(--color-primary);
  cursor: pointer;
  opacity: 0;
  animation: ${({ inView }) => (inView ? scaleUp : "none")} 0.8s ease-out 1.25s forwards;
  
  &:hover {
    background-color: var(--color-primary);
    color: var(--color-surface);
  }

  @media screen and (min-width: 768px) {
    min-width: 180px;
    text-align: center;
  }
`;

const HeroSection = () => {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef);

  return (
    <LayoutWrapper ref={sectionRef}>
      <VideoElement src={heroVideo} muted loop autoPlay playsInline type="video/mp4" inView={inView} />
      <ContentWrapper inView={inView}>
        <Heading inView={inView}>Designing Dreams, Building Realities</Heading>
        <SubHeading inView={inView}>Transforming ideas into inspiring spaces. Let's bring your vision to life – connect with us today!</SubHeading>
        <CTAButton to="/contact" inView={inView}>Get in Touch</CTAButton>
      </ContentWrapper>
    </LayoutWrapper>
  );
};

export default HeroSection;