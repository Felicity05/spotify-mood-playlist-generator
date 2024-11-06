import React, {HTMLAttributes, useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {Button} from "../UI Components/Button";
import LogOut from "../UI Components/LogOut";
import styled from "styled-components";
import arrowLeft from "../../assets/Icons/icons8-back-96.png";
import arrowRight from "../../assets/Icons/icons8-forward-96.png";
import {useUserStore} from "../../store/userStore";
import profileImage from '../../assets/Icons/icons8-user-96-1.png'
import useDetectScreenDeviceSize, {COMMON_BREAK_POINTS} from "./useDetectScreenDeviceSize";
import {Text} from "../UI Components/Text";
import {TextLink} from "../UI Components/TextLink";
import moodifyIcon from '../../assets/moodifyIcon.png';
import homeIcon from '../../assets/Icons/icons8-home-96 (2).png';
import libraryIcon from '../../assets/Icons/icons8-music-library-96(1).png';

/*todo: add a new prop: is MobileView
    if true: display home icon and library icon
        in library page: display "Your Library" text next to the library icon
        and the library options section to filter and search your library
        in playlist page: only display back arrow to go back to previous page whatever it is
    otherwise:
        display back and forward arrow icons

 */

interface NavBarProps extends HTMLAttributes<HTMLDivElement> {
    scrolled?: boolean;
    isMobileView?: boolean;
}

const Navbar = styled.nav<NavBarProps>`
  position: sticky;
  top: 0;
  background-color: ${({scrolled}) => (scrolled ? 'rgba(21, 18, 25, 1)' : "transparent")};
  transition: ease-in-out 1.5s;
  align-items: center;
  width: 100%;
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

const NavButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2rem;
`

export const NavBar: React.FC<NavBarProps> = ({isMobileView, ...rest}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [lastIndex, setLastIndex] = useState<number>(-1);
    const [scrolled, setScrolled] = useState<boolean>(false);
    const {user} = useUserStore();

    // Function to handle scroll events
    const handleScroll = (element: HTMLElement) => {
        const scrollTop = element.scrollTop;
        setScrolled(scrollTop >= 50);
    }

    useEffect(() => {
        const scrollableElement = document.getElementById('box'); //scrolling element selector
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
            {isMobileView && (
                <div style={{margin: '1rem 0.3rem 0', display: "flex", alignItems: "center"}}>
                    <img src={moodifyIcon} alt={""} width={48} onClick={() => navigate('/')}/>
                    <TextLink style={{fontWeight: "bold", fontSize: "25px"}} to={'/'}>Moodify</TextLink>
                </div>
            )}
            <NavbarContent>
                {isMobileView ? (
                    <div style={{display: "flex", alignItems: "center"}}>
                        <Button variant={"icon_clear"} size={"cl"} onClick={() => navigate('/')}
                                style={{padding: "0.3rem"}}>
                            <img src={homeIcon} alt="go home" width={32}/>
                        </Button>
                        <Button variant={"icon_clear"} size={"cl"} onClick={() => navigate('/library')}>
                            <img src={libraryIcon} alt="go home" width={32}/>
                        </Button>
                        {location.pathname.includes('library') &&
                            <Text style={{fontSize: "18", fontWeight: "600"}}>Your Playlist Library</Text>}
                    </div>
                ) : <NavButtons>
                    <Button variant="icon" size="cl" onClick={goBack}
                            disabled={window.history.state.idx === 1}>
                        <img src={arrowLeft} alt="go back" width={24}/>
                    </Button>
                    <Button variant="icon" size="cl" onClick={goForward}
                            disabled={lastIndex === window.history.state.idx}>
                        <img src={arrowRight} alt="go forward" width="24"/>
                    </Button>
                </NavButtons>}
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
