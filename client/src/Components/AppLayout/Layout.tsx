import React from 'react';
import styled from "styled-components";
import {SideBar} from "./Sidebar";
import {Main} from "./Main";
import {useAccessToken} from "../../Context/AccessTokenContext";
import {NavBar} from "../UI Components/NavBar";

// Define styled components
const Container = styled.div`
  display: grid;
  height: 100vh;
  padding: 0.5rem;
  box-sizing: border-box;
  grid-template-rows: minmax(100px, auto);
  grid-template-columns: repeat(auto-fit, minmax(100px, 2fr));
  grid-template-areas:
          "sidebar main main main"
          "sidebar main main main";
  background-color: black;
  //  todo: fix layout for mobile devices and show only main area and profile as a picture on the left top corner with a sliding menu
`;

const Header = styled.header`
  height: 60px;
  background-color: #1db954;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// const Sidebar = styled.aside`
//   width: 250px;
//   background-color: #040306;
//   color: white;
//   padding: 20px;
// `;

// const Main = styled.main`
//   flex: 1;
//   background-color: #040306;
//   color: white;
//   padding: 20px;
// `;

const Player = styled.footer`
  height: 80px;
  background-color: #040306;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;


export const Layout: React.FC<any> = ({children}) => {
    const {accessToken} = useAccessToken()

    return (
        <Container>
            {/*<Header>Header</Header>*/}
            {accessToken && <SideBar/>}
            <Main>
                {accessToken && <NavBar/>}
                {children}
            </Main>
            {/*<Player>Player</Player>*/}
        </Container>
    );
}
