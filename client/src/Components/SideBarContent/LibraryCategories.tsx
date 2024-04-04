import React, {useState} from 'react';
import {Button} from "../UI Components/Button";
import styled from "styled-components";
import search from '../../assets/Icons/icons8-search-96 (1).png'
import {Text} from '../UI Components/Text';

const ButtonBar = styled.div`
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  margin-bottom: 0.5rem;
  //border: solid 2px #1db954;
  scrollbar-width: none;
`

export const LibraryCategories = () => {
    const [active, setActive] = useState(false);
    const handleActive = (event: any) => {
        console.log("active=", active);
        setActive(!active);
        console.log(event)
    }

    return (
        <div style={{marginLeft: "0.5rem", marginRight: "0.5rem"}}>
            <ButtonBar>
                {/*<Button variant={"secondary"} size={"sm"}*/}
                {/*        onClick={(event) => handleActive(event.target)}>Playlists</Button>*/}
                {/*<Button variant={"secondary"} size={"sm"} onClick={handleActive}>Artists</Button>*/}
                {/*<Button variant={"secondary"} size={"sm"} onClick={handleActive}>Albums</Button>*/}
                {/*only show this two when playlist is active*/}
                <Button variant={"secondary"} size={"sm"}>By You</Button>
                <Button variant={"secondary"} size={"sm"}>By Spotify</Button>
                <Button variant={"secondary"} size={"sm"}>By Others</Button>
            </ButtonBar>
            <div style={{
                backgroundColor: "#212121",
                borderRadius: "9999rem",
                padding: "0.2rem 1rem",
                marginBottom: "0.5rem",
                display: "flex",
                alignItems: "center"
            }}>

                <img src={search} alt={"search"} width={24}/>
                <input type={"search"} style={{backgroundColor: "transparent", border: "none"}}
                       placeholder={"Search your library..."}
                />
            </div>
        </div>
    );
}
