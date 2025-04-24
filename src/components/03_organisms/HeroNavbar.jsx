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

const BrandContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  opacity: ${({ hasAnimated }) => (hasAnimated ? 1 : 0.8)};
  ${({ shouldAnimate }) => shouldAnimate && animationMixin(pullFromTop)};
`;

const LogoImage = styled.img`
  width: auto;
  height: 40px;
  margin-right: 10px;
  filter: ${({ isHeroSection, isScrolled }) =>
    isHeroSection && !isScrolled
      ? 'brightness(0)'
      : 'brightness(0) invert(1)'};
  transition: filter 0.3s ease;
`;

const CompanyName = styled.h1`
  font-size: 1.3rem;
  font-weight: 700;
  letter-spacing: 1px;
  color: ${({ isHeroSection, isScrolled }) =>
    isHeroSection && !isScrolled ? '#000' : 'var(--color-primary)'};
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
  margin: 0;
  transition: color 0.3s ease;
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
  color: var(--color-primary);
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
    background-color: var(--color-accent);
    border-radius: 3px;
    transition: width 0.3s ease;
  }

  &:hover {
    color: var(--color-accent);
    &:after {
      width: 100%;
    }
  }

  &.active {
    color: var(--color-accent);
    font-weight: 600;

    &:after {
      width: 100%;
    }
  }
`;

const Hamburger = styled.div`
  font-size: 24px;
  cursor: pointer;
  color: ${({ isHeroSection, isScrolled }) =>
    isHeroSection && !isScrolled ? '#000' : 'var(--color-primary)'};
  display: none;
  opacity: ${({ hasAnimated }) => (hasAnimated ? 1 : 0)};
  ${({ shouldAnimate }) => shouldAnimate && animationMixin(pullFromTop)};
  transition: color 0.3s ease;

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
      setIsScrolled(true);
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
        <BrandContainer
          onClick={() => navigate('/')}
          shouldAnimate={shouldAnimate}
          hasAnimated={hasAnimated}
        >
          <LogoImage
            src="/logo.png"
            alt="PAI Design Studio Logo"
            isHeroSection={isHeroSection}
            isScrolled={isScrolled}
          />
          <CompanyName
            isHeroSection={isHeroSection}
            isScrolled={isScrolled}
          >
            PAI DESIGN STUDIO
          </CompanyName>
        </BrandContainer>

        <NavItems isHeroSection={isHeroSection} isScrolled={isScrolled}>
          <NavLink to="/" className={isActive('/') ? 'active' : ''} shouldAnimate={shouldAnimate} hasAnimated={hasAnimated} delay={0.2}>
            Home
          </NavLink>

          <NavLink to="/about" className={isActive('/about') ? 'active' : ''} shouldAnimate={shouldAnimate} hasAnimated={hasAnimated} delay={0.4}>
            About
          </NavLink>

          <NavLink to="/portfolio" className={isActive('/portfolio') ? 'active' : ''} shouldAnimate={shouldAnimate} hasAnimated={hasAnimated} delay={0.5}>
            Portfolio
          </NavLink>

          <NavLink to="/gallery" className={isActive('/gallery') ? 'active' : ''} shouldAnimate={shouldAnimate} hasAnimated={hasAnimated} delay={0.6}>
            Gallery
          </NavLink>

          <NavLink to="/contact" className={isActive('/contact') ? 'active' : ''} shouldAnimate={shouldAnimate} hasAnimated={hasAnimated} delay={0.7}>
            Contact
          </NavLink>
        </NavItems>

        <Hamburger
          onClick={() => setIsMobileMenuOpen(true)}
          shouldAnimate={shouldAnimate}
          hasAnimated={hasAnimated}
          isHeroSection={isHeroSection}
          isScrolled={isScrolled}
        >
          <FaBars />
        </Hamburger>
      </NavLayout>

      <MobileNavbar isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} isActive={isActive} />
    </>
  );
};

export default HeroNavbar;