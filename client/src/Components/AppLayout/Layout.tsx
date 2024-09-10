import React, {useState} from 'react';
import styled from "styled-components";
import {SideBar} from "./Sidebar";
import {Main} from "./Main";
import {NavBar} from "./NavBar";
import {UserProfileSection} from "../SideBarContent/UserProfileSection";
import {LibrarySection} from "../SideBarContent/LibrarySection";
import {Box} from "../UI Components/Box";

// Define styled components
const Container = styled.div`
  display: grid;
  height: 100vh;
  box-sizing: border-box;
  overflow: hidden;
  grid-template-rows: auto 1fr;
  grid-template-columns: 320px 1fr;
  grid-template-areas:
          "sidebar main";

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      "main";
  }
`;

const SlidingMenu = styled.div<{ isOpen: boolean }>`
  display: none;

  @media (max-width: 768px) {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: #212121;
    z-index: 999999;
    transform: ${({isOpen}) => (isOpen ? 'translateX(0)' : 'translateX(-100%)')};
    transition: transform 0.3s ease-in-out;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
`;

const SideBarHidden = styled(SideBar)`
  @media (max-width: 768px) {
    display: none;
  }
`;

export const Layout: React.FC<any> = ({children}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    React.useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <Container>
            {isMobile ? (
                <>
                    <SlidingMenu isOpen={isMenuOpen}>
                        <CloseButton onClick={() => setIsMenuOpen(false)}>✖</CloseButton>
                        <p>hello</p>
                    </SlidingMenu>
                </>
            ) : (
                <SideBar/>
            )}
            <Main>
                <NavBar setIsMenuOpen={setIsMenuOpen}/>
                {children}
            </Main>
        </Container>
    );
}
