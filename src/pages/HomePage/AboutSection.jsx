import React, { useEffect, useRef, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import aboutImg from "../../assets/images/home/aboutImg1.jpg";
import midImg from "../../assets/images/home/aboutImg2.jpg";
import useInView from "../../hooks/useInView";

const SectionLayout = styled.section`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  width: 100%;
  min-height: 120vh;
  position: relative;
  overflow: hidden;
  padding-left: 3%;
  @media screen and (max-width: 900px) {
    padding-left: 0;
    flex-direction: column;
    min-height: 100vh;
  }
  @media screen and (max-width: 650px){
    min-height: 120vh;
  }
`;

const slideFromLeft = keyframes`
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const buttonWidthAnimation = keyframes`
  from {
    width:0;
    padding: 0;
    min-width: 0;
    opacity: 0;
    font-size: 0;
  }
  to {
    width: fit-content;
    padding: 1rem 1.25rem;
    min-width: 200px;
    font-size: 1.1rem;
    opacity: 1;
  }
`;

const LeftSection = styled.section`
  width: 85%;
  display: flex;
  flex-direction: column;
  gap: 5rem;
  padding: 3rem 1rem;
  padding-top: 5rem;
  z-index: 2;
  overflow: hidden;
  
  @media screen and (max-width: 900px) {
    width: 100%;
    gap: 2rem;
    align-items: center;
    text-align: center;
  }

  @media screen and (max-width: 650px) {
    gap: 0;
  }
`;

const HeadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: -1rem;
  width: 78%;
  overflow: hidden;
  opacity: 0;
  ${({ inView }) =>
    inView &&
    css`
    animation: ${slideFromLeft} 1s ease-in-out forwards;
    `};

  @media screen and (max-width: 900px) {
    width: 100%;
    margin-left: 0;
  }
`;

const Subheading = styled.p`
  text-transform: uppercase;
  font-size: 0.9rem;
  letter-spacing: 2px;
  font-weight: 500;
  color: var(--color-primary);
  margin-bottom: 0.5rem;
`;

const Heading = styled.h1`
  font-size: 4.5vw;
  font-weight: 300;
  line-height: 1.5;
  color: var(--color-text-primary);
  text-align: center;
  margin: 0;
  padding: 0;

  @media screen and (max-width: 900px) {
    font-size: 2.5rem;
  }
`;

const Underline = styled.div`
  height: 2px;
  width: 160px;
  background-color: var(--color-primary);
  margin-top: 0.75rem;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1.1rem;
  font-weight: 200;
  line-height: 1.8;
  width: 90%;
  color: var(--color-secondary);
  opacity: 0;
  ${({ inView }) =>
    inView &&
    css`
      animation: ${slideFromLeft} 1.5s ease-in-out forwards;
    `};


  @media (max-width: 900px) {
    width: 100%;
    font-size: 1rem;
  }
`;

const Button = styled.button`
  border: 2px solid var(--color-primary);
  color: var(--color-primary);
  background: transparent;
  border-radius: 2px;
  transition: letter-spacing 0.3s ease-in-out, transform 1s ease-in-out;
  overflow: hidden;
  opacity: 0;
  cursor: pointer;
  ${({ inView }) =>
    inView &&
    css`
      animation: ${buttonWidthAnimation} 1.5s ease-in-out forwards;
    `}

  &:hover {
    background-color: var(--color-primary);
    color: var(--color-mainBg);
  }

  @media (max-width: 900px) {
    margin: 0 auto;
  }
`;

// First, let's update the animations for a smoother effect

const fadeInSlideRight = keyframes`
  0% {
    transform: translateX(10%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
`;

const fadeInSlideLeft = keyframes`
  0% {
    transform: translateX(-10%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
`;

const fadeInScale = keyframes`
  0% {
    transform: scale(0.95);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

// Update the RightImage component
const RightImage = styled.img`
  position: absolute;
  right: 0;
  top: 0;
  height: ${({ containerHeight }) => containerHeight}px;
  width: 35%;
  object-fit: cover;
  object-position: center;
  z-index: 1;
  opacity: 0;
  ${({ inView }) =>
    inView &&
    css`
      animation: ${fadeInSlideLeft} 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
      animation-delay: 0.2s;
    `}; 

  @media (max-width: 900px) {
    width: 100%;
    bottom: 0;
    top: auto;
    height: 40vh;
    ${({ inView }) =>
    inView &&
    css`
          animation: ${fadeInScale} 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          animation-delay: 0.4s;
        `};
  }
`;

// Update the MidImage component
const MidImage = styled.img`
  height: 100%;
  width: 45%;
  object-fit: cover;
  object-position: center;
  border: 1rem solid #181818;
  z-index: 1;
  opacity: 0;
  transform-origin: center;
  ${({ inView }) =>
    inView &&
    css`
      animation: ${fadeInSlideRight} 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
      animation-delay: 0.6s;
    `};

  @media screen and (max-width: 900px) {
    width: 90%;
    max-width: 300px;
    height: 300px;
    ${({ inView }) => inView && css`
      animation: ${fadeInScale} 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
      animation-delay: 0.8s;
    `};
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  gap: 1rem;

  @media screen and (max-width: 900px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Content = styled.div`
  width: 55%;
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  gap: 4rem;
  overflow: hidden;

  @media screen and (max-width: 900px) {
    width: 100%;
  }
`;

const AboutSection = () => {
  const containerRef = useRef(null);
  const [containerHeight, setContainerHeight] = useState(0);
  const [isMobileView, setIsMobileView] = useState(false);

  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonRef = useRef(null);
  const rightImageRef = useRef(null);
  const midImageRef = useRef(null);

  const headingInView = useInView(headingRef);
  const descriptionInView = useInView(descriptionRef);
  const buttonInView = useInView(buttonRef);
  const rightImageInView = useInView(rightImageRef);
  const midImageInView = useInView(midImageRef);

  useEffect(() => {
    const updateViewport = () => {
      setIsMobileView(window.innerWidth <= 768);
      if (containerRef.current) {
        setContainerHeight(containerRef.current.clientHeight);
      }
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);

    return () => {
      window.removeEventListener("resize", updateViewport);
    };
  }, []);

  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        setContainerHeight(containerRef.current.clientHeight);
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);

    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  const descriptionText = isMobileView
    ? "PAI Design Lab is a dynamic and innovative architectural firm dedicated to creating exceptional spaces that inspire and enrich the human experience."
    : "PAI Design Lab is a dynamic and innovative architectural firm dedicated to creating exceptional spaces that inspire and enrich the human experience. Founded with a passion for design excellence and sustainability, our firm specializes in a wide range of projects, including residential, commercial, institutional, and mixed-use developments. We are committed to blending functionality, aesthetic beauty, and environmental responsibility in every project.";

  return (
    <SectionLayout ref={containerRef}>
      <LeftSection>
        <HeadingContainer ref={headingRef} inView={headingInView}>
          <Subheading>ABOUT OUR STUDIO</Subheading>
          <Heading>Architectural Philosophy</Heading>
          <Underline />
        </HeadingContainer>
        <ContentWrapper>
          <Content>
            <Description ref={descriptionRef} inView={descriptionInView}>
              {descriptionText}
            </Description>
            <Button ref={buttonRef} inView={buttonInView}>
              Know More
            </Button>
          </Content>
          <MidImage
            src={midImg}
            alt="Mid Image"
            ref={midImageRef}
            inView={midImageInView}
          />
        </ContentWrapper>
      </LeftSection>
      <RightImage
        src={aboutImg}
        alt="About PAI Design Labs"
        ref={rightImageRef}
        inView={rightImageInView}
        containerHeight={containerHeight}
      />
    </SectionLayout>
  );
};

export default AboutSection;