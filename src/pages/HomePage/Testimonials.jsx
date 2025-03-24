import React, { useEffect, useRef, useState } from 'react'
import styled, { css, keyframes } from 'styled-components'
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { testimonials } from '../../dummyData/dummyData';
import useInView from '../../hooks/useInView';

// Card animations - moving up from bottom
const slideUpOut = keyframes`
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(30px);
  }
`;

const slideUpIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

// Quick image swap animation
const imageSwapOut = keyframes`
  0% {
    opacity: 1;
    transform: translateX(0);
  }
  100% {
    opacity: 0;
    transform: translateX(-20px);
  }
`;

const imageSwapIn = keyframes`
  0% {
    opacity: 0;
    transform: translateX(20px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

// Refined heading animations
const slideFromLeft = keyframes`
  from {
    transform: translateX(-50px);
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

// Shadow animation - follows the image motion
const shadowSwapEffect = keyframes`
  0% {
    transform: translateX(0);
    opacity: 0.7;
  }
  50% {
    transform: translateX(-120%);
    opacity: 0.5;
  }
  100% {
    transform: translateX(0);
    opacity: 0.7;
  }
`;

const SectionLayout = styled.section`
    padding: 80px 0;
    width: 100%;
    min-height: 150vh;
    overflow: hidden;
    position: relative;
`;

const HeadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  margin-bottom: 2rem;

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

const TestinomialWrapper = styled.div`
    display: flex;
    position: relative;

    @media screen and (max-width: 900px){
        flex-direction: column;
    }
`;

const ContentWrapper = styled.div`
    flex: 1;
    height: 100%;
    overflow: hidden;
    position: relative;
`;

const ReferenceWork = styled.div`
    position: relative;
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 2rem;
    overflow: hidden;

    @media screen and (max-width: 900px) {
        display: none;
    }
`;

const SubHeading = styled.h2`
  font-size: 4vw;
  margin-left: auto;
  width: 90%;
  font-weight: 200;
  line-height: 1.5;
  color: var(--color-secondary);
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
  opacity: 0;
  ${({ inView }) =>
    inView &&
    css`
    animation: ${slideFromLeft} 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards 0.3s;
  `};
  
  @media screen and (max-width: 900px) {
    font-size: 2rem;
    text-align: center;
  }
`;

// Enhanced shadow/background effect that follows image swap
const ImageBgLayer = styled.img`
    position: absolute;
    background-color: var(--color-accent);
    width: 85%;
    bottom: -10vh;
    left: 0;
    height: 65vh;
    z-index: 1;
    filter: blur(6px);
    opacity: 0.7;
    transition: transform 0.3s ease-out;
    
    ${({ isSwapping }) => isSwapping && css`
      animation: ${shadowSwapEffect} 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    `}
`;

// Updated image with swap animation instead of fade
const Image = styled.img`
    width: 90%;
    height: 75vh;
    object-fit: cover;
    object-position: center;
    z-index: 2;
    animation-duration: 0.4s;
    animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
    animation-fill-mode: both;
    animation-name: ${({ isExiting }) => (isExiting ? imageSwapOut : imageSwapIn)};
    transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
    
    &:hover {
      transform: scale(1.01) translateY(-5px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
    }
`;

// Card with bottom-up animation like WordPress
const TestimonialCard = styled.div`
    width: 80%;
    padding: 2rem;
    position: relative;
    margin: auto;
    text-align: center;
    animation-duration: 0.5s;
    animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
    animation-fill-mode: both;
    animation-name: ${({ isExiting }) => (isExiting ? slideUpOut : slideUpIn)};
    min-height: 500px;
    background-color: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(2px);
    border-radius: 8px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
    transition: all 0.4s ease;
    
    &:hover {
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
      transform: translateY(-5px);
    }

    @media screen and (max-width: 900px) {
        width: 90%;
    }

    @media screen and (max-width: 650px){
        padding: 0;
        padding-bottom: 1.5rem;
        margin: 0;
        width: 100%;
        background-color: transparent;
        box-shadow: none;
    }
`;

const NavigationButtons = styled.div`
    margin-top: 2rem;
    display: flex;
    gap: 2rem;
    justify-content: center;
    position: relative;
`;

const CardImage = styled.img`
    height: 250px;
    width: 100%;
    object-fit: cover;
    object-position: center;
    transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
    filter: blur(6px);
    border-radius: 6px;
    overflow: hidden;
    filter: saturate(0.9);

    &:hover {
      filter: saturate(1.1);
      transform: scale(1.01);
    }

    @media screen and (max-width: 900px ){
        height: 300px;
    }

    @media screen and(max-width: 650px){
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;    
    }
`;

const Avatar = styled.img`
    border: 10px solid #181818;
    border-radius: 100%;
    width: 180px;
    aspect-ratio: 1;
    object-fit: cover;
    position: absolute;
    top: 180px;
    left: 50%;
    transform: translateX(-50%);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateX(-50%) scale(1.05);
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
    }

    @media screen and (max-width: 900px ){
        top: 220px;
        width: 160px;
    }
`;

const ClientName = styled.h3`
    margin-top: 75px;
    margin-bottom: 1rem;
    font-size: 2rem;
    padding: 0 1rem;
    font-weight: 300;
    line-height: 1.5;
    color: var(--color-secondary);
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 50px;
      height: 2px;
      background-color: var(--color-primary);
      opacity: 0.7;
    }
`;

const StoryWrapper = styled.p`
    font-size: 1.1rem;
    line-height: 1.75;
    padding: 0 1rem;
    margin: 1.5rem auto 0;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 90%;
    height: 5.25rem; /* 3 lines * 1.75 line height */
    color: rgba(255, 255, 255, 0.85);
    font-style: italic;
    position: relative;
    
    &::before {
      content: '"';
      font-size: 3rem;
      position: absolute;
      top: -1.5rem;
      left: 0;
      color: var(--color-primary);
      opacity: 0.2;
    }
    
    &::after {
      content: '"';
      font-size: 3rem;
      position: absolute;
      bottom: -1.5rem;
      right: 0;
      color: var(--color-primary);
      opacity: 0.2;
    }
    
    @media screen and (max-width: 650px) {
        font-size: 1rem;
        height: 4.5rem; /* 3 lines * 1.5 line height */
        line-height: 1.5;
    }
`;

// Better navigation buttons with a pulse effect
const IconWrapper = styled.div`
    font-size: 2.5rem;
    cursor: pointer;
    color: var(--color-primary);
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    background: rgba(0, 0, 0, 0.05);
    border-radius: 50%;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: rgba(var(--color-primary-rgb, 0, 0, 0), 0.1);
      z-index: -1;
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0% {
        transform: scale(1);
        opacity: 0.7;
      }
      70% {
        transform: scale(1.3);
        opacity: 0;
      }
      100% {
        transform: scale(1);
        opacity: 0;
      }
    }

    &:hover {
        color: var(--color-secondary);
        transform: scale(1.1);
        background: rgba(0, 0, 0, 0.1);
    }
    
    &:active {
        transform: scale(0.95);
    }
`;

// Smoother progress indicator
const ProgressContainer = styled.div`
    width: 50%;
    margin: 2rem auto 0;
    height: 4px;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    overflow: hidden;
    position: relative;
`;

const ProgressBar = styled.div`
    height: 100%;
    background: linear-gradient(90deg, var(--color-primary) 0%, var(--color-secondary) 100%);
    width: ${({ progress }) => `${progress}%`};
    transition: width 0.3s ease-out;
    border-radius: 4px;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 20px;
      height: 100%;
      background: rgba(255, 255, 255, 0.3);
      filter: blur(3px);
    }
`;

// Preload container
const PreloadContainer = styled.div`
    position: absolute;
    opacity: 0;
    visibility: hidden;
    width: 0;
    height: 0;
    overflow: hidden;
`;

// Card container to handle stacking and transitions
const CardContainer = styled.div`
    position: relative;
    // height: 600px;
    width: 100%;
    
    @media screen and (max-width: 650px) {
        background-color: rgba(255, 255, 255, 0.03);
    }
`;

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(null);
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isSwapping, setIsSwapping] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef(null);
  const headingInView = useInView(containerRef);
  const intervalRef = useRef(null);
  const progressIntervalRef = useRef(null);
  const totalTime = 7000; // Total time between transitions
  const transitionTime = 500; // Faster animation duration for WordPress-like effect

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        if (rect.top < viewportHeight * 0.75 && rect.bottom > 0) {
          setIsInView(true);
        }
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const changeTestimonial = (newIndex) => {
    if (newIndex === currentIndex) return;

    clearInterval(progressIntervalRef.current);
    setProgress(0);
    setIsExiting(true);
    setIsSwapping(true);
    setNextIndex(newIndex); // Store the next index

    setTimeout(() => {
      setCurrentIndex(newIndex);
      setNextIndex(null);
      setIsExiting(false);

      // Reset swapping state after animation completes
      setTimeout(() => {
        setIsSwapping(false);
      }, 500);

      startProgressAnimation();
    }, transitionTime);
  };

  const nextTestimonial = () => {
    const newIndex = (currentIndex + 1) % testimonials.length;
    changeTestimonial(newIndex);
  };

  const prevTestimonial = () => {
    const newIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    changeTestimonial(newIndex);
  };

  const startProgressAnimation = () => {
    const increment = 100 / (totalTime / 100); // Calculate increment per 100ms
    setProgress(0);

    progressIntervalRef.current = setInterval(() => {
      setProgress(prevProgress => {
        const newProgress = prevProgress + increment;
        if (newProgress >= 100) {
          clearInterval(progressIntervalRef.current);
          return 100;
        }
        return newProgress;
      });
    }, 100);
  };

  const resetInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(nextTestimonial, totalTime);
  };

  useEffect(() => {
    resetInterval();
    startProgressAnimation();

    return () => {
      clearInterval(intervalRef.current);
      clearInterval(progressIntervalRef.current);
    };
  }, []);

  useEffect(() => {
    resetInterval();
    return () => clearInterval(intervalRef.current);
  }, [currentIndex]);

  const { userImg, clientName, text, image } = testimonials[currentIndex];
  // Get next testimonial data for preloading
  const nextTestimonialData = nextIndex !== null ? testimonials[nextIndex] : null;

  return (
    <SectionLayout ref={containerRef}>
      <HeadingContainer>
        <Subheading isVisible={isInView}>Stories from Our Clients</Subheading>
        <HeadingWrapper>
          <Heading isVisible={isInView}>Client Testimonials</Heading>
        </HeadingWrapper>
        <Underline isVisible={isInView} />
      </HeadingContainer>
      <TestinomialWrapper>
        <ContentWrapper>
          <CardContainer>
            <TestimonialCard isExiting={isExiting}>
              <CardImage src={image} />
              <Avatar src={userImg} />
              <ClientName>{clientName}</ClientName>
              <StoryWrapper>{text}</StoryWrapper>

              <ProgressContainer>
                <ProgressBar progress={progress} />
              </ProgressContainer>

              <NavigationButtons>
                <IconWrapper onClick={prevTestimonial}>
                  <BsArrowLeft />
                </IconWrapper>
                <IconWrapper onClick={nextTestimonial}>
                  <BsArrowRight />
                </IconWrapper>
              </NavigationButtons>
            </TestimonialCard>
          </CardContainer>

          {/* Preload next testimonial images */}
          {nextIndex !== null && (
            <PreloadContainer>
              <img src={nextTestimonialData.image} alt="" />
              <img src={nextTestimonialData.userImg} alt="" />
            </PreloadContainer>
          )}
        </ContentWrapper>
        <ReferenceWork>
          <SubHeading inView={headingInView}>Business design</SubHeading>
          <ImageBgLayer isSwapping={isSwapping} src={image} />
          <Image src={image} isExiting={isExiting} />
        </ReferenceWork>
      </TestinomialWrapper>
    </SectionLayout >
  )
}

export default Testimonials