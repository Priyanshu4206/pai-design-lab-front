import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled, { css, keyframes } from 'styled-components';
import { FaBars } from 'react-icons/fa';
import useInView from '../../hooks/useInView';
import MobileNavbar from './MobileNavbar';

const pullFromTop = keyframes`
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const animationMixin = (animation, delay = 0) => css`
  animation: ${animation} 0.5s ease ${delay}s forwards;
`;

const NavLayout = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  padding: 1rem 3rem;
  background-color: ${({ isHeroSection, isScrolled }) =>
    isHeroSection && !isScrolled ? 'transparent' : 'rgba(0, 0, 0, 0.7)'};
  backdrop-filter: ${({ isHeroSection, isScrolled }) =>
    isHeroSection && !isScrolled ? 'none' : 'blur(5px)'};
  transition: background-color 0.3s ease, backdrop-filter 0.3s ease;

  @media screen and (max-width: 768px) {
    padding: 1rem;
  }
`;

const LogoContainer = styled.img`
  width: 200px;
  height: auto;
  cursor: pointer;
  filter: contrast(150%);
  /* Always initialize with opacity 1 when animation is complete */
  opacity: ${({ hasAnimated }) => (hasAnimated ? 1 : 0.8)};
  /* Only animate if shouldAnimate is true, but always ensure visibility */
  ${({ shouldAnimate }) => shouldAnimate && animationMixin(pullFromTop)};
  /* Add display property to ensure always visible */
  display: block;
`;

const NavItems = styled.div`
  display: ${({ isHeroSection, isScrolled }) =>
    isHeroSection && !isScrolled ? 'none' : 'flex'};
  gap: 2rem;
  align-items: center;
  margin-left: auto;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  position: relative;
  cursor: pointer;
  font-size: 1.1rem;
  color: var(--color-accent, #f8c675);
  text-decoration: none;
  padding: 0.5rem 1rem;
  opacity: ${({ hasAnimated }) => (hasAnimated ? 1 : 0)};
  ${({ shouldAnimate, delay }) => shouldAnimate && animationMixin(pullFromTop, delay)};
  transition: color 0.3s ease;

  &:after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 3px;
    background-color: var(--color-primary, #fff);
    border-radius: 3px;
    transition: width 0.3s ease;
  }

  &:hover {
    color: var(--color-primary, #fff);
    &:after {
      width: 100%;
    }
  }

  &.active {
    color: var(--color-primary, #fff);
    font-weight: 600;

    &:after {
      width: 100%;
    }
  }
`;

const Hamburger = styled.div`
  font-size: 24px;
  cursor: pointer;
  color: var(--color-primary, #fff);
  display: none;
  opacity: ${({ hasAnimated }) => (hasAnimated ? 1 : 0)};
  ${({ shouldAnimate }) => shouldAnimate && animationMixin(pullFromTop)};

  @media screen and (max-width: 768px) {
    display: block;
  }
`;

const HeroNavbar = () => {
  const location = useLocation();
  const navRef = useRef(null);
  const inView = useInView(navRef);
  const navigate = useNavigate();
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Check if the current route is the Hero Section ("/")
  const isHeroSection = location.pathname === '/';

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    if (isHeroSection) {
      window.addEventListener('scroll', handleScroll);
    } else {
      setIsScrolled(true); // Always show the navbar background on other pages
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHeroSection]);

  // Track if initial animation has completed
  useEffect(() => {
    if (inView && !hasAnimated) {
      const timer = setTimeout(() => {
        setHasAnimated(true);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [inView, hasAnimated]);

  // Close mobile menu when location changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Determine if we should animate
  const shouldAnimate = inView && !hasAnimated;

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <NavLayout ref={navRef} isHeroSection={isHeroSection} isScrolled={isScrolled}>
        <LogoContainer
          src="/logo.png"
          alt="Logo"
          onClick={() => navigate('/')}
          shouldAnimate={shouldAnimate}
          hasAnimated={hasAnimated}
        />

        <NavItems isHeroSection={isHeroSection} isScrolled={isScrolled}>
          <NavLink to="/" className={isActive('/') ? 'active' : ''} shouldAnimate={shouldAnimate} hasAnimated={hasAnimated} delay={0.2}>
            Home
          </NavLink>

          <NavLink to="/portfolio" className={isActive('/portfolio') ? 'active' : ''} shouldAnimate={shouldAnimate} hasAnimated={hasAnimated} delay={0.4}>
            Portfolio
          </NavLink>

          <NavLink to="/gallery" className={isActive('/gallery') ? 'active' : ''} shouldAnimate={shouldAnimate} hasAnimated={hasAnimated} delay={0.5}>
            Gallery
          </NavLink>

          <NavLink to="/contact" className={isActive('/contact') ? 'active' : ''} shouldAnimate={shouldAnimate} hasAnimated={hasAnimated} delay={0.6}>
            Contact
          </NavLink>
        </NavItems>

        <Hamburger onClick={() => setIsMobileMenuOpen(true)} shouldAnimate={shouldAnimate} hasAnimated={hasAnimated}>
          <FaBars />
        </Hamburger>
      </NavLayout>

      <MobileNavbar isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} isActive={isActive} />
    </>
  );
};

export default HeroNavbar;