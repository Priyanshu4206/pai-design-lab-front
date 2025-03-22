import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

// Styled Components for animation
const RevealSection = styled.div`
  &.reveal {
    opacity: 0;
    transform: translateY(50px);
    transition: all 0.8s ease;
  }
  
  &.reveal-left {
    opacity: 0;
    transform: translateX(-50px);
    transition: all 0.8s ease;
  }
  
  &.reveal-right {
    opacity: 0;
    transform: translateX(50px);
    transition: all 0.8s ease;
  }
  
  &.active {
    opacity: 1;
    transform: translate(0);
  }
`;

const AnimatedSection = ({
  children,
  className = '',
  delay = 0,
  direction = 'up'
}) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('active');
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [delay]);

  const getRevealClass = () => {
    switch (direction) {
      case 'left':
        return 'reveal-left';
      case 'right':
        return 'reveal-right';
      case 'up':
      default:
        return 'reveal';
    }
  };

  return (
    <RevealSection ref={sectionRef} className={`${getRevealClass()} ${className}`}>
      {children}
    </RevealSection>
  );
};

export default AnimatedSection;