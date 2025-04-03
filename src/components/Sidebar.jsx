import React, { useState } from "react";
import styled from "styled-components";
import {
    FaTachometerAlt, FaUser, FaChartBar, FaCloudUploadAlt,
    FaAddressBook, FaHandshake, FaCommentDots, FaBars, FaTimes
} from "react-icons/fa";
import { HiChevronRight } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
    const [openDropdown, setOpenDropdown] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDropdown = (menu) => {
        setOpenDropdown(openDropdown === menu ? null : menu);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            <Hamburger onClick={toggleSidebar}>
                <FaBars />
            </Hamburger>

            <SidebarContainer isOpen={isSidebarOpen}>
                <CloseButton onClick={toggleSidebar}>
                    <FaTimes />
                </CloseButton>

                <MenuItem onClick={() => navigate('/')}>
                    <IconWrapper>
                        <FaTachometerAlt />
                    </IconWrapper>
                    Dashboard
                </MenuItem>

                <Dropdown>
                    <MenuItem onClick={() => toggleDropdown("account")} active={openDropdown === "account"}>
                        <IconWrapper>
                            <FaUser />
                        </IconWrapper>
                        Account
                    </MenuItem>
                    {openDropdown === "account" && (
                        <SubMenu>
                            <SubMenuItem onClick={() => navigate('/accounts')}>
                                <IconWrapper>
                                    <FaUser />
                                </IconWrapper>
                                Accounts
                            </SubMenuItem>
                            <SubMenuItem>
                                <IconWrapper>
                                    <FaChartBar />
                                </IconWrapper>
                                Account Report
                            </SubMenuItem>
                            <SubMenuItem>
                                <IconWrapper>
                                    <FaCloudUploadAlt />
                                </IconWrapper>
                                Account Upload
                            </SubMenuItem>
                        </SubMenu>
                    )}
                </Dropdown>

                <MenuItem>
                    <IconWrapper>
                        <FaAddressBook />
                    </IconWrapper>
                    Contact
                </MenuItem>

                <Dropdown>
                    <MenuItem onClick={() => navigate('/profile')}>
                        <IconWrapper>
                            <FaHandshake />
                        </IconWrapper>
                        Profile
                    </MenuItem>
                </Dropdown>

            </SidebarContainer>
        </>
    );
};

export default Sidebar;

const SidebarContainer = styled.div`
  width: 250px;
  background: #fff;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  border-right: 1px solid #ddd;
  padding: 10px 0;
  font-family: Arial, sans-serif;
  height: 100vh;
  transition: transform 0.3s ease-in-out;
  
  @media (max-width: 768px) {
      /* position: fixed;
      left: 0;
      top: 0;
      z-index: 1000; */
      width: 80%;
      max-width: 300px;
      transform: ${(props) => (props.isOpen ? "translateX(0)" : "translateX(-100%)")};
      position: fixed;
      background: white;
      box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
  }
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 15px;
  font-size: 14px;
  cursor: pointer;
  background: ${(props) => (props.active ? "#dce5ff" : "transparent")};
  color: ${(props) => (props.active ? "#3366ff" : "#333")};
  font-weight: ${(props) => (props.active ? "bold" : "normal")};

  &:hover {
    background: #f5f5f5;
  }
`;

const IconWrapper = styled.span`
  margin-right: 10px;
  font-size: 16px;
`;

const Dropdown = styled.div`
  display: flex;
  flex-direction: column;
`;

const SubMenu = styled.div`
  background: #f7f7f7;
  padding-left: 30px;
`;

const SubMenuItem = styled(MenuItem)`
  font-size: 13px;
  padding: 8px 15px;
`;

const Hamburger = styled.div`
  /* position: fixed;
  top: 15px;
  left: 15px; */
  font-size: 24px;
  cursor: pointer;
  width: 10%;
  z-index: 900;
  display: flex;
  align-items: start;
  padding: 5px;
  /* background: transparent; */
  /* padding: 10px; */
  /* border-radius: 5px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1); */

  @media (min-width: 769px) {
      display: none;
  }
`;

const CloseButton = styled.div`
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 20px;
  cursor: pointer;
  color: #333;
  display: none;

  @media (max-width: 768px) {
      display: block;
  }
`;
