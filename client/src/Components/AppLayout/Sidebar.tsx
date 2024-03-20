import React, {ReactNode} from 'react';
import styled from "styled-components";
import {UserProfileSection} from "../SideBar/UserProfileSection";
import {LibrarySection} from "../SideBar/LibrarySection";
import {Box} from "../UI Components/Box";

interface SideBarProps {
    children?: ReactNode;
}

const StyledSideBar = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  grid-area: sidebar;
  padding-right: 0.5rem;
`

export const SideBar: React.FC<SideBarProps> = ({children}) => {
    return (
        <StyledSideBar>
            <Box alignment="center" height={'320px'} style={{marginBottom: '0.5rem'}}>
                <UserProfileSection/>
            </Box>
            <Box alignment="left">
                <LibrarySection/>
            </Box>
            <main>
                {children}
            </main>
        </StyledSideBar>
    );
}
