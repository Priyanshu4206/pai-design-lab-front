import React, { useEffect, useRef, useState } from 'react'
import styled, { css, keyframes } from 'styled-components'
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { testimonials } from '../../dummyData/dummyData';
import useInView from '../../hooks/useInView';


const slideToTop = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    transform: translateY(0%);
    opacity: 0;
  }
  100% {
    opacity: 0;
    transform: translateY(-100%);
  }
`;

const slideFromTop = keyframes`
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const staggeredAnimation = `
  animation-duration: var(--animation-duration, 1s);
  animation-timing-function: ease-in-out;
  animation-fill-mode: both;
`;

const slideToRight = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
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

const slideToLeft = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
`;

const slideFromLeft = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;


const scaleOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const scaleIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const SectionLayout = styled.section`
    padding-top: 3rem;
    margin-bottom: 5rem;
    width: 100%;
    min-height: 150vh;
    overflow: hidden;
`;

const Heading = styled.h1`
  font-size: 4.5vw;
  margin-left: 3rem;
  font-weight: 300;
  margin-bottom: 2rem;
  line-height: 1.5;
  color: var(--color-primary);
  opacity: 0;
  ${({ inView }) =>
    inView &&
    css`
    animation: ${slideFromLeft} 1s ease-in-out forwards;
  `};

  @media screen and (max-width: 900px) {
    font-size: 3rem;
    text-align: center;
    margin-left: 0;
  }

  @media screen and (max-width: 650px){
    font-size: 2.5rem;
  }
`;

const TestinomialWrapper = styled.div`
    display: flex;

    @media screen and (max-width: 900px){
        flex-direction: column;
    }
`;

const ContentWrapper = styled.div`
    flex: 1;
    height: 100%;
    overflow: hidden;
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
    animation: ${slideFromLeft} 1s ease-in-out forwards;
  `};
  
  @media screen and (max-width: 900px) {
    font-size: 2rem;
    text-align: center;
  }
`;

const ImageBgLayer = styled.div`
    position: absolute;
    background-color: var(--color-accent);
    width: 85%;
    bottom: -10vh;
    left: 0;
    height: 65vh;
    z-index: 1;
`;

const Image = styled.img`
    width: 90%;
    height: 75vh;
    object-fit: cover;
    object-position: center;
    z-index: 2;
    ${staggeredAnimation};
    animation-name: ${({ isExiting }) => (isExiting ? slideToRight : slideFromRight)};
    animation-delay: ${({ isExiting }) => (isExiting ? "0s" : "0.3s")};
`;

const TestimonialCard = styled.div`
    width: 80%;
    padding: 1rem;
    overflow: hidden;
    height: 100%;
    position: relative;
    margin: auto;
    text-align: center;

    @media screen and (max-width: 900px) {
        width: 100%;
    }

    @media screen and (max-width: 650px){
        padding: 1rem 0;
    }
`;

const NavigationButtons = styled.div`
    margin-top: 2rem;
    display: flex;
    gap: 2rem;
    justify-content: space-evenly;
`;

const CardImage = styled.img`
    height: 250px;
    width: 100%;
    object-fit: cover;
    object-position: center;
    ${staggeredAnimation};
    animation-name: ${({ isExiting }) => (isExiting ? slideToTop : slideFromTop)};
    animation-delay: ${({ isExiting }) => (isExiting ? "0s" : "0.3s")};

    @media screen and (max-width: 900px ){
        height: 300px;
    }
`;

const Avatar = styled.img`
    border: 16px solid #181818;
    border-radius: 100%;
    width: 200px;
    aspect-ratio: 1;
    object-fit: cover;
    position: absolute;
    top: 150px;
    left: 50%;
    transform: translateX(-50%);
    ${staggeredAnimation};
    animation-name: ${({ isExiting }) => (isExiting ? scaleOut : scaleIn)};
    animation-delay: ${({ isExiting }) => (isExiting ? "0.3s" : "0.6s")};

    @media screen and (max-width: 900px ){
        top: 200px;
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
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
    ${staggeredAnimation};
    animation-name: ${({ isExiting }) => (isExiting ? slideToLeft : slideFromLeft)};
    animation-delay: ${({ isExiting }) => (isExiting ? "0.6s" : "0.9s")};
`;

const StoryWrapper = styled.p`
    font-size: 1.1rem;
    line-height: 1.75;
    padding: 0 1rem;
    ${staggeredAnimation};
    animation-name: ${({ isExiting }) => (isExiting ? slideToLeft : slideFromLeft)};
    animation-delay: ${({ isExiting }) => (isExiting ? "0.9s" : "1.2s")};
    
    @media screen and (max-width: 650px) {
        font-size: 1rem;
    }
`;

const IconWrapper = styled.div`
    font-size: 4rem;
    cursor: pointer;
    color: var(--color-primary);

    &:hover{
        color: var(--color-secondary);
    }
`;

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const containerRef = useRef(null);
  const headingInView = useInView(containerRef);
  const intervalRef = useRef(null);

  const nextTestimonial = () => {
    setIsExiting(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      setIsExiting(false);
    }, 1200);
  };

  const prevTestimonial = () => {
    setIsExiting(true);
    setTimeout(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
      );
      setIsExiting(false);
    }, 1200);
  };
  const resetInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(nextTestimonial, 7000);
  };

  useEffect(() => {
    resetInterval();
    return () => clearInterval(intervalRef.current);
  }, [currentIndex]);

  useEffect(() => {
    resetInterval();
    return () => clearInterval(intervalRef.current);
  }, []);

  const { userImg, clientName, text, image } = testimonials[currentIndex];

  return (
    <SectionLayout ref={containerRef}>
      <Heading inView={headingInView}>Stories from Our Clients</Heading>
      <TestinomialWrapper>
        <ContentWrapper>
          <TestimonialCard>
            <CardImage src={image} isExiting={isExiting} />
            <Avatar src={userImg} isExiting={isExiting} />
            <ClientName isExiting={isExiting}>{clientName}</ClientName>
            <StoryWrapper isExiting={isExiting}>{text}</StoryWrapper>
          </TestimonialCard>
          <NavigationButtons>
            <IconWrapper onClick={prevTestimonial}>
              <BsArrowLeft />
            </IconWrapper>
            <IconWrapper onClick={nextTestimonial}>
              <BsArrowRight />
            </IconWrapper>
          </NavigationButtons>
        </ContentWrapper>
        <ReferenceWork >
          <SubHeading inView={headingInView}>Business design</SubHeading>
          <ImageBgLayer />
          <Image src={image} isExiting={isExiting} />
        </ReferenceWork>
      </TestinomialWrapper>
    </SectionLayout>
  )
}

export default Testimonials