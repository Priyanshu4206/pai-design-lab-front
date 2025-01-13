import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaBars, FaTimes } from "react-icons/fa";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { navItems } from "../../dummyData/dummyData";
import { useLocation, useNavigate } from "react-router";

const NavbarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background: var(--color-surface);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  height: 70px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const Logo = styled.img`
  height: 55px;
  cursor: pointer;
`;

const Hamburger = styled.div`
  font-size: 24px;
  cursor: pointer;
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
  padding: 30px 0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: left 0.3s ease-in-out;
  z-index: 999;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1.5rem 0;
  flex: 1;
`;

const NavItem = styled.li`
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
    color: #2c3e50;
    text-decoration: none;
    display: block;
    margin: 15px 0;

    &:hover {
      color: #d55d2f;
    }
  }
`;

const DemoButton = styled.button`
  width: 300px;
  margin: auto;
  padding: 1rem 2rem;
  font-size: 16px;
  background: var(--color-primary);
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: transparent;
    color: var(--color-primary);
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

const MobileNavbar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [activeSubDropdown, setActiveSubDropdown] = useState(null);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const handleDropdownClick = (index) => {
        setActiveDropdown((prev) => (prev === index ? null : index));
        setActiveSubDropdown(null);
    };

    const handleSubDropdownClick = (index) => {
        setActiveSubDropdown((prev) => (prev === index ? null : index));
    };

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        setIsSidebarOpen(false);
    }, [location.pathname, setIsSidebarOpen]);

    return (
        <>
            <NavbarContainer>
                <Logo
                    src="/logo.png"
                    alt="Logo"
                    onClick={() => (window.location.href = "/")}
                />
                <Hamburger onClick={toggleSidebar}>
                    {isSidebarOpen ? <FaTimes color="var(--color-primary)" /> : <FaBars color="var(--color-primary)" />}
                </Hamburger>
            </NavbarContainer>
            <Sidebar isOpen={isSidebarOpen}>
                <NavList>
                    {navItems.map((item, index) => (
                        <NavItem key={index}>
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
                                                    <subItem.icon color="#D55D2F" />
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
                        </NavItem>
                    ))}
                </NavList>
                <DemoButton onClick={() => navigate("/support/contact-us")}>Book Your Demo</DemoButton>
            </Sidebar>
        </>
    );
};

export default MobileNavbar;
