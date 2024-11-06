import React, {FC, useEffect, useState} from 'react';
import styled from "styled-components";
import {SideBar} from "./Sidebar";
import {Main} from "./Main";
import {NavBar} from "./NavBar";
import {UserProfileSection} from "../SideBarContent/UserProfileSection";
import {LibrarySection} from "../SideBarContent/LibrarySection";
import {Box} from "../UI Components/Box";
import useDetectScreenDeviceSize, {COMMON_BREAK_POINTS} from "./useDetectScreenDeviceSize";

/*
/ todo: fix layout so side bar resizes accordingly to screen size - DONE
    put options for select side by side on larger screen sizes and centered
    resize select options for smaller screen
    add the sidebar menu for smaller screen size
    on sidebar playlist filters add a right button to scroll


    ** nice to have **
    maybe reimagine front page
    create animation for loading page when loading playlist
    create animation for loading page after log in
    create animation for loading effect when generate playlist button is clicked
    do an analysis from listening history of the user for the last month and show how the user was feeling that month

 */


const Container = styled.div`
  display: grid;
  height: 100vh;
  box-sizing: border-box;
  overflow: hidden;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 1fr;
  grid-template-areas:
          "sidebar main main main";

  @media (max-width: ${COMMON_BREAK_POINTS.small}px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      "main";
  }

  @media (max-width: ${COMMON_BREAK_POINTS.medium}px) and (min-width: ${COMMON_BREAK_POINTS.small}px) {
    grid-template-columns: 1.5fr 1.5fr 1.5fr;
    grid-template-areas:
      "sidebar main main";
  }
`;

export const Layout: FC<any> = ({children}) => {
    const isMobile = useDetectScreenDeviceSize(COMMON_BREAK_POINTS.small);

    return (
        <Container>
            {!isMobile && <SideBar/>}
            <Main>
                <NavBar isMobileView={isMobile}/>
                {children}
            </Main>
        </Container>
    );
}
