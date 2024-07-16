import React from "react"
import styled from "styled-components";
import {Text} from "../UI Components/Text";
import {useNavigate} from "react-router-dom";

const StyledPlaylistItem = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  //margin: 0.5rem 0;
  padding: 0.5rem;

  &:hover {
    background-color: #2a2a2a;
    border-radius: 0.5rem;
  }
`

interface PlaylistItemProps {
    image: string;
    name: string;
    type: string;
    owner: string | null;
    playlist_id: string;
}


export const LibraryItem: React.FC<PlaylistItemProps> = ({name, owner, image, type, playlist_id}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/playlist/${playlist_id}`);
    };

    return (
        <StyledPlaylistItem onClick={handleClick}>
            <img src={image} alt="random" width={"50px"} style={{borderRadius: "0.3rem"}}/>
            <div style={{display: "flex", flexDirection: "column"}}>
                <Text style={{}}>{name}</Text>
                <div style={{display: "flex", gap: "0.2rem", alignItems: "center"}}>
                    <Text variant={"xs"} style={{textTransform: "capitalize"}}>{type}</Text>
                    <Text variant={"md"}>·</Text>
                    <Text variant={"xs"}>{owner} </Text>
                </div>
            </div>
        </StyledPlaylistItem>
    );
};
