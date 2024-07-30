import React from 'react';
import styled from "styled-components";
import {SideBar} from "./Sidebar";
import {Main} from "./Main";
import {useAccessToken} from "../../Context/AccessTokenContext";
import {NavBar} from "../UI Components/NavBar";
import {MainContent} from "../MainContent/MainContent";
import MainFooter from "../MainContent/MainFooter";

// Define styled components
const Container = styled.div`
  display: grid;
  height: 100vh;
  //padding: 0.5rem;
  box-sizing: border-box;
  grid-template-rows: minmax(200px, auto);
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-template-areas:
          "sidebar main main main"
          "sidebar main main main";
  background-color: black;
  //  todo: fix layout for mobile devices and show only main area 
  //   and profile as a picture on the left top corner with a sliding menu
`;

const Header = styled.header`
  height: 60px;
  background-color: #1db954;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Player = styled.footer`
  height: 80px;
  background-color: #040306;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

//scereen size at 768 need to decrease image size

export const Layout: React.FC<any> = ({children}) => {

    return (
        <Container>
            {/*<Header>Header</Header>*/}
            <SideBar/>
            <Main>
                <NavBar/>
                {children}
            </Main>
            {/*<Player>Player</Player>*/}
        </Container>
    );
}
