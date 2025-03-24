import styled, { keyframes } from "styled-components";

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideIn = keyframes`
  from { transform: translateX(-30px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
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

// Main container for the projects section
export const ProjectsContainer = styled.section`
  margin-top: 70px;
  width: 100%;
  padding: 2rem 0;
  background-color: var(--color-mainBg);
`;

export const ProjectsInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

export const HeadingContainer = styled.div`
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

export const Subheading = styled.p`
  text-transform: uppercase;
  font-size: 0.9rem;
  letter-spacing: 2px;
  font-weight: 500;
  color: var(--color-primary);
  margin-bottom: 0.5rem;

  opacity: 0;
  animation: ${slideInFromBottom} 0.7s ease-out forwards;
  animation-play-state: ${(props) => (props.isVisible ? "running" : "paused")};
`;

export const HeadingWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  text-align: center;
`;

export const Heading = styled.h1`
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
  animation-play-state: ${(props) => (props.isVisible ? "running" : "paused")};

  @media screen and (max-width: 900px) {
    font-size: 2.5rem;
  }
`;

export const Underline = styled.div`
  height: 2px;
  background-color: var(--color-primary);
  margin-top: 0.75rem;
  margin-bottom: 1rem;

  width: 0;
  opacity: 0;
  animation: ${expandWidth} 0.6s ease-out 0.6s forwards;
  animation-play-state: ${(props) => (props.isVisible ? "running" : "paused")};
`;

export const ProjectHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  position: relative;
  overflow: hidden;
  border-bottom: 2px solid var(--color-primary);
  gap: 1rem;
`;

export const ProjectHeaderTitle = styled.h2`
  font-size: 2rem;
  font-weight: 500;
  color: var(--color-primary);
  margin: 0;
  position: relative;
  transform: translateY(50px);
  opacity: 0;
  animation: ${slideInFromBottom} 0.5s ease-out forwards;
  animation-play-state: ${(props) => (props.isVisible ? "running" : "paused")};

  flex-grow: 1;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media screen and (max-width: 600px) {
    font-size: 1.75rem;
  }
`;

export const ProjectNumber = styled.span`
  font-size: 2.5rem;
  color: var(--color-primary);
  font-weight: 300;
  transform: translateY(50px);
  opacity: 0;
  animation: ${slideInFromBottom} 0.5s ease-out 0.2s forwards;
  animation-play-state: ${(props) => (props.isVisible ? "running" : "paused")};

  flex-shrink: 0;

  @media screen and (max-width: 600px) {
    font-size: 2rem;
  }
`;

// Project card styling
export const ProjectCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 6rem;
  padding-bottom: 2rem;
  animation: ${fadeIn} 0.8s ease-out;

  @media (min-width: 768px) {
    flex-direction: row;
  }

  @media screen and (max-width: 600px) {
    margin-bottom: 4rem;
  }
`;

export const ProjectCardReversed = styled(ProjectCard)`
  @media (min-width: 768px) {
    flex-direction: row-reverse;
  }
`;

export const ProjectImageContainer = styled.div`
  width: 100%;
  margin-bottom: 2rem;
  position: relative;

  @media (min-width: 768px) {
    width: 40%;
    margin-bottom: 0;
  }
`;

export const ProjectImageContainerLeft = styled(ProjectImageContainer)`
  @media (min-width: 768px) {
    margin-right: 4rem;
    margin-left: 0;
  }

  @media screen and (max-width: 900px) {
    margin-right: 2rem;
  }
`;

export const ProjectImageContainerRight = styled(ProjectImageContainer)`
  @media (min-width: 768px) {
    margin-left: 4rem;
    margin-right: 0;
  }

  @media screen and (max-width: 900px) {
    margin-left: 0;
  }
`;

export const SlideShowContainer = styled.div`
  position: relative;
  width: 100%;
  height: 280px;
  overflow: hidden;
  border-radius: 4px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  @media screen and (max-width: 600px) {
    height: 220px;
  }
`;

export const ProjectImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
  transition: transform 0.5s ease;
`;

export const SlideControls = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 0) 100%
  );
`;

export const SlideButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  &.gallery-prev-btn,
  &.gallery-next-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 10;
  }

  &.gallery-prev-btn {
    left: 1rem;
  }

  &.gallery-next-btn {
    right: 1rem;
  }
`;

export const ViewToggleButton = styled(SlideButton)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
`;

export const SlideIndicators = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 1rem;
  left: 0;
  right: 0;
`;

export const SlideIndicator = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${(props) =>
    props.active ? "var(--color-primary)" : "rgba(255, 255, 255, 0.5)"};
  margin: 0 4px;
  transition: all 0.3s ease;
  cursor: pointer;
`;

export const ProjectMeta = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.75rem;
  animation: ${slideIn} 0.4s ease-out;
`;

export const MetaItem = styled.div`
  display: flex;
  align-items: center;
`;

export const MetaText = styled.span`
  font-size: 0.875rem;
  color: var(--color-secondary);
  margin-left: 0.5rem;
`;

export const ProjectContent = styled.div`
  flex: 1;
  animation: ${slideIn} 0.6s ease-out;
`;

export const ProjectDetailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;

export const DetailItem = styled.div``;

export const DetailLabel = styled.p`
  font-size: 0.75rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
  color: var(--color-text-primary);
`;

export const DetailValue = styled.p`
  font-size: 1rem;
  color: var(--color-secondary);
  margin: 0;
`;

export const ProjectDescription = styled.p`
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-top: 1.5rem;
`;

// Enhanced Gallery Modal
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.3s ease-out;
`;

export const ModalContent = styled.div`
  width: 90%;
  max-width: 1200px;
  // max-height: 90vh;
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 2rem;
  color: white;

  h3 {
    margin-top: 0;
    margin-bottom: 1.5rem;
    text-align: center;
  }

  @media screen and (max-width: 768px) {
    padding: 1rem;
    width: 95%;
  }
`;

export const ModalClose = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  z-index: 20;
  color: white;
  line-height: 1;
`;

export const GalleryMainImage = styled.img`
  max-width: 100%;
  max-height: 60vh;
  object-fit: contain;
  margin: 0 auto 1.5rem;
  border-radius: 4px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
`;

export const GalleryThumbnailsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  max-width: 100%;
  overflow-x: auto;
  padding-bottom: 1rem;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 10px;
  }
`;

export const GalleryThumbnail = styled.div`
  width: 80px;
  height: 60px;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  opacity: ${(props) => (props.active ? 1 : 0.6)};
  border: ${(props) =>
    props.active ? "2px solid var(--color-primary)" : "2px solid transparent"};
  transition: all 0.2s ease;

  &:hover {
    opacity: 1;
    transform: translateY(-2px);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
