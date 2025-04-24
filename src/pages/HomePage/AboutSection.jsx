import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import aboutImg from "../../assets/images/home/aboutImg1.jpg";
import midImg from "../../assets/images/home/aboutImg2.jpg";
import { useNavigate } from "react-router";

// Keyframes for animations
const slideInFromLeft = keyframes`
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideInFromBottom = keyframes`
  from {
    transform: translateY(50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const slideInFromRight = keyframes`
  from {
    transform: translateX(100px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const expandWidth = keyframes`
  from {
    width: 0;
    opacity: 0;
  }
  to {
    width: 160px;
    opacity: 1;
  }
`;

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
  
  opacity: 0;
  animation: ${slideInFromBottom} 0.7s ease-out forwards;
  animation-play-state: ${props => props.isVisible ? 'running' : 'paused'};
`;

const HeadingWrapper = styled.div`
  overflow: hidden;
  width: 100%;
`;

const Heading = styled.h1`
  font-size: 4.5vw;
  font-weight: 300;
  line-height: 1.5;
  color: var(--color-text-primary);
  text-align: center;
  margin: 0;
  padding: 0;
  
  transform: translateY(100px);
  opacity: 0;
  animation: ${slideInFromBottom} 0.5s ease-out 0.3s forwards;
  animation-play-state: ${props => props.isVisible ? 'running' : 'paused'};

  @media screen and (max-width: 900px) {
    font-size: 2.5rem;
  }
`;

const Underline = styled.div`
  height: 2px;
  background-color: var(--color-primary);
  margin-top: 0.75rem;
  margin-bottom: 1rem;
  
  width: 0;
  opacity: 0;
  animation: ${expandWidth} 0.6s ease-out 0.6s forwards;
  animation-play-state: ${props => props.isVisible ? 'running' : 'paused'};
`;

const Description = styled.div`
  width: 90%;
  color: var(--color-secondary);

  @media (max-width: 900px) {
    width: 100%;
  }
`;

const AnimatedParagraph = styled.p`
  font-size: 1.1rem;
  font-weight: 200;
  line-height: 1.8;
  margin-bottom: 1rem;
  
  transform: translateX(-100%);
  opacity: 0;
  animation: ${slideInFromLeft} 0.6s ease-out forwards;
  animation-delay: ${props => 0.8 + (props.index * 0.15)}s;
  animation-play-state: ${props => props.isVisible ? 'running' : 'paused'};
  
  @media (max-width: 900px) {
    font-size: 1rem;
  }
`;

const Button = styled.button`
  border: 2px solid var(--color-primary);
  color: var(--color-primary);
  background: transparent;
  border-radius: 2px;
  padding: 1rem 1.25rem;
  min-width: 200px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease, transform 0.2s ease;
  width: fit-content;
  
  transform: translateY(20px);
  opacity: 0;
  animation: ${slideInFromLeft} 0.5s ease-out 1.6s forwards;
  animation-play-state: ${props => props.isVisible ? 'running' : 'paused'};
  
  &:hover {
    background-color: var(--color-primary);
    color: var(--color-mainBg);
    transform: scale(1.05);
  }
  
  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 900px) {
    margin: 0 auto;
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

const RightImage = styled.img`
  position: absolute;
  right: 0;
  top: 0;
  height: ${({ containerHeight }) => containerHeight}px;
  width: 35%;
  object-fit: cover;
  object-position: center;
  z-index: 1;
  
  transform: translateX(100px);
  opacity: 0;
  animation: ${slideInFromRight} 0.9s ease-out 0.4s forwards;
  animation-play-state: ${props => props.isVisible ? 'running' : 'paused'};

  @media (max-width: 900px) {
    width: 100%;
    bottom: 0;
    top: auto;
    height: 40vh;
  }
`;

const MidImage = styled.img`
  height: 100%;
  width: 45%;
  object-fit: cover;
  object-position: center;
  border: 1rem solid #181818;
  z-index: 1;
  
  transform: translateY(50px);
  opacity: 0;
  animation: ${slideInFromBottom} 0.9s ease-out 0.9s forwards;
  animation-play-state: ${props => props.isVisible ? 'running' : 'paused'};

  @media screen and (max-width: 900px) {
    width: 90%;
    max-width: 300px;
    height: 300px;
  }
`;

const AboutSection = () => {
  const containerRef = useRef(null);
  const [containerHeight, setContainerHeight] = useState(0);
  const [isMobileView, setIsMobileView] = useState(false);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const updateViewport = () => {
      setIsMobileView(window.innerWidth <= 768);
      if (containerRef.current) {
        setContainerHeight(containerRef.current.clientHeight);
      }
    };

    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        if (rect.top < viewportHeight * 0.75 && rect.bottom > 0) {
          setIsInView(true);
        }
      }
    };

    updateViewport();
    handleScroll();

    window.addEventListener("resize", updateViewport);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", updateViewport);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const descriptionText = isMobileView
    ? "PAI Design Studio is a dynamic and innovative architectural firm dedicated to creating exceptional spaces that inspire and enrich the human experience."
    : "PAI Design Studio is a dynamic and innovative architectural firm dedicated to creating exceptional spaces that inspire and enrich the human experience. Founded with a passion for design excellence and sustainability, our firm specializes in a wide range of projects, including residential, commercial, institutional, and mixed-use developments. We are committed to blending functionality, aesthetic beauty, and environmental responsibility in every project.";

  // Split description into lines for staggered animation
  const descriptionLines = descriptionText.split('. ').map(line => line.trim() + (line.endsWith('.') ? '' : '.'));
  const navigate = useNavigate();

  return (
    <SectionLayout ref={containerRef}>
      <LeftSection>
        <HeadingContainer>
          <Subheading isVisible={isInView}>
            ABOUT OUR STUDIO
          </Subheading>
          <HeadingWrapper>
            <Heading isVisible={isInView}>
              Architectural Philosophy
            </Heading>
          </HeadingWrapper>
          <Underline isVisible={isInView} />
        </HeadingContainer>
        <ContentWrapper>
          <Content>
            <Description>
              {descriptionLines.map((line, index) => (
                <AnimatedParagraph
                  key={index}
                  index={index}
                  isVisible={isInView}
                >
                  {line}
                </AnimatedParagraph>
              ))}
            </Description>
            <Button isVisible={isInView} onClick={() => navigate("/about")}>
              Know More
            </Button>
          </Content>
          <MidImage
            src={midImg}
            alt="Mid Image"
            isVisible={isInView}
          />
        </ContentWrapper>
      </LeftSection>
      <RightImage
        src={aboutImg}
        alt="About PAI Design Labs"
        containerHeight={containerHeight}
        isVisible={isInView}
      />
    </SectionLayout>
  );
};

export default AboutSection;