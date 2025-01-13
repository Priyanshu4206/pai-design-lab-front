import React, { createElement, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import styled, { css, keyframes } from 'styled-components';
import { leftCards, navItems } from '../../dummyData/dummyData';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import useInView from '../../hooks/useInView';
import { FaBars, FaTimes } from 'react-icons/fa';
import { MdNavigateNext } from 'react-icons/md';

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
  z-index: 2;
  width: 100%;
  height: 70px;
  display: ${(props) => (props.isVisible ? "flex" : "none")};
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  padding: 1rem 3rem;
  background-color: ${(props) => props.activeDropdown ? "rgba(0, 0, 0, 0.5)" : "transparent"}; 
  backdrop-filter: blur(${(props) => props.activeDropdown && "10px"});

  @media screen and (max-width: 768px){
    padding: 1rem;
  }
`;

const LogoContainer = styled.img`
  width: 200px;
  height: auto;
  cursor: pointer;
  filter: contrast(150%);
  opacity: 0;
  ${({ inView }) => inView && animationMixin(pullFromTop)};
`;

const LeftWrapper = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
`;

const NavItems = styled.div`
  display: flex;
  flex: 1;
  gap: 2rem;
  height: 100%;
  
  @media screen and (max-width: 900px){
    display: none;
  }
`;

const NavItem = styled.div`
  position: relative;
  cursor: pointer;
  display: flex;
  padding: 1rem 0;
  opacity: 0;
  ${({ inView, delay }) => inView && animationMixin(pullFromTop, delay)};
`;

const DropdownToggle = styled.span`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.1rem;
  color: var(--color-primary);
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
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
  opacity: 0;
  touch-action: manipulation;
  transition: all 0.2s ease;
  ${({ inView }) => inView && animationMixin(pullFromTop, 1)};

  &:hover {
    background-color:rgb(200, 191, 181); 
  }

  @media screen and (max-width: 900px){
    display: none;
  }
`;

const Hamburger = styled.div`
  font-size: 24px;
  cursor: pointer;
  opacity: ${({ inView }) => inView ? 0 : 1};
  ${({ inView }) => inView && animationMixin(pullFromTop)};
`;

const Sidebar = styled.div`
  position: fixed;
  top: 0px;
  left: ${({ isOpen }) => (isOpen ? "0" : "-100%")};
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  background: #181818;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px 0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: left 0.3s ease-in-out;
  z-index: 999;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  flex: 1;
`;

const SidebarNavItem = styled.li`
  margin: 20px 0;
  font-size: 18px;
  cursor: pointer;
`;

const Dropdown = styled.div`
  margin-left: 20px;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
`;

const DropDownItems = styled.div`
  a {
    font-size: 18px;
    color: var(--color-primary);
    text-decoration: none;
    display: block;
    margin: 15px 0;

    &:hover {
      color: var(--color-accent);
    }
  }
`;

const DemoButton = styled(GetInTouchButton)`
  @media screen and (max-width: 900px){
    display: block;
  }
`;

const ListItem = styled.h4`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;
    padding: 16px;
    margin: 10px 0;
    border-bottom: 1px solid #ddd;

    div{
        display: flex;
        align-items: center;
        gap: 10px;
    }
`;

const FlexRow = styled.div`
    display: flex;
    gap: 1rem;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
`;


const MegaMenuContainer = styled.div`
  display: flex;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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
    text-decoration: none;
    color: var(--color-secondary);
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

const HeroNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const navRef = useRef(null);
  const megaMenuRef = useRef();
  const inView = useInView(navRef);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSubDropdown, setActiveSubDropdown] = useState(null);
  const [isMobile, setIsMobile] = useState(window.matchMedia("(max-width: 900px)").matches);
  const [isExiting, setIsExiting] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const triggerHeight = 70;
      setIsVisible(currentScroll <= triggerHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.matchMedia("(max-width: 900px)").matches);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

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

  const handleDropdownClick = (index) => {
    setActiveDropdown((prev) => (prev === index ? null : index));
    setActiveSubDropdown(null);
  };

  const handleSubDropdownClick = (index) => {
    setActiveSubDropdown((prev) => (prev === index ? null : index));
  };



  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname, setIsSidebarOpen]);

  return (
    <>
      <NavLayout
        ref={navRef}
        activeDropdown={activeDropdown}
        isVisible={isVisible}
      >
        <LogoContainer
          src="/logo.png"
          alt="Pai Design Lab"
          onClick={() => {
            navigate('/');
          }}
          inView={inView}
        />
        <LeftWrapper>
          <NavItems>
            {navItems.map((item, index) => (
              <NavItem key={item.label} inView={inView} delay={0.5 + index * 0.1}>
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
            inView={inView}
          >
            Get in Touch
          </GetInTouchButton>
          {isMobile &&
            <Hamburger onClick={toggleSidebar} inView={inView}>
              {isSidebarOpen ? <FaTimes /> : <FaBars color="var(--color-primary)" />}
            </Hamburger>}
        </LeftWrapper>
      </NavLayout>
      <Sidebar isOpen={isSidebarOpen}>
        <FlexRow>
          <LogoContainer
            src="/logo.png"
            alt="Pai Design Lab"
            onClick={() => {
              navigate('/');
            }}
            inView={inView}
          />
          <Hamburger onClick={toggleSidebar}>
            <FaTimes color="var(--color-primary)" />
          </Hamburger>
        </FlexRow>
        <NavList>
          {navItems.map((item, index) => (
            <SidebarNavItem key={index}>
              <ListItem onClick={() => handleDropdownClick(index)}>
                <span>
                  {item.label}
                </span>
                {activeDropdown == index ? <BsChevronUp /> : <BsChevronDown />}
              </ListItem>
              {item.dropdown && (
                <Dropdown isOpen={activeDropdown === index}>
                  {item.items.map((subItem, subIndex) => (
                    <DropDownItems key={subIndex}>
                      <ListItem onClick={() => handleSubDropdownClick(subIndex)}>
                        <div>
                          <subItem.icon color="var(--color-primary)" />
                          <span>{subItem.title}</span>
                        </div>
                        {activeSubDropdown == subIndex ? <BsChevronUp /> : <BsChevronDown />}
                      </ListItem>
                      <Dropdown isOpen={activeSubDropdown === subIndex}>
                        {subItem.links.map((link, linkIndex) => (
                          <a href={link.link} key={linkIndex}>
                            {link.label}
                          </a>
                        ))}
                      </Dropdown>
                    </DropDownItems>
                  ))}
                </Dropdown>
              )}
            </SidebarNavItem>
          ))}
        </NavList>
        <DemoButton onClick={() => navigate("/support/contact-us")}>Book Your Demo</DemoButton>
      </Sidebar>


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

export default HeroNavbar;
