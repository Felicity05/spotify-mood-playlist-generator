import React, {ReactNode} from 'react';
import styled from "styled-components";
import {UserProfileSection} from "../SideBarContent/UserProfileSection";
import {LibrarySection} from "../SideBarContent/LibrarySection";
import {Box} from "../UI Components/Box";

interface SideBarProps {
    children?: ReactNode;
}

const StyledSideBar = styled.div`
  grid-area: sidebar;
  //height: 100vh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 0.5rem 0 0.5rem 0.5rem;
  overflow: hidden;

  @media (max-width: 768px) {
    display: none;
  }
`

export const SideBar: React.FC<SideBarProps> = ({children}) => {
    return (
        <StyledSideBar>
            <Box alignment="left" height={'200px'}
                 style={{marginBottom: '0.5rem', alignItems: "center", justifyContent: "center"}}>
                <UserProfileSection/>
            </Box>
            <Box alignment="left">
                <LibrarySection/>
            </Box>
        </StyledSideBar>
    );
}
