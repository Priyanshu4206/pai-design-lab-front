import React, { useState, useEffect, useRef, createElement } from "react";
import styled, { keyframes } from "styled-components";
import { MdNavigateNext } from "react-icons/md";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { leftCards, navItems } from "../../dummyData/dummyData";
import { useNavigate } from "react-router";

const slideIn = keyframes`
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-20px);
    opacity: 0;
  }
`;

const NavbarContainer = styled.nav`
  display: ${(props) => (props.isVisible ? "flex" : "none")};
  justify-content: space-between;
  gap: 5rem;
  align-items: center;
  padding: 1rem 2rem;
  background-color: rgba(0,0,0,0.5);
  backdrop-filter: blur(10px);
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  height: 70px;
  box-shadow: ${(props) =>
    props.scrolled ? "0px 4px 6px rgba(0, 0, 0, 0.1)" : "none"};
  
  @media screen and (max-width: 1024px){
    gap: 2.5rem;
  }
`;

const LogoContainer = styled.img`
    width: 175px;
    height: auto;
    cursor: pointer;
    filter: contrast(150%);
`;

const NavItems = styled.div`
  display: flex;
  flex: 1;
  gap: 2.5rem;
  height: 100%;
`;

const NavItem = styled.div`
  position: relative;
  cursor: pointer;
  display: flex;
  padding: 1rem 0;
`;

const LeftWrapper = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
`;

const DropdownToggle = styled.span`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.1rem;
  color: var(--color-primary);
`;

const GetInTouchButton = styled.button`
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

  &:hover {
    background-color:rgb(200, 191, 181); 
  }

  @media screen and (max-width: 900px){
    display: none;
  }
`;

const MegaMenuContainer = styled.div`
  display: flex;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  position: fixed;
  top: 70px;
  left: 0;
  width: 100%;
  z-index: 999;
  animation: ${({ isExiting }) => (isExiting ? slideOut : slideIn)} 0.3s forwards;
`;

const LeftCards = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 2rem;
  flex-direction: column;
  gap: 1rem;
  width: 400px;
  background-color: var(--color-background);
`;

const Card = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem;
  background: var(--color-surface);
  border-radius: 20px;
  box-shadow: 0 1px 12px rgba(0, 0, 0, 0.2);
  
  img {
    width: 125px;
    aspect-ratio: 1;
    border-radius: 20px;
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  h4 {
    margin: 0;
    font-size: 20px;
        color: var(--color-primary);
  }

  p {
    font-size: 17px;
    margin: 0.25rem 0;
    color: #8B5C43;
  }

  a {
    color: var(--color-secondary);

    letter-spacing: 2px;
    width: fit-content;
    display: flex;
    align-items: center;
    padding: 5px;
    text-decoration: none;
    font-size: 0.9rem;
    border-radius: 3px;
    transition: all 0.2s ease-in-out;

    &:hover{
        letter-spacing: 3px;
    }
  }
`;

const MenuColumns = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6%;
  padding: 2rem;
  overflow-y: scroll;
  flex: 1;
`;

const MenuColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  h5 {
    font-weight: bold;
    font-size: 20px;
    color: var(--color-primary);
  }

  a {
    color: var(--color-secondary);
    text-decoration: none;
    font-size: 17px;
    transition: color 0.3s;
    
    &:hover {
      color: var(--color-accent);
    }
  }
`;

const ColumnHeading = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    margin-bottom: 0.5rem;
`;

const IconWrapper = styled.span`
    color: var(--color-primary);
`;

const LinksList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-left: 21px;
`;

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isExiting, setIsExiting] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const megaMenuRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const triggerHeight = 70;
      setIsScrolled(currentScroll > 0);
      setIsVisible(currentScroll > triggerHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const toggleDropdown = (label) => {
    if (activeDropdown === label) {
      setIsExiting(true);
      setTimeout(() => {
        setActiveDropdown(null);
        setIsExiting(false);
      }, 300);
    } else {
      setActiveDropdown(label);
    }
  };

  const handleClickOutside = (e) => {
    if (
      megaMenuRef.current &&
      !megaMenuRef.current.contains(e.target) &&
      !e.target.closest(".dropdown-toggle")
    ) {
      setIsExiting(true);
      setTimeout(() => {
        setActiveDropdown(null);
        setIsExiting(false);
      }, 300);
    }
  };

  useEffect(() => {
    if (activeDropdown) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [activeDropdown]);

  return (
    <>
      <NavbarContainer
        scrolled={isScrolled && activeDropdown == null ? "true" : undefined}
        isVisible={isVisible}
      >
        <LogoContainer
          src="/logo.png"
          alt="Pai Design Lab"
          onClick={() => {
            navigate('/');
          }}
        />
        <LeftWrapper>
          <NavItems>
            {navItems.map((item) => (
              <NavItem key={item.label}>
                {item.dropdown ? (
                  <DropdownToggle
                    className="dropdown-toggle"
                    onClick={() => toggleDropdown(item.label)}
                  >
                    {item.label}
                    {activeDropdown === item.label ? (
                      <BsChevronUp color="var(--color-primary)" className="dropdown-toggle" />
                    ) : (
                      <BsChevronDown color="var(--color-primary)" className="dropdown-toggle" />
                    )}
                  </DropdownToggle>
                ) : (
                  <a href={item.link}>{item.label}</a>
                )}
              </NavItem>
            ))}
          </NavItems>
          <GetInTouchButton
            onClick={() => navigate('/support/contact-us')}
          >
            Get in Touch
          </GetInTouchButton>
        </LeftWrapper>
      </NavbarContainer>

      {navItems.map(
        (item) =>
          item.dropdown &&
          activeDropdown === item.label && (
            <MegaMenuContainer
              key={item.label}
              isExiting={isExiting}
              ref={megaMenuRef}
            >
              <LeftCards>
                {leftCards.map((card, index) => (
                  <Card key={index}>
                    <div>
                      <h4>{card.title}</h4>
                      <p>{card.description}</p>
                      <a href={card.link}>Learn More <MdNavigateNext />
                      </a>
                    </div>
                    <img src={card.image} alt={card.title} />
                  </Card>
                ))}
              </LeftCards>
              <MenuColumns>
                {item.items.map((group, groupIndex) => (
                  <MenuColumn key={groupIndex}>
                    <ColumnHeading>
                      <IconWrapper>
                        {group.icon && createElement(group.icon)}
                      </IconWrapper>
                      <h5>{group.title}</h5>
                      <MdNavigateNext color="var(--color-primary)" width={"24px"} height={"24px"} />
                    </ColumnHeading>
                    <LinksList>
                      {group.links.map((link, linkIndex) => (
                        <a key={linkIndex} href={link.link}>
                          {link.label}
                        </a>
                      ))}
                    </LinksList>
                  </MenuColumn>
                ))}
              </MenuColumns>
            </MegaMenuContainer>
          )
      )}
    </>
  );
};

export default Navbar;
