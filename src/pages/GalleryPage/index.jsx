import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { images } from '../../dummyData/dummyData';
// Using react-lazy-load-image-component for better performance
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

// Styled Components
const PageContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  margin-top: 70px;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  text-align: center;
  @media (min-width: 768px){
    font-size: 3rem;
  }
  @media (min-width: 1024px) { 
    font-size: 3.75rem;
  }
  color: white;
  margin-bottom: 1.5rem;

  span {
    font-family: 'Playfair Display', Times, serif;
    background: linear-gradient(to right, white, white, rgba(193, 164, 96, 0.9));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
`;

const PageSubtitle = styled.p`
  text-align: center;
  color: #ccc;
  margin-bottom: 3rem;
  font-size: 1.2rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
`;

const CategoryContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
  gap: 1.2rem;
`;

const CategoryButton = styled.button`
  background: ${props => props.active ? 'var(--color-primary)' : 'transparent'};
  color: ${props => props.active ? '#000' : '#fff'};
  border: ${props => props.active ? 'none' : '1px solid rgba(255, 255, 255, 0.3)'};
  padding: 0.6rem 1.5rem;
  margin: 0 0.5rem 0.5rem 0.5rem;
  border-radius: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 200;
  font-size: 1rem;
  
  &:hover {
    background: ${props => props.active ? 'var(--color-primary)' : 'rgba(255, 255, 255, 0.1)'};
  }
`;

// Using CSS Grid for better memory and layout performance with more varied staggering
const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1.5rem;
  grid-auto-rows: minmax(200px, auto);
  grid-auto-flow: dense;
  
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

const GalleryItem = styled.div`
  position: relative;
  overflow: hidden;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
  transform: translateY(20px);
  opacity: 0;
  animation: fadeIn 0.5s forwards;
  animation-delay: ${props => props.delay}ms;
  height: 100%;
  will-change: transform, box-shadow; /* Hardware acceleration hint */
  transform-style: preserve-3d; /* Improves hover animations */
  backface-visibility: hidden; /* Smoother transitions */
  
  /* Create a grid cell that spans based on pattern and randomized heights */
  grid-row: span ${props => props.rowSpan || 1};
  ${props => props.isWide ? 'grid-column: span 2;' : ''}
  
  transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94),
              box-shadow 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  
  img{
    transition: all 0.2s ease-in-out;
  }

  &:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
    z-index: 2;
    
    .overlay {
      opacity: 1;
    }
  }
  
  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  
  .lazy-load-image-background {
    width: 100%;
    height: 100%;
    display: block !important;
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    will-change: transform; /* Hardware acceleration hint */
  }
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
  z-index: 1;
  transform: translateZ(0); /* Helps with rendering */
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

// ImageOverlay component with enhanced animations
const ImageOverlay = ({ client, projectType }) => (
  <Overlay className="overlay">
    <ClientName>{client}</ClientName>
    <ProjectType>{projectType}</ProjectType>
  </Overlay>
);

// Main Gallery Component
const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState('All Images');
  const [galleryImages, setGalleryImages] = useState([]);
  const [visibleCount, setVisibleCount] = useState(12); // Initial batch of images

  // Extract unique categories from images
  const categories = useMemo(() =>
    ['All Images', ...new Set(images.map(img => img.category))],
    []
  );

  // Fisher-Yates shuffle algorithm with improved randomness
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Filtering images based on category
  useEffect(() => {
    const filtered = activeCategory === 'All Images'
      ? images
      : images.filter(img => img.category === activeCategory);

    // Reset visible count when category changes
    setVisibleCount(12);
    setGalleryImages(shuffleArray(filtered));
  }, [activeCategory]);

  // Lazy load more images when scrolling near the bottom
  useEffect(() => {
    const handleScroll = () => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500
        && visibleCount < galleryImages.length) {
        setVisibleCount(prev => Math.min(prev + 6, galleryImages.length));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleCount, galleryImages.length]);

  // Create highly varied layouts with different spans for each image
  const getItemLayout = (index) => {
    // Create varied row spans for more interesting staggered layout
    const patterns = [
      { rowSpan: 1, isWide: false },   // Standard 1x1
      { rowSpan: 1, isWide: false },   // Standard 1x1
      { rowSpan: 2, isWide: false },   // Tall 1x2
      { rowSpan: 1, isWide: true },    // Wide 2x1
      { rowSpan: 1, isWide: false },   // Standard 1x1
      { rowSpan: 1, isWide: false },   // Standard 1x1
      { rowSpan: 2, isWide: false },   // Tall 1x2
      { rowSpan: 1, isWide: false },   // Standard 1x1
      { rowSpan: 2, isWide: true },    // Large 2x2 (spanning both)
      { rowSpan: 1, isWide: false },   // Standard 1x1
      { rowSpan: 1, isWide: false },   // Standard 1x1
      { rowSpan: 1, isWide: true }     // Wide 2x1
    ];

    return patterns[index % patterns.length];
  };

  // Show only the first batch of images for performance
  const visibleImages = useMemo(() =>
    galleryImages.slice(0, visibleCount),
    [galleryImages, visibleCount]
  );

  return (
    <PageContainer>
      <Title>
        <span>Gallery</span>
      </Title>
      <PageSubtitle>
        A visual journey through our architectural creations, showcasing the beauty and detail of our designs.
      </PageSubtitle>

      <CategoryContainer>
        {categories.map(category => (
          <CategoryButton
            key={category}
            active={activeCategory === category}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </CategoryButton>
        ))}
      </CategoryContainer>

      <GalleryGrid>
        {visibleImages.map((image, index) => {
          const layout = getItemLayout(index);
          return (
            <GalleryItem
              key={`${image.id}-${index}`}
              delay={index % 12 * 50}
              rowSpan={layout.rowSpan}
              isWide={layout.isWide}
            >
              <ImageWrapper>
                <LazyLoadImage
                  src={typeof image.src === 'string' ? image.src : image.src}
                  alt={image.title}
                  effect="blur"
                  threshold={100}
                  placeholderSrc="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
                />
              </ImageWrapper>
              <ImageOverlay client={image.title} projectType={image.tag} />
            </GalleryItem>
          );
        })}
      </GalleryGrid>
    </PageContainer>
  );
};

export default GalleryPage;