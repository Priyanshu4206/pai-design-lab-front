import React, { useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import useInView from '../../hooks/useInView';
import img1 from "../../assets/images/NKV_HOMES_GURUGRAM/IMG_9291.jpg";
import img2 from "../../assets/images/RAJDEEP_OFFICE_LUCKNOW/L11.jpg";
import img3 from "../../assets/images/NKV_HOMES_GURUGRAM/IMG_8224.jpg";

// Animation keyframes with faster durations
const slideInUp = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from { transform: translateY(30px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

// Animation mixins with faster durations
const animateWhenInView = (animationName, duration = 0.5, delay = 0) => css`
  opacity: 0;
  animation: ${animationName} ${duration}s ease-out ${delay}s forwards;
`;

// Breakpoints
const breakpoints = {
    small: '480px',
    medium: '768px'
};

// Styled Components
const GallerySection = styled.section`
  background-color: var(--color-surface);
  padding: 80px 20px;
  color: var(--color-text-primary);
`;

const GalleryContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 60px;
  
  @media (max-width: ${breakpoints.medium}) {
    flex-direction: column;
  }
  
  @media (max-width: ${breakpoints.small}) {
    text-align: center;
    align-items: center;
    margin-bottom: 40px;
  }
`;

const LeftHeader = styled.div`
  flex: 1;
  padding-right: 40px;
  opacity: 0;
  
  ${props => props.inView && animateWhenInView(fadeIn, 0.5, 0.1)}
  
  @media (max-width: ${breakpoints.medium}) {
    padding-right: 0;
  }
  
  @media (max-width: ${breakpoints.small}) {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`;

const SmallHeading = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: 15px;
  text-transform: uppercase;
  letter-spacing: 1px;
  opacity: 0;
  
  ${props => props.inView && animateWhenInView(slideUp, 0.4, 0.2)}
  
  @media (max-width: ${breakpoints.medium}) {
    margin-bottom: 0;
    display: ${(props) => props.display};
  }
`;

const Underline = styled.div`
  height: 2px;
  width: 0;
  background-color: var(--color-primary);
  margin-top: 0.75rem;
  margin-bottom: 1rem;
  transition: width 0.6s ease-out;
  
  ${props => props.inView && css`
    width: 160px;
    transition-delay: 0.3s;
  `}
  
  @media (max-width: ${breakpoints.medium}) {
    margin-top: 0.5rem;
    // margin-bottom: 1.5rem;
    display: ${(props) => props.display};
  }
`;

const HeaderParagraph = styled.p`
  font-size: 1rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
  max-width: 400px;
  opacity: 0;
  
  ${props => props.inView && animateWhenInView(fadeIn, 0.5, 0.4)}
  
  @media (max-width: ${breakpoints.medium}) {
    text-align: center;
    max-width: 100%;
  }
`;

const RightHeader = styled.div`
  flex: 1;
  text-align: right;
  
  @media (max-width: ${breakpoints.medium}) {
    text-align: left;
    display: none;
  }
`;

const TextContainer = styled.div`
  position: relative;
  overflow: hidden;
  height: ${props => props.height || 'auto'};
`;

const PhotoText = styled.h2`
  font-size: 5rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.1);
  margin: 0;
  line-height: 0.9;
  text-transform: uppercase;
  letter-spacing: 4px;
  transform: translateY(100%);
  
  ${props => props.inView && css`
    animation: ${slideInUp} 0.5s ease-out 0.15s forwards;
  `}
  
  @media (max-width: ${breakpoints.medium}) {
    font-size: 3rem;
  }
`;

const GalleryText = styled.h2`
  font-size: 5rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0;
  margin-right: 5rem;
  line-height: 0.9;
  text-transform: uppercase;
  letter-spacing: 4px;
  transform: translateY(100%);
  
  ${props => props.inView && css`
    animation: ${slideInUp} 0.5s ease-out 0.25s forwards;
  `}
  
  @media (max-width: ${breakpoints.medium}) {
    font-size: 3rem;
    margin-right: 2rem;
  }
  
  @media (max-width: ${breakpoints.medium}) {
    font-size: 2.5rem;
    margin-right: 0;
    margin-top: 10px;
    margin-bottom: 10px;
    color: white;
  }
`;

// New component for mobile header
const MobileHeader = styled.div`
  display: none;
  text-align: center;
  margin-bottom: 30px;
  opacity: 0;
  
  ${props => props.inView && animateWhenInView(fadeIn, 0.5, 0.1)}
  
  @media (max-width: ${breakpoints.medium}) {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 1rem;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 15px;
  opacity: 0;
  transform: translateY(20px);
  
  ${props => props.inView && css`
    opacity: 1;
    transform: translateY(0);
    transition: opacity 0.5s ease-out, transform 0.6s ease-out;
    transition-delay: 0.3s;
  `}
  
  @media (max-width: ${breakpoints.medium}) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 0;
  }
  
  @media (max-width: ${breakpoints.small}) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(3, 1fr);
    gap: 15px;
  }
`;

const CategoryCard = styled(motion.div)`
  position: relative;
  overflow: hidden;
  cursor: pointer;
  border-radius: 0;
  height: 300px;
  opacity: 0;
  
  ${props => props.inView && animateWhenInView(slideUp, 0.4, props.delay || 0)}
  
  &:hover img {
    transform: scale(1.05);
  }
  
  &:hover .overlay {
    opacity: 0.85;
  }
  
  @media (max-width: ${breakpoints.small}) {
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.5) 30%, rgba(0, 0, 0, 0) 60%);
      pointer-events: none;
    }
  }
`;

const CardOverlayText = styled.div`
  display: none;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 20px;
  color: #DAA520; /* Golden color */
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  z-index: 2;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
  
  @media (max-width: ${breakpoints.small}) {
    display: block;
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
`;

const TextCard = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-mainBg);
  color: white;
  height: 300px;
  padding: 20px;
  text-align: center;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 1px;
  opacity: 0;
  
  ${props => props.inView && animateWhenInView(slideUp, 0.4, props.delay || 0)}
  
  @media (max-width: ${breakpoints.medium}) {
    height: 300px;
  }
  
  @media (max-width: ${breakpoints.small}) {
    display: none;
  }
`;

const CardTitle = styled.h3`
  color: var(--color-text-primary);
  font-size: 1.5rem;
  font-weight: 200;
  letter-spacing: 3px;
  margin: 0;
`;

const ButtonContainer = styled.div`
  text-align: center;
  opacity: 0;
  margin-top: 40px;
  
  ${props => props.inView && animateWhenInView(fadeIn, 0.5, 0.5)}
`;

const ViewMoreButton = styled(Link)`
  display: inline-block;
  margin-top: 40px;
  padding: 20px 35px;
  background-color: var(--color-surface);
  color: var(--color-primary);
  font-weight: 600;
  text-decoration: none;
  border-radius: 2px;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  border: 2px solid var(--color-primary);
  cursor: pointer;
  
  &:hover {
    background-color: var(--color-primary);
    color: var(--color-surface);
  }
`;

const PhotoGallerySection = () => {
    // Create refs for all elements we want to animate
    const sectionRef = useRef(null);
    const leftHeaderRef = useRef(null);
    const smallHeadingRef = useRef(null);
    const underlineRef = useRef(null);
    const paragraphRef = useRef(null);
    const headingsRef = useRef(null);
    const mobileHeaderRef = useRef(null);
    const gridRef = useRef(null);
    const buttonRef = useRef(null);

    // Use a lower threshold to trigger animations sooner
    const sectionInView = useInView(sectionRef, 0.05);
    const leftHeaderInView = useInView(leftHeaderRef, 0.1);
    const smallHeadingInView = useInView(smallHeadingRef, 0.1);
    const underlineInView = useInView(underlineRef, 0.1);
    const paragraphInView = useInView(paragraphRef, 0.1);
    const headingsInView = useInView(headingsRef, 0.1);
    const mobileHeaderInView = useInView(mobileHeaderRef, 0.1);
    const gridInView = useInView(gridRef, 0.05);
    const buttonInView = useInView(buttonRef, 0.1);

    // Modified gallery items for proper ordering in medium screens
    const galleryItems = [
        { id: 1, type: 'image', image: img1, alt: 'Interior studio example with neutral tones and furniture', title: 'CREATIVE STUDIO' },
        { id: 2, type: 'text', title: 'CREATIVE STUDIO' },
        { id: 3, type: 'image', image: img3, alt: 'Stylish workspace design with notebook and accessories', title: 'INTERIOR FIRM' },
        { id: 4, type: 'text', title: 'INTERIOR FIRM' },
        { id: 5, type: 'image', image: img2, alt: 'Elegant business design showcase with modern elements', title: 'BUSINESS DESIGN' },
        { id: 6, type: 'text', title: 'BUSINESS DESIGN' },
    ];

    // Helper function to reorder items for medium screens
    const getReorderedItems = () => {
        // For small screens, only return image items
        if (window.innerWidth <= parseInt(breakpoints.small)) {
            return galleryItems.filter(item => item.type === 'image');
        }

        // For medium screens, reorder to attach text cards to images
        if (window.innerWidth <= parseInt(breakpoints.medium)) {
            const reordered = [];
            // First row: image, text
            reordered.push(galleryItems[0], galleryItems[1]);
            // Second row: text, image (reversed)
            reordered.push(galleryItems[4], galleryItems[3]);
            // Third row: image, text
            reordered.push(galleryItems[2], galleryItems[5]);
            return reordered;
        }

        // Default order for large screens
        return galleryItems;
    };

    return (
        <GallerySection ref={sectionRef}>
            <GalleryContainer>
                {/* Desktop/tablet header */}
                <HeaderContainer>
                    {/* Mobile header */}
                    <MobileHeader ref={mobileHeaderRef} inView={mobileHeaderInView}>
                        <SmallHeading inView={mobileHeaderInView}>
                            Essential portfolio
                        </SmallHeading>
                        <GalleryText inView={mobileHeaderInView}>PHOTO GALLERY</GalleryText>
                        <Underline inView={mobileHeaderInView} />
                    </MobileHeader>

                    <LeftHeader ref={leftHeaderRef} inView={leftHeaderInView}>
                        <SmallHeading ref={smallHeadingRef} inView={smallHeadingInView} display={"none"}>
                            Essential portfolio
                        </SmallHeading>
                        <Underline ref={underlineRef} inView={underlineInView} display={"none"} />
                        <HeaderParagraph ref={paragraphRef} inView={paragraphInView}>
                            Explore our curated collection of stunning designs across various categories.
                            From interior concepts to business solutions, find inspiration in our work.
                        </HeaderParagraph>
                    </LeftHeader>

                    <RightHeader ref={headingsRef}>
                        <TextContainer height="80px">
                            <PhotoText inView={headingsInView}>PHOTO</PhotoText>
                        </TextContainer>
                        <TextContainer height="80px">
                            <GalleryText inView={headingsInView}>GALLERY</GalleryText>
                        </TextContainer>
                    </RightHeader>
                </HeaderContainer>

                <GridContainer ref={gridRef} inView={gridInView}>
                    {typeof window !== 'undefined' && getReorderedItems().map((item, index) => (
                        item.type === 'image' ? (
                            <CategoryCard
                                key={item.id}
                                inView={gridInView}
                                delay={(index * 0.05) + 0.35}
                                whileHover={{ scale: 1.02 }}
                            >
                                <CardImage src={item.image} alt={item.alt} />
                                <CardOverlayText>{item.title}</CardOverlayText>
                            </CategoryCard>
                        ) : (
                            <TextCard
                                key={item.id}
                                inView={gridInView}
                                delay={(index * 0.05) + 0.35}
                                whileHover={{ backgroundColor: '#111' }}
                            >
                                <CardTitle>{item.title}</CardTitle>
                            </TextCard>
                        )
                    ))}
                </GridContainer>

                <ButtonContainer ref={buttonRef} inView={buttonInView}>
                    <ViewMoreButton to="/gallery">
                        View Full Gallery
                    </ViewMoreButton>
                </ButtonContainer>
            </GalleryContainer>
        </GallerySection>
    );
};

export default PhotoGallerySection;