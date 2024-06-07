import React, {HTMLAttributes, useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {Button} from "./Button";
import LogOut from "./LogOut";
import styled from "styled-components";
import arrowLeft from "../../assets/Icons/icons8-arrow-96.png";
import arrowRight from "../../assets/Icons/icons8-arrow-96(1).png";

interface NavBarProps extends HTMLAttributes<HTMLDivElement> {
    scrolled?: boolean
}

const Navbar = styled.nav<NavBarProps>`
  position: sticky;
  top: 0;
  background-color: ${({scrolled}) => (scrolled ? 'rgba(21, 18, 25, 1)' : "transparent")};
  transition: ease-in-out 1.5s;
  align-items: center;
  width: inherit;
  z-index: 1000;
  //background-color: #1db954;
  //border: solid red 2px;
`;

const NavbarContent = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  color: white;
`;

export const NavBar: React.FC<NavBarProps> = ({...rest}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [lastIndex, setLastIndex] = useState<number>(-1);
    const [scrolled, setScrolled] = useState<boolean>(false);

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
        <Navbar scrolled={scrolled} {...rest}>
            <NavbarContent>
                <div style={{display: "flex", alignItems: "center", padding: "0 0.2rem", gap: "0.2rem"}}>
                    <Button variant="icon" size="cl" onClick={goBack}
                            disabled={window.history.state.idx === 1}>
                        <img src={arrowLeft} alt="" width="24"/>
                    </Button>
                    <Button variant="icon" size="cl" onClick={goForward}
                            disabled={lastIndex === window.history.state.idx}>
                        <img src={arrowRight} alt="" width="24"/>
                    </Button>
                </div>
                <LogOut/>
            </NavbarContent>
        </Navbar>
    );
}
