import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { FaLinkedin, FaMapMarkerAlt, FaWhatsapp, FaInstagram, FaEnvelope, FaPhone } from 'react-icons/fa';

const FooterWrapper = styled.footer`
    background-color: #212121;
    color: var(--color-text-primary);
    position: relative;
`;

const FooterTop = styled.div`
    position: relative;
    height: 5px;
    background: linear-gradient(90deg, rgba(212,175,55,0.7) 0%, rgba(212,175,55,1) 50%, rgba(212,175,55,0.7) 100%);
`;

const FooterContent = styled.div`
    max-width: 1400px;
    margin: 0 auto;
    padding: 5rem 2rem 1rem;
    
    @media screen and (max-width: 767px) {
        padding: 3rem 1.5rem 2rem;
    }
`;

const MainSection = styled.div`
    display: grid;
    grid-template-columns: 1.5fr 1fr 1fr;
    gap: 4rem;
    margin-bottom: 4rem;
    
    @media screen and (max-width: 1024px) {
        grid-template-columns: 1fr 1fr;
        gap: 3rem;
    }
    
    @media screen and (max-width: 767px) {
        grid-template-columns: 1fr;
        gap: 3rem;
    }
`;

const BrandSection = styled.div`
    @media screen and (max-width: 1024px) {
        grid-column: span 2;
    }
    
    @media screen and (max-width: 767px) {
        grid-column: span 1;
    }
`;

const LogoWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;
`;

const Logo = styled.img`
    height: 60px;
    width: auto;
`;

const LogoText = styled.div`    
    h2 {
        font-size: 1.8rem;
        font-weight: 400;
        color: var(--color-primary);
        margin: 0;
        letter-spacing: 1px;
    }
    
    span {
        font-size: 0.9rem;
        color: var(--color-text-secondary);
        letter-spacing: 1.5px;
        text-transform: uppercase;
    }
`;

const CompanyDescription = styled.p`
    font-size: 1rem;
    line-height: 1.8;
    color: var(--color-text-secondary);
    font-weight: 300;
    margin-bottom: 2rem;
    max-width: 90%;
`;

const ContactInfo = styled.div`
    display: flex;
    gap: 5rem;
    width: 100%;
    align-items: flex-start;
    flex-wrap: wrap;
    margin-bottom: 2rem;

    @media screen and (max-width: 900px){
        gap: 2rem;
    }
`;

const ContactItem = styled.div`
    display: flex;
    svg {
        color: var(--color-primary);
        margin-right: 1rem;
        min-width: 18px;
        margin-top: 4px;
    }
    
    div {
        display: flex;
        flex-direction: column;
    }
    
    span {
        color: var(--color-text-secondary);
        font-size: 0.95rem;
        line-height: 1.6;
    }
`;

const PhoneNumbersContainer = styled.div`
    display: flex;
    flex-direction: row !important;
    flex-wrap: wrap;
`;

const PhoneLink = styled.a`
    color: var(--color-text-secondary);
    text-decoration: none;
    transition: color 0.3s ease;
    
    &:hover {
        color: var(--color-primary);
    }
`;

const ContactLink = styled.a`
    color: var(--color-text-secondary);
    text-decoration: none;
    transition: color 0.3s ease;
    
    &:hover {
        color: var(--color-primary);
    }
`;

const Column = styled.div`
    display: flex;
    flex-direction: column;
`;

const ColumnTitle = styled.h3`
    color: #ffffff;
    font-size: 1.2rem;
    font-weight: 400;
    margin-bottom: 1.5rem;
    position: relative;
    padding-bottom: 1rem;
    
    &:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 40px;
        height: 2px;
        background-color: var(--color-primary);
    }
`;

const MenuLinks = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
    color: var(--color-text-secondary);
    text-decoration: none;
    font-size: 1rem;
    transition: all 0.3s ease;
    position: relative;
    padding-left: 15px;
    
    &:before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 5px;
        height: 5px;
        background-color: var(--color-primary);
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    &:hover {
        color: var(--color-primary);
        transform: translateX(5px);
        
        &:before {
            opacity: 1;
        }
    }
`;

const SocialSection = styled.div`
    margin-top: 2rem;
`;

const SocialTitle = styled.h4`
    font-size: 1rem;
    color: #ffffff;
    font-weight: 400;
    margin-bottom: 1rem;
`;

const SocialIcons = styled.div`
    display: flex;
    gap: 1rem;
`;

const SocialIcon = styled.a`
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.05);
    color: var(--color-text-secondary);
    transition: all 0.3s ease;
    
    &:hover {
        background-color: var(--color-primary);
        color: #212121;
        transform: translateY(-3px);
    }
`;

const FooterDivider = styled.div`
    height: 1px;
    background-color: rgba(255, 255, 255, 0.05);
    margin-bottom: 1.5rem;
`;

const FooterBottom = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    @media screen and (max-width: 767px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
    }
`;

const Copyright = styled.div`
    color: var(--color-accent);
    font-size: 0.9rem;
`;

const FooterNav = styled.div`
    display: flex;
    gap: 1.5rem;
    
    @media screen and (max-width: 500px) {
        flex-wrap: wrap;
        gap: 1rem 1.5rem;
    }
`;

const Footer = () => {
    const phoneNumbers = [
        { number: "+91 97181 22864", formatted: "+91 97181 22864" },
        { number: "+91 99990 33566", formatted: "+91 99990 33566" },
        { number: "+91 87556 44379", formatted: "+91 87556 44379" }
    ];

    const quickLinks = [
        { name: "Home", path: "/" },
        { name: "Portfolio", path: "/portfolio" },
        { name: "Gallery", path: "/gallery" },
        { name: "About Us", path: "/about" },
        { name: "Contact", path: "/contact" }
    ];

    const serviceLinks = [
        { name: "Residential Architecture", path: "/portfolio" },
        { name: "Commercial Architecture", path: "/portfolio" },
        { name: "Interior Design", path: "/portfolio" },
        { name: "Urban Planning", path: "/portfolio" },
        { name: "3D Visualization", path: "/portfolio" }
    ];

    return (
        <FooterWrapper>
            <FooterTop />
            <FooterContent>
                <MainSection>
                    <BrandSection>
                        <LogoWrapper>
                            <LogoText>
                                <h2>PAI Design Studio</h2>
                                <span>Architecture • Design • Innovation</span>
                            </LogoText>
                        </LogoWrapper>

                        <CompanyDescription>
                            PAI Design Studio is an award-winning architectural studio combining innovative design thinking with sustainable practices to create spaces that inspire and endure.
                        </CompanyDescription>
                    </BrandSection>
                    <Column>
                        <ColumnTitle>Quick Links</ColumnTitle>
                        <MenuLinks>
                            {quickLinks.map((link, index) => (
                                <StyledNavLink key={index} to={link.path}>
                                    {link.name}
                                </StyledNavLink>
                            ))}
                        </MenuLinks>
                    </Column>

                    <Column>
                        <ColumnTitle>Our Services</ColumnTitle>
                        <MenuLinks>
                            {serviceLinks.map((link, index) => (
                                <StyledNavLink key={index} to={link.path}>
                                    {link.name}
                                </StyledNavLink>
                            ))}
                        </MenuLinks>
                    </Column>
                </MainSection>
                <ContactInfo>
                    <ContactItem>
                        <FaMapMarkerAlt size={18} />
                        <span>G-03, Ground floor, D-15,<br />  Sector -3, Noida, Uttar Pradesh,201301</span>
                    </ContactItem>

                    <ContactItem>
                        <FaPhone size={18} />
                        <div>
                            <span>Call Us:</span>
                            <PhoneNumbersContainer>
                                {phoneNumbers.map((phone, index) => (
                                    <React.Fragment key={index}>
                                        <PhoneLink href={`tel:${phone.number.replace(/\s+/g, '')}`}>
                                            {phone.formatted}
                                        </PhoneLink>
                                        {index < phoneNumbers.length - 1 && <span>,&nbsp;</span>}
                                    </React.Fragment>
                                ))}
                            </PhoneNumbersContainer>
                        </div>
                    </ContactItem>

                    <ContactItem>
                        <FaEnvelope size={18} />
                        <div>
                            <span>Email Us:</span>
                            <ContactLink href="mailto:info@paidesignstudio.in">info@paidesignstudio.in</ContactLink>
                        </div>
                    </ContactItem>
                </ContactInfo>

                <FooterDivider />

                <FooterBottom>
                    <Copyright>
                        © {new Date().getFullYear()} PAI Design Studio. All Rights Reserved.
                    </Copyright>

                    <FooterNav>
                        <SocialIcon href="https://www.linkedin.com/company/paidesignstudio" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin size={18} />
                        </SocialIcon>
                        <SocialIcon href="https://www.instagram.com/pai.design.studio?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer">
                            <FaInstagram size={18} />
                        </SocialIcon>
                        <SocialIcon href="https://wa.me/+919718122864" target="_blank" rel="noopener noreferrer">
                            <FaWhatsapp size={18} />
                        </SocialIcon>
                    </FooterNav>
                </FooterBottom>
            </FooterContent>
        </FooterWrapper>
    );
};

export default Footer;