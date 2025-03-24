import React, { useState, useEffect, useRef } from 'react';
import { Calendar, MapPin, ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react';
import {
    ProjectHeaderTitle,
    ProjectNumber,
    ProjectCard,
    ProjectCardReversed,
    ProjectImageContainerLeft,
    ProjectImageContainerRight,
    SlideShowContainer,
    ProjectImage,
    SlideControls,
    SlideButton,
    ViewToggleButton,
    SlideIndicators,
    SlideIndicator,
    ProjectMeta,
    MetaItem,
    MetaText,
    ProjectContent,
    ProjectDetailsGrid,
    DetailItem,
    DetailLabel,
    DetailValue,
    ProjectDescription,
    ModalOverlay,
    ModalContent,
    ModalClose,
    GalleryMainImage,
    GalleryThumbnailsContainer,
    GalleryThumbnail,
    ProjectHeaderContainer
} from './PortfolioStyles';

const Project = ({ project, index }) => {
    const isEven = (index + 1) % 2 === 0;
    const [currentSlide, setCurrentSlide] = useState(0);
    const [showGallery, setShowGallery] = useState(false);
    const [autoPlay, setAutoPlay] = useState(true);
    const [isHeaderVisible, setIsHeaderVisible] = useState(false);
    const headerRef = useRef(null);

    // Determine which component to use based on index
    const CardComponent = isEven ? ProjectCardReversed : ProjectCard;
    const ImageContainer = isEven ? ProjectImageContainerRight : ProjectImageContainerLeft;

    // Check if project header is in view
    useEffect(() => {
        const handleScroll = () => {
            if (headerRef.current) {
                const rect = headerRef.current.getBoundingClientRect();
                const viewportHeight = window.innerHeight;

                if (rect.top < viewportHeight * 0.85) {
                    setIsHeaderVisible(true);
                }
            }
        };

        handleScroll(); // Check on initial load
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        if (showGallery) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [showGallery]);

    // Handle slideshow
    useEffect(() => {
        let slideTimer;

        if (autoPlay && project.imgs && project.imgs.length > 1) {
            slideTimer = setInterval(() => {
                setCurrentSlide(prev => (prev + 1) % project.imgs.length);
            }, 5000);
        }

        return () => clearInterval(slideTimer);
    }, [autoPlay, project.imgs]);

    const nextSlide = (e) => {
        e.stopPropagation();
        if (project.imgs && project.imgs.length > 1) {
            setCurrentSlide(prev => (prev + 1) % project.imgs.length);
        }
    };

    const prevSlide = (e) => {
        e.stopPropagation();
        if (project.imgs && project.imgs.length > 1) {
            setCurrentSlide(prev => (prev - 1 + project.imgs.length) % project.imgs.length);
        }
    };

    const goToSlide = (index, e) => {
        if (e) e.stopPropagation();
        setCurrentSlide(index);
    };

    const toggleGallery = (e) => {
        if (e) e.stopPropagation();
        setShowGallery(!showGallery);
        setAutoPlay(!showGallery);
    };

    return (
        <>
            <ProjectHeaderContainer ref={headerRef}>
                <ProjectHeaderTitle isVisible={isHeaderVisible}>
                    {project.name}
                </ProjectHeaderTitle>
                <ProjectNumber isVisible={isHeaderVisible}>
                    {index < 10 ? "0" : ""}{index + 1}
                </ProjectNumber>
            </ProjectHeaderContainer>

            <CardComponent>
                <ImageContainer>
                    {project.imgs && project.imgs.length > 0 && (
                        <SlideShowContainer onClick={() => setAutoPlay(!autoPlay)}>
                            <ProjectImage
                                src={project.imgs[currentSlide]}
                                alt={`${project.name} - Image ${currentSlide + 1}`}
                                onClick={toggleGallery}
                            />

                            <ViewToggleButton onClick={toggleGallery}>
                                {showGallery ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                            </ViewToggleButton>

                            {project.imgs.length > 1 && (
                                <>
                                    <SlideControls>
                                        <SlideButton onClick={prevSlide}>
                                            <ChevronLeft size={24} />
                                        </SlideButton>
                                        <SlideButton onClick={nextSlide}>
                                            <ChevronRight size={24} />
                                        </SlideButton>
                                    </SlideControls>

                                    <SlideIndicators>
                                        {project.imgs.map((_, i) => (
                                            <SlideIndicator
                                                key={i}
                                                active={i === currentSlide}
                                                onClick={(e) => goToSlide(i, e)}
                                            />
                                        ))}
                                    </SlideIndicators>
                                </>
                            )}
                        </SlideShowContainer>
                    )}
                    <ProjectMeta>
                        <MetaItem>
                            <Calendar size={16} color="var(--color-primary)" />
                            <MetaText>{project.year}</MetaText>
                        </MetaItem>
                        <MetaItem>
                            <MapPin size={16} color="var(--color-primary)" />
                            <MetaText>{project.location}</MetaText>
                        </MetaItem>
                    </ProjectMeta>
                </ImageContainer>

                <ProjectContent>
                    <ProjectDetailsGrid>
                        <DetailItem>
                            <DetailLabel>CLIENT</DetailLabel>
                            <DetailValue>{project.client}</DetailValue>
                        </DetailItem>
                        <DetailItem>
                            <DetailLabel>BUILT UP</DetailLabel>
                            <DetailValue>{project.builtUp}</DetailValue>
                        </DetailItem>
                        <DetailItem>
                            <DetailLabel>TYPOLOGY</DetailLabel>
                            <DetailValue>{project.typology}</DetailValue>
                        </DetailItem>
                        <DetailItem>
                            <DetailLabel>STATUS</DetailLabel>
                            <DetailValue>{project.status}</DetailValue>
                        </DetailItem>
                    </ProjectDetailsGrid>
                    <ProjectDescription>{project.description}</ProjectDescription>
                </ProjectContent>
            </CardComponent>

            {/* Enhanced Image Gallery Modal */}
            {showGallery && (
                <ModalOverlay onClick={toggleGallery}>
                    <ModalContent onClick={e => e.stopPropagation()}>
                        <ModalClose onClick={toggleGallery}>×</ModalClose>
                        <h3>{project.name} - Gallery</h3>

                        {/* Main large image display */}
                        <GalleryMainImage
                            src={project.imgs[currentSlide]}
                            alt={`${project.name} - Image ${currentSlide + 1}`}
                        />

                        {/* Thumbnails for navigation */}
                        <GalleryThumbnailsContainer>
                            {project.imgs && project.imgs.map((img, i) => (
                                <GalleryThumbnail
                                    key={i}
                                    onClick={() => goToSlide(i)}
                                    active={i === currentSlide}
                                >
                                    <img
                                        src={img}
                                        alt={`${project.name} - Thumbnail ${i + 1}`}
                                    />
                                </GalleryThumbnail>
                            ))}
                        </GalleryThumbnailsContainer>

                        {/* Navigation arrows for main image */}
                        <SlideButton
                            className="gallery-prev-btn"
                            onClick={prevSlide}
                            aria-label="Previous image"
                        >
                            <ChevronLeft size={24} />
                        </SlideButton>
                        <SlideButton
                            className="gallery-next-btn"
                            onClick={nextSlide}
                            aria-label="Next image"
                        >
                            <ChevronRight size={24} />
                        </SlideButton>
                    </ModalContent>
                </ModalOverlay>
            )}
        </>
    );
};

export default Project;