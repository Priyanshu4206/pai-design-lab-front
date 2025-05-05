import React, { useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import useInView from '../../hooks/useInView';
import { teamMembers } from '../../dummyData/dummyData';
import aboutImg from "../../assets/images/about/about_img.png";
import useScrollToTop from '../../hooks/useScrollToTop';

// Animations
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
    transform: translateX(50px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideInFromLeft = keyframes`
  from {
    transform: translateX(-50px);
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

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// Section Layout
const SectionLayout = styled.section`
  padding: 80px 0;
  margin-top: 2rem;
  width: 100%;
  min-height: 100vh;
  background-color: var(--color-mainBg);
  overflow: hidden;
  position: relative;

  @media screen and (max-width: 768px) {
    padding: 60px 0;
  }
`;

const HeadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  margin-bottom: 4rem;

  @media screen and (max-width: 900px) {
    width: 100%;
    margin-left: 0;
    margin-bottom: 3rem;
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
  text-align: center;
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

// Philosophy Section
const PhilosophySection = styled.div`
  display: flex;
  flex-direction: row;
  gap: 6rem;
  padding: 0 10%;
  margin-bottom: 10rem;
  
  @media screen and (max-width: 900px) {
    flex-direction: column;
    gap: 3rem;
    padding: 0 5%;
    margin-bottom: 6rem;
  }
`;

const PhilosophyContent = styled.div`
  flex: 1;
  opacity: 0;
  animation: ${slideInFromLeft} 0.8s ease-out forwards;
  animation-play-state: ${props => props.isVisible ? 'running' : 'paused'};
  animation-delay: 0.3s;
`;

const PhilosophyTitle = styled.h2`
  font-size: 2.8rem;
  font-weight: 300;
  color: var(--color-text-primary);
  margin-bottom: 2rem;
  position: relative;
  
  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 80px;
    height: 2px;
    background-color: var(--color-primary);
  }
  
  @media screen and (max-width: 900px) {
    font-size: 2rem;
  }
`;

const PhilosophyText = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--color-text-secondary);
  margin-bottom: 1.5rem;
  
  @media screen and (max-width: 900px) {
    font-size: 1rem;
  }
`;

const ValuesContainer = styled.div`
  margin-top: 3rem;
`;

const ValuesHeading = styled.h3`
  font-size: 1.4rem;
  font-weight: 400;
  color: var(--color-secondary);
  margin-bottom: 1.5rem;
`;

const ValuesList = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  
  @media screen and (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const ValueItem = styled.li`
  display: flex;
  align-items: center;
  gap: 1rem;
  
  &::before {
    content: "";
    display: block;
    width: 8px;
    height: 8px;
    background-color: var(--color-primary);
    transform: rotate(45deg);
  }
`;

const ValueText = styled.span`
  font-size: 1.1rem;
  color: var(--color-text-primary);
  
  @media screen and (max-width: 900px) {
    font-size: 1rem;
  }
`;

const PhilosophyImage = styled.div`
  flex: 1;
  height: 600px;
  position: relative;
  opacity: 0;
  animation: ${slideInFromRight} 0.8s ease-out forwards;
  animation-play-state: ${props => props.isVisible ? 'running' : 'paused'};
  animation-delay: 0.6s;
  
  @media screen and (max-width: 900px) {
    height: 400px;
  }
`;

const AccentSquare = styled.div`
  position: absolute;
  width: 85%;
  height: 85%;
  top: 10%;
  left: 5%;
  z-index: 1;
  background-color: var(--color-accent);
  opacity: 0.2;
`;

const MainImage = styled.img`
  width: 90%;
  height: 90%;
  object-fit: cover;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
`;

const GoldAccent = styled.div`
  position: absolute;
  width: 40%;
  height: 40%;
  bottom: -10%;
  left: -10%;
  z-index: 0;
  background-color: var(--color-primary);
  opacity: 0.15;
`;

// Team Members Section
const TeamContainer = styled.div`
  padding: 0 10%;
  
  @media screen and (max-width: 900px) {
    padding: 0 5%;
  }
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
  margin-top: 4rem;
  
  @media screen and (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TeamMemberCard = styled.div`
  height: 550px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  opacity: 0;
  animation: ${fadeIn} 0.8s ease-out forwards;
  animation-play-state: ${props => props.isVisible ? 'running' : 'paused'};
  animation-delay: ${props => props.delay || '0s'};
  
  @media screen and (max-width: 900px) {
    height: 500px;
  }
`;

const MemberImage = styled.img`
  width: 100%;
  height: 70%;
  object-fit: cover;
  transition: transform 0.5s ease;
  
  ${TeamMemberCard}:hover & {
    transform: scale(1.05);
  }
`;

const MemberInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 30%;
  background-color: var(--color-surface);
  padding: 1.5rem;
  transition: height 0.4s ease;
  
  ${TeamMemberCard}:hover & {
    height: 45%;
  }
`;

const MemberName = styled.h3`
  font-size: 1.6rem;
  font-weight: 400;
  color: var(--color-text-primary);
  margin-bottom: 0.5rem;
  position: relative;
  
  &::after {
    content: "";
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 40px;
    height: 2px;
    background-color: var(--color-primary);
  }
`;

const MemberPosition = styled.p`
  margin-top: 1rem;
  font-size: 1rem;
  color: var(--color-primary);
  margin-bottom: 1rem;
`;

const MemberDetails = styled.div`
  opacity: 0;
  height: 0;
  overflow: hidden;
  transition: opacity 0.3s ease, height 0.3s ease;
  
  ${TeamMemberCard}:hover & {
    opacity: 1;
    height: auto;
  }
`;

const MemberContact = styled.p`
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  margin-bottom: 0.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

// About Page Component
const AboutPage = () => {
  const sectionRef = useRef(null);
  const philosophyRef = useRef(null);
  const teamRef = useRef(null);
  const isInView = useInView(sectionRef);
  const philosophyInView = useInView(philosophyRef);
  const teamInView = useInView(teamRef);
  useScrollToTop();

  return (
    <SectionLayout ref={sectionRef}>
      {/* Main Heading */}
      <HeadingContainer>
        <Subheading isVisible={isInView}>Who We Are</Subheading>
        <HeadingWrapper>
          <Heading isVisible={isInView}>About Us</Heading>
        </HeadingWrapper>
        <Underline isVisible={isInView} />
      </HeadingContainer>

      {/* Philosophy Section */}
      <PhilosophySection ref={philosophyRef}>
        <PhilosophyContent isVisible={philosophyInView}>
          <PhilosophyTitle>Our Philosophy</PhilosophyTitle>
          <PhilosophyText>
            Architecture is more than designing structures; it's about crafting experiences that resonate with people and environments. At our core, we believe in the seamless integration of form and function, creating spaces that not only captivate the eye but enhance the quality of life.
          </PhilosophyText>
          <PhilosophyText>
            With each project, we strive to push boundaries while respecting the context and culture of the surroundings. Our designs emerge from a deep understanding of the client's vision, the site's characteristics, and the environmental considerations that shape our modern world.
          </PhilosophyText>
          <ValuesContainer>
            <ValuesHeading>Our Core Values</ValuesHeading>
            <ValuesList>
              <ValueItem>
                <ValueText>Sustainable Innovation</ValueText>
              </ValueItem>
              <ValueItem>
                <ValueText>Contextual Harmony</ValueText>
              </ValueItem>
              <ValueItem>
                <ValueText>Functional Excellence</ValueText>
              </ValueItem>
              <ValueItem>
                <ValueText>Collaborative Process</ValueText>
              </ValueItem>
              <ValueItem>
                <ValueText>Material Integrity</ValueText>
              </ValueItem>
              <ValueItem>
                <ValueText>Client-Centered Design</ValueText>
              </ValueItem>
            </ValuesList>
          </ValuesContainer>
        </PhilosophyContent>

        <PhilosophyImage isVisible={philosophyInView}>
          <AccentSquare />
          <MainImage src={aboutImg} alt="Architectural detail showcasing our philosophy" />
          <GoldAccent />
        </PhilosophyImage>
      </PhilosophySection>

      {/* Team Members Section */}
      <TeamContainer ref={teamRef}>
        <HeadingContainer>
          <Subheading isVisible={teamInView}>Our Professionals</Subheading>
          <HeadingWrapper>
            <Heading isVisible={teamInView}>Meet The Team</Heading>
          </HeadingWrapper>
          <Underline isVisible={teamInView} />
        </HeadingContainer>

        <TeamGrid>
          {teamMembers.map((member, index) => (
            <TeamMemberCard
              key={member.id}
              isVisible={teamInView}
              delay={`${0.3 * (index + 1)}s`}
            >
              <MemberImage src={member.image} alt={member.name} />
              <MemberInfo>
                <MemberName>{member.name}</MemberName>
                <MemberPosition>{member.position}</MemberPosition>
              </MemberInfo>
            </TeamMemberCard>
          ))}
        </TeamGrid>
      </TeamContainer>
    </SectionLayout>
  );
};

export default AboutPage;