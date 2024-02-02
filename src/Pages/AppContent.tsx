import {DisplayUserProfile} from "../Components/DisplayUserProfile";
import {MainDisplay} from "../Components/MainDisplay";
import {Library} from "../Components/Library";
import styled from "styled-components";

export const AppContent = () => {

    const Container = styled.div`
        display: grid;
        height: 100vh;
        background-color: black;
        grid-template-rows: minmax(100px, auto);
        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
        grid-template-areas:
          "sidebar main main main"
          "sidebar main main main";
        text-align: center;
        grid-gap: 0.35rem;
        padding: 0.35rem;
        transition: all 0.25s ease-in-out;
        @media (max-width: 550px) {
          grid-template-columns: 1fr;
          grid-template-rows: 1fr 1fr;
          grid-template-areas:
            "sidebar"
            "main";
          }
        color: white;
    `
    const SideBar = styled.div`
      display: flex;
      flex-direction: column;
      //background: #9aa5c9;
      grid-area: sidebar;
      gap: 0.25rem;
      align-items: center;
      justify-content: center;
      grid-area: sidebar;
    `

    const StyledMaindisplay = styled.div`
      grid-area: main;
    `

    return(
        <Container>
            <SideBar>
                <DisplayUserProfile />
                <Library/>
            </SideBar>
            <StyledMaindisplay>
                <MainDisplay/>
            </StyledMaindisplay>
        </Container>
    )
}
