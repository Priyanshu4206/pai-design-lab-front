import React, { useState, useEffect, useRef } from 'react';
import { projects } from '../../dummyData/dummyData';
import Project from './Project';
import {
    ProjectsContainer,
    ProjectsInner,
    HeadingContainer,
    Subheading,
    HeadingWrapper,
    Heading,
    Underline
} from './PortfolioStyles';
import useScrollToTop from '../../hooks/useScrollToTop';

const PortfolioPage = () => {
    const [isInView, setIsInView] = useState(false);
    const [visibleProjects, setVisibleProjects] = useState([0]);
    const containerRef = useRef(null);
    const projectRefs = useRef([]);

    // Initialize refs for each project
    useEffect(() => {
        projectRefs.current = Array(projects.length).fill().map((_, i) => projectRefs.current[i] || React.createRef());
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            // Check if main heading is in view
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                const viewportHeight = window.innerHeight;

                if (rect.top < viewportHeight * 0.75 && rect.bottom > 0) {
                    setIsInView(true);
                }
            }

            // Check which projects are in view
            projectRefs.current.forEach((ref, index) => {
                if (ref.current) {
                    const rect = ref.current.getBoundingClientRect();
                    const viewportHeight = window.innerHeight;

                    if (rect.top < viewportHeight * 0.9 && rect.bottom > 0) {
                        setVisibleProjects(prev => {
                            if (!prev.includes(index)) {
                                return [...prev, index];
                            }
                            return prev;
                        });
                    }
                }
            });
        };

        handleScroll(); // Check on initial load
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    useScrollToTop();

    return (
        <ProjectsContainer ref={containerRef}>
            <ProjectsInner>
                <HeadingContainer>
                    <Subheading isVisible={isInView}>Our Client Stories</Subheading>
                    <HeadingWrapper>
                        <Heading isVisible={isInView}>Our Projects</Heading>
                    </HeadingWrapper>
                    <Underline isVisible={isInView} />
                </HeadingContainer>

                {projects.map((project, index) => (
                    <div
                        key={index}
                        ref={projectRefs.current[index]}
                        style={{ opacity: visibleProjects.includes(index) ? 1 : 0, transition: 'opacity 0.5s ease' }}
                    >
                        {visibleProjects.includes(index) && (
                            <Project
                                project={project}
                                index={index}
                            />
                        )}
                    </div>
                ))}
            </ProjectsInner>
        </ProjectsContainer>
    );
};

export default PortfolioPage;