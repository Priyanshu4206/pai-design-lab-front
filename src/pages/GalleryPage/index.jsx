import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { images } from '../../dummyData/dummyData';
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

const shimmerEffect = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const popIn = keyframes`
  0% {
    transform: scale(0.95);
    opacity: 0;
  }
  70% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

// Styled Components
const PageContainer = styled.div`
  margin-top: 70px;
  padding: 0 1rem;
  padding-bottom: 20px;
  max-width: 1600px;
  margin-left: auto;
  margin-right: auto;
`;

const IntroText = styled.p`
  text-align: center;
  max-width: 800px;
  margin: 0 auto 3rem;
  color: var(--color-text-secondary);
  font-size: 1.1rem;
  line-height: 1.6;
  transform: translateY(20px);
  opacity: 0;
  animation: ${fadeIn} 0.6s ease-out 0.8s forwards;
  animation-play-state: ${(props) => (props.isVisible ? "running" : "paused")};
`;

const HeadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  padding-top: 2rem;
  margin-bottom: 3rem;

  @media screen and (max-width: 900px) {
    width: 100%;
    margin-left: 0;
    margin-bottom: 2rem;
  }
`;

const Subheading = styled.p`
  text-transform: uppercase;
  font-size: 0.95rem;
  letter-spacing: 2.5px;
  font-weight: 500;
  color: var(--color-primary);
  margin-bottom: 0.5rem;
  opacity: 0;
  animation: ${slideInFromBottom} 0.7s ease-out forwards;
  animation-play-state: ${(props) => (props.isVisible ? "running" : "paused")};
`;

const HeadingWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  text-align: center;
`;

const Heading = styled.h1`
  font-size: clamp(2.5rem, 4.5vw, 5rem);
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
`;

const Underline = styled.div`
  height: 2px;
  background-color: var(--color-primary);
  margin-top: 0.75rem;
  margin-bottom: 1rem;
  width: 0;
  opacity: 0;
  animation: ${expandWidth} 0.6s ease-out 0.6s forwards;
  animation-play-state: ${(props) => (props.isVisible ? "running" : "paused")};
`;

const CategoryContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  gap: 1.2rem;
  perspective: 1000px;
`;

const categoryAnimation = (index) => css`
  animation: ${popIn} 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
  animation-delay: ${0.1 + index * 0.05}s;
`;

const CategoryButton = styled.button`
  background: ${props => props.active ? 'var(--color-primary)' : 'transparent'};
  color: ${props => props.active ? '#000' : '#fff'};
  border: ${props => props.active ? 'none' : '1px solid rgba(255, 255, 255, 0.3)'};
  padding: 0.6rem 1.5rem;
  border-radius: 2px;
  cursor: pointer;
  font-weight: 300;
  font-size: 1rem;
  letter-spacing: 0.5px;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
  overflow: hidden;
  opacity: 0;
  transform: scale(0.95);
  ${props => categoryAnimation(props.index)}
  
  &:hover {
    background: ${props => props.active ? 'var(--color-primary)' : 'rgba(255, 255, 255, 0.1)'};
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: var(--color-primary);
    transform: scaleX(0);
    transition: transform 0.3s ease;
    transform-origin: center;
  }
  
  &:hover:after {
    transform: ${props => props.active ? 'scaleX(0)' : 'scaleX(1)'};
  }
`;

// Using CSS Grid with container transitions for smooth animation
const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1.5rem;
  grid-auto-rows: auto;
  grid-auto-flow: dense;
  transition: opacity 0.3s ease;
  min-height: 600px;
  opacity: ${props => props.isTransitioning ? 0.6 : 1};
  
  @media (max-width: 1100px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

const ShimmerBg = styled.div`
  background: linear-gradient(to right, var(--color-mainBg) 8%, rgba(255, 255, 255, 0.05) 18%, var(--color-mainBg) 33%);
  background-size: 800px 104px;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  animation: ${shimmerEffect} 1.5s infinite linear;
  z-index: 1;
`;

const GalleryItem = styled.div`
  position: relative;
  overflow: hidden;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
  height: auto;
  will-change: transform, opacity;
  transform-style: preserve-3d;
  backface-visibility: hidden;
  grid-row: span ${props => props.rowSpan || 1};
  grid-column: span ${props => props.isWide ? 2 : 1};
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275),
              box-shadow 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94),
              opacity 0.5s ease;
  animation: ${fadeIn} 0.5s ${props => props.delay}ms both;
  
  &:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
    z-index: 2;
    
    .overlay {
      opacity: 1;
    }
    
    img {
      transform: scale(1.05);
    }
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  background-color: var(--color-mainBg);
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  will-change: transform;
  position: relative;
  z-index: 2;
  opacity: ${props => props.isLoaded ? 1 : 0};
  transition: opacity 0.3s ease, transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
`;

const Overlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.5rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.5) 60%, rgba(0, 0, 0, 0) 100%);
  opacity: 0;
  transition: opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  z-index: 3;
  transform: translateZ(0);
`;

const ClientName = styled.h3`
  color: white;
  margin: 0;
  font-size: 1.25rem;
  font-weight: 500;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.6);
  margin-bottom: 0.3rem;
  transform: translateY(10px);
  transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  
  ${GalleryItem}:hover & {
    transform: translateY(0);
  }
`;

const ProjectType = styled.span`
  display: inline-block;
  color: var(--color-primary);
  font-size: 0.9rem;
  font-weight: 500;
  transform: translateY(10px);
  transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transition-delay: 0.05s;
  
  ${GalleryItem}:hover & {
    transform: translateY(0);
  }
