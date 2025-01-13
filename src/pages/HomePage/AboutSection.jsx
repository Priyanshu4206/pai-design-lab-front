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

  @media screen and (max-width: 900px) {
    flex-direction: column;
    min-height: 100vh;
  }
  @media screen and (max-width: 650px){
    min-heightL 120vh;
  }
`;

const slideFromRight = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
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

const slideFromBottom = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const scaleUp = keyframes`
  from {
    transform: scale(0.5);
    opacity: 0;
  }
  to {
    transform: scale(1);
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
  padding: 3rem 2rem;
  padding-top: 5rem;
  z-index: 2;
  overflow: hidden;
  
  @media screen and (max-width: 900px) {
    width: 100%;
    align-items: center;
    text-align: center;
  }

  @media screen and (max-width: 650px) {
    gap: 0;
  }
`;

const Heading = styled.h1`
  font-size: 4.5vw;
  font-weight: 300;
  line-height: 1.5;
  color: var(--color-primary);
  width: 78%;
  margin-left: -1rem;
  text-align: center;
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
    font-size: 2.5rem;
  }
`;

const Description = styled.p`
  font-size: 1.2rem;
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
  border-radius: 5px;
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
    letter-spacing: 2px;
  }

  @media (max-width: 900px) {
    margin: 0 auto;
  }
`;

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
      animation: ${slideFromRight} 2s ease-in-out forwards;
    `}; 

  @media (max-width: 900px) {
    width: 100%;
    bottom: 0;
    top: auto;
    height: 40vh;
    ${({ inView }) =>
    inView &&
    css`
          animation: ${slideFromBottom} 1.5s ease-in-out forwards;
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

const MidImage = styled.img`
  height: 100%;
  width: 45%;
  object-fit: cover;
  object-position: center;
  border: 1rem solid #181818;
  z-index: 1;
  opacity: 0;
  ${({ inView }) =>
    inView &&
    css`
      animation: ${slideFromRight} 1s ease-in-out forwards;
    `};


  @media (max-width: 900px) {
    width: 90%;
    max-width: 300px;
    height: 300px;
    ${({ inView }) =>
    inView &&
    css`
      animation: ${scaleUp} 1s ease-in-out forwards;
    `};
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
        <Heading ref={headingRef} inView={headingInView}>
          About Our Company
        </Heading>
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
