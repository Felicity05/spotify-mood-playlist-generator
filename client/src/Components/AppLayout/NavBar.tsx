import React, {HTMLAttributes, useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {Button} from "../UI Components/Button";
import LogOut from "../UI Components/LogOut";
import styled from "styled-components";
import arrowLeft from "../../assets/Icons/icons8-back-96.png";
import arrowRight from "../../assets/Icons/icons8-forward-96.png";
import {useUserStore} from "../../store/userStore";
import profileImage from '../../assets/Icons/icons8-user-96-1.png'

interface NavBarProps extends HTMLAttributes<HTMLDivElement> {
    scrolled?: boolean;
    setIsMenuOpen: (value: boolean) => void
}

const Navbar = styled.nav<NavBarProps>`
  position: sticky;
  top: 0;
  background-color: ${({scrolled}) => (scrolled ? 'rgba(21, 18, 25, 1)' : "transparent")};
  transition: ease-in-out 1.5s;
  align-items: center;
  width: inherit;
  box-sizing: border-box;
  z-index: 1000;
  //background-color: #1db954;
  //border: solid red 2px;
`;

const NavbarContent = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0.35rem;
  color: white;
`;

const MenuButton = styled.button`
  display: none;

  @media (max-width: 768px) {
    display: block;
    background: none;
    border: none;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    margin-right: 0.5rem;
  }
`;

export const NavBar: React.FC<NavBarProps> = ({setIsMenuOpen, ...rest}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [lastIndex, setLastIndex] = useState<number>(-1);
    const [scrolled, setScrolled] = useState<boolean>(false);
    const {user} = useUserStore();

    // Function to handle scroll events
    const handleScroll = (element: HTMLElement) => {
        const scrollTop = element.scrollTop;
        // console.log("ScrollTop: ", scrollTop);
        setScrolled(scrollTop >= 50);
    }

    useEffect(() => {
        const scrollableElement = document.getElementById('box'); // Replace with your scrolling element selector
        if (scrollableElement) {
            const handleElementScroll = () => handleScroll(scrollableElement as HTMLElement);
            scrollableElement.addEventListener('scroll', handleElementScroll);
            return () => scrollableElement.removeEventListener('scroll', handleElementScroll);
        }
    }, []);

    // effect to handle last page visited to disable go forward btn when there are no more pages to move to
    useEffect(() => {
        setLastIndex(prevIndex => {
            const currIndex = window.history.state.idx
            // console.log(prevIndex, " === ", currIndex)
            return prevIndex < currIndex ? currIndex : prevIndex
        });
    }, [location.key]);


    const goBack = () => {
        navigate(-1);
    };

    const goForward = () => {
        navigate(1);
    };

    return (
        <Navbar scrolled={scrolled} setIsMenuOpen={setIsMenuOpen} {...rest}>
            <NavbarContent>
                <MenuButton onClick={() => setIsMenuOpen(true)}>☰</MenuButton>
                <div style={{display: "flex", alignItems: "center", gap: "0.2rem"}}>
                    <Button variant="icon" size="cl" onClick={goBack}
                            disabled={window.history.state.idx === 1}>
                        <img src={arrowLeft} alt="go back" width={24}/>
                    </Button>
                    <Button variant="icon" size="cl" onClick={goForward}
                            disabled={lastIndex === window.history.state.idx}>
                        <img src={arrowRight} alt="go forward" width="24"/>
                    </Button>
                </div>
                <div style={{display: "flex", alignItems: "center", gap: "0.35rem"}}>
                    <Button variant={"icon"}
                            style={{padding: "0.3rem"}}
                            onClick={() => window.open(user?.external_urls.spotify!, '_blank')}>
                        <img style={{borderRadius: '100px', width: '2rem', objectFit: "scale-down"}}
                             src={user?.images.length !== 0 ? user?.images[1].url : profileImage}
                             alt={"user profile"}/>
                    </Button>
                    <LogOut/>
                </div>
            </NavbarContent>
        </Navbar>
    );
}