`;

// Image component with loading state
const GalleryImage = ({ src, alt, onLoad }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  }, [onLoad]);

  return (
    <ImageWrapper>
      {!isLoaded && <ShimmerBg />}
      <StyledImage
        src={src}
        alt={alt}
        isLoaded={isLoaded}
        onLoad={handleLoad}
      />
    </ImageWrapper>
  );
};

// Enhanced Image Overlay
const ImageOverlay = ({ client, projectType }) => (
  <Overlay className="overlay">
    <ClientName>{client}</ClientName>
    <ProjectType>{projectType}</ProjectType>
  </Overlay>
);

// Optimized Gallery Component
const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState('All Images');
  const [displayedImages, setDisplayedImages] = useState([]);
  const [visibleCount, setVisibleCount] = useState(12);
  const [isInView, setIsInView] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [loadedImageCount, setLoadedImageCount] = useState(0);
  const containerRef = useRef(null);
  const allImagesCache = useRef({});
  const observer = useRef(null);
  const lastItemRef = useRef(null);

  // Memoize categories
  const categories = useMemo(() =>
    ['All Images', ...new Set(images.map(img => img.category))],
    []
  );

  // Pre-process and prepare image sets by category
  const imagesByCategory = useMemo(() => {
    const result = { 'All Images': [...images] };

    // Create sets of images for each category
    categories.forEach(category => {
      if (category !== 'All Images') {
        result[category] = images.filter(img => img.category === category);
      }
    });

    return result;
  }, [categories]);

  // Initialize gallery on component mount
  useEffect(() => {
    // Set initial images
    setDisplayedImages(imagesByCategory[activeCategory].slice(0, visibleCount));
  }, []);

  // Get layout properties with varied sizes
  const getItemLayout = useCallback((index) => {
    const patterns = [
      { rowSpan: 1, isWide: false },  // Standard 1x1
      { rowSpan: 1, isWide: false },  // Standard 1x1
      { rowSpan: 2, isWide: false },  // Tall 1x2
      { rowSpan: 1, isWide: true },   // Wide 2x1
      { rowSpan: 1, isWide: false },  // Standard 1x1
      { rowSpan: 1, isWide: false },  // Standard 1x1
      { rowSpan: 2, isWide: false },  // Tall 1x2
      { rowSpan: 1, isWide: false },  // Standard 1x1
      { rowSpan: 2, isWide: true },   // Large 2x2
      { rowSpan: 1, isWide: false },  // Standard 1x1
      { rowSpan: 1, isWide: false },  // Standard 1x1
      { rowSpan: 1, isWide: true }    // Wide 2x1
    ];

    return patterns[index % patterns.length];
  }, []);

  // Handle image load event
  const handleImageLoad = useCallback(() => {
    setLoadedImageCount(prev => prev + 1);
  }, []);

  // Handle category changes with smooth transitions
  const handleCategoryChange = useCallback((category) => {
    if (category === activeCategory || isTransitioning) return;

    setIsTransitioning(true);

    // Short timeout for visual transition
    setTimeout(() => {
      setDisplayedImages(imagesByCategory[category].slice(0, visibleCount));
      setActiveCategory(category);
      setLoadedImageCount(0);

      // Remove transition state after animation
      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    }, 300);
  }, [activeCategory, imagesByCategory, visibleCount, isTransitioning]);

  // Setup Intersection Observer for infinite scrolling
  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    const options = {
      root: null,
      rootMargin: '100px',
      threshold: 0.1
    };

    observer.current = new IntersectionObserver((entries) => {
      if (!isTransitioning && entries[0].isIntersecting) {
        const totalImages = imagesByCategory[activeCategory].length;
        if (visibleCount < totalImages) {
          setVisibleCount(prev => Math.min(prev + 6, totalImages));
        }
      }
    }, options);

    if (lastItemRef.current) {
      observer.current.observe(lastItemRef.current);
    }

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [displayedImages, activeCategory, imagesByCategory, isTransitioning, visibleCount]);

  // Update displayed images when count changes or category changes
  useEffect(() => {
    if (!isTransitioning) {
      setDisplayedImages(imagesByCategory[activeCategory].slice(0, visibleCount));
    }
  }, [activeCategory, imagesByCategory, visibleCount, isTransitioning]);

  // Track scroll for animations
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

    handleScroll(); // Initial check
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Preload a small batch of images from each category for faster transitions
  useEffect(() => {
    // Preload first few images from each category
    Object.keys(imagesByCategory).forEach(category => {
      const imagesToPreload = imagesByCategory[category].slice(0, 4);

      imagesToPreload.forEach(image => {
        if (!allImagesCache.current[image.id]) {
          const img = new Image();
          img.src = typeof image.src === 'string' ? image.src : image.src;
          allImagesCache.current[image.id] = true;
        }
      });
    });
  }, [imagesByCategory]);
  useScrollToTop();

  return (
    <PageContainer ref={containerRef}>
      <HeadingContainer>
        <Subheading isVisible={isInView}>Our Signature Work</Subheading>
        <HeadingWrapper>
          <Heading isVisible={isInView}>Project Gallery</Heading>
        </HeadingWrapper>
        <Underline isVisible={isInView} />
        <IntroText isVisible={isInView}>
          Explore our diverse portfolio of design excellence across multiple industries.
          Each project showcases our commitment to innovation, quality, and exceptional
          craftsmanship that has defined our brand for over a decade.
        </IntroText>
      </HeadingContainer>

      <CategoryContainer>
        {categories.map((category, index) => (
          <CategoryButton
            key={category}
            index={index}
            active={activeCategory === category}
            onClick={() => handleCategoryChange(category)}
            disabled={isTransitioning}
          >
            {category}
          </CategoryButton>
        ))}
      </CategoryContainer>

      <GalleryGrid isTransitioning={isTransitioning}>
        {displayedImages.map((image, index) => {
          const layout = getItemLayout(index);
          const isLastItem = index === displayedImages.length - 1;

          return (
            <GalleryItem
              key={`${image.id}-${index}`}
              delay={index % 12 * 50}
              rowSpan={layout.rowSpan}
              isWide={layout.isWide}
              ref={isLastItem ? lastItemRef : null}
            >
              <GalleryImage
                src={typeof image.src === 'string' ? image.src : image.src}
                alt={image.title}
                onLoad={handleImageLoad}
              />
              <ImageOverlay client={image.title} projectType={image.tag} />
            </GalleryItem>
          );
        })}
      </GalleryGrid>
    </PageContainer>
  );
};

export default GalleryPage;