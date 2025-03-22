import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';

const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.95);
  z-index: 999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform: translateY(${({ isOpen }) => (isOpen ? '0' : '-100%')});
  transition: transform 0.4s ease-in-out;
`;

const CloseButton = styled.div`
  position: absolute;
  top: 2rem;
  right: 2rem;
  font-size: 24px;
  color: var(--color-primary, #fff);
  cursor: pointer;
`;

const MobileNavLinks = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const MobileLink = styled(Link)`
  position: relative;
  font-size: 1.5rem;
  color: var(--color-primary, #fff);
  text-decoration: none;
  padding: 0.5rem 1rem;
  transition: color 0.3s ease;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 3px;
    background-color: var(--color-accent, #f8c675);
    border-radius: 3px;
    transition: width 0.3s ease;
  }
  
  &:hover {
    color: var(--color-accent, #f8c675);
    
    &:after {
      width: 100%;
    }
  }
  
  &.active {
    color: var(--color-accent, #f8c675);
    
    &:after {
      width: 100%;
    }
  }
`;

const MobileNavbar = ({ isOpen, setIsOpen, isActive }) => {
    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <MobileMenu isOpen={isOpen}>
            <CloseButton onClick={handleClose}>
                <FaTimes />
            </CloseButton>

            <MobileNavLinks>
                <MobileLink
                    to="/"
                    className={isActive('/') ? 'active' : ''}
                    onClick={handleClose}
                >
                    Home
                </MobileLink>

                <MobileLink
                    to="/about"
                    className={isActive('/about') ? 'active' : ''}
                    onClick={handleClose}
                >
                    About
                </MobileLink>

                <MobileLink
                    to="/portfolio"
                    className={isActive('/portfolio') ? 'active' : ''}
                    onClick={handleClose}
                >
                    Portfolio
                </MobileLink>

                <MobileLink
                    to="/gallery"
                    className={isActive('/gallery') ? 'active' : ''}
                    onClick={handleClose}
                >
                    Gallery
                </MobileLink>

                <MobileLink
                    to="/contact"
                    className={isActive('/contact') ? 'active' : ''}
                    onClick={handleClose}
                >
                    Contact
                </MobileLink>
            </MobileNavLinks>
        </MobileMenu>
    );
};

export default MobileNavbar;