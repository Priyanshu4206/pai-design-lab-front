import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { FaLinkedin, FaLocationArrow, FaWhatsapp } from 'react-icons/fa';
import { footerData } from '../../dummyData/dummyData';

const FooterWrapper = styled.footer`
    background-color: var(--color-surface);
    padding: 2rem;
    padding-bottom: 1rem;
    padding-top: 0;
    color: var(--color-primary);

    @media screen and (max-width: 550px){
        padding: 2rem 1rem;
    }
`;

const MainSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 2rem;
  padding: 2rem 0;
  padding-bottom: 1rem;
  border-bottom: 1px solid #ddd;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const DetailsContainer = styled.div`
    flex: 1;
    min-width: 200px;
    align-self: center;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
`;

const CompanyDescription = styled.p`
    width: 75%;
    font-size: 1rem;
    line-height: 1.5;
    font-weight: 200;

    @media screen and (max-width: 768px){
        width: 100%;
    }
`;

const MenuContainer = styled.div`
    flex: 1;
    display: flex;
    gap: 4rem;
    flex-wrap: wrap;
    width: 100%;

    @media screen and (max-width: 550px){
        gap: 2rem;
    }
`;

const CompanyAddress = styled.div`
    margin: 1rem 0;
    line-height: 1.4;
    width: 85%;

    span {
        font-size: 0.9rem;
        font-weight: 200;
        color: var(--color-secondary);
    }
`;


const Column = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 110px;
`;

const LogoWrapper = styled.img`
    width: 250px;
    height: auto;
    cursor: pointer;

    @media screen and (max-width: 450px){
        margin: auto;
    }
`;

const Category = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const CategoryHead = styled.h4`
  font-weight: 400;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: var(--color-primary);
`;

const NavItem = styled(NavLink)`
  display: block;
  margin: 0.3rem 0;
  color: var(--color-secondary);
  font-size: 1rem;
  font-weight: 100;
  text-decoration: none;

  &:hover {
    color: var(--color-primary);
  }
`;

const Button = styled.button`
  background-color: #fbeee0;
  border: 2px solid #422800;
  border-radius: 30px;
  color: #422800;
  cursor: pointer;
  font-weight: 600;
  font-size: 18px;
  padding: 0 18px;
  line-height: 50px;
  text-align: center;
  text-decoration: none;
  user-select: none;
  touch-action: manipulation;
  transition: all 0.2s ease;
  width: fit-content;
  min-width: 200px;
  &:hover {
    background-color:rgb(200, 191, 181); 
  }

  @media screen and (max-width: 900px){
    display: none;
  }
`;

const SocialMediaSection = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const IconWrapper = styled.div`
  border-radius: 50%;
  padding: 10px;
  background-color: transparent;
  border: 1px solid #ddd;
  transition: all 0.3s ease-in-out;

  &:hover {
    border-color: var(--color-primary);
    cursor: pointer;
  }
`;

const CopyWriteWrapper = styled.div`
    text-align: center;
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;

    @media screen and (max-width: 768px){
        justify-content: center;
    }
`;

const LocationLink = styled.a`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none;
    color: var(--color-primary);
    font-size: 0.95rem;

    svg {
        color: var(--color-primary);
        transition: color 0.3s ease;
    }

    &:hover svg {
        color: var(--color-secondary);
    }
`;

const Footer = () => {
    return (
        <FooterWrapper>
            <MainSection>
                <DetailsContainer>
                    <LogoWrapper
                        src="/logo.png"
                        alt="Company Logo"
                        onClick={() => window.location.href = "/"}
                    />

                    <CompanyDescription>
                        Transform your Ayurveda or Homeopathy clinic with MedApps by Finprod Technologies—streamlining operations and elevating patient care.
                    </CompanyDescription>

                    <CompanyAddress>
                        <LocationLink
                            href="https://www.google.com/maps/place/F-19,+Krishna+Apra+Plaza,+Alpha+Commercial+Belt,+Greater+Noida,+Uttar+Pradesh+-+201310"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaLocationArrow size={24} />
                            <span>F-19, Krishna Apra Plaza, Alpha Commercial Belt, Greater Noida, UP - 201310</span>
                        </LocationLink>
                    </CompanyAddress>

                    <Button onClick={() => window.location.href = "/support/contact-us"}>
                        Get In Touch
                    </Button>
                </DetailsContainer>

                <MenuContainer>
                    {footerData.map((category, index) => (
                        <Column key={index}>
                            <Category>
                                <CategoryHead>{category.title}</CategoryHead>
                                {category.links.map((link, idx) => (
                                    <NavItem key={idx} to={link.path}>
                                        {link.name}
                                    </NavItem>
                                ))}
                            </Category>
                        </Column>
                    ))}
                </MenuContainer>
            </MainSection>

            <CopyWriteWrapper>
                <p>© Copyright 2025, All Rights Reserved by Finprod Technologies Private Limited</p>
                <SocialMediaSection>
                    <IconWrapper onClick={() => window.open("https://www.linkedin.com/company/finprod-technologies-private-limited/", "_blank")}>
                        <FaLinkedin size={20} />
                    </IconWrapper>
                    <IconWrapper
                        onClick={() =>
                            window.open("https://wa.me/+919910355890", "_blank", "noopener,noreferrer")
                        }
                    >
                        <FaWhatsapp size={20} />
                    </IconWrapper>
                </SocialMediaSection>
            </CopyWriteWrapper>
        </FooterWrapper >
    );
};

export default Footer;
