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
  width: 90%;

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
    searchTerm: string;
}

const HighlightedText = styled.span`
  background-color: #1DB954;
  border-radius: 0.2rem;
`;

export const LibraryItem: React.FC<PlaylistItemProps> = ({
                                                             name, owner, image,
                                                             type, playlist_id, searchTerm
                                                         }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/playlist/${playlist_id}`);
    };

    const getHighlightedText = (text: string, highlight: string) => {
        const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
        return parts.map((part, index) =>
            part.toLowerCase() === highlight.toLowerCase() ?
                <HighlightedText key={index}>{part}</HighlightedText> : part
        );
    };

    return (
        <StyledPlaylistItem onClick={handleClick}>
            <img src={image} alt="playlist cover" width={50} height={50} style={{borderRadius: "0.3rem"}}/>
            <div style={{display: "flex", flexDirection: "column", overflow: "hidden", justifyContent: "center"}}>
                <Text style={{whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden", paddingBottom: 0}}>
                    {getHighlightedText(name, searchTerm)} hello
                </Text>
                <div style={{
                    display: "flex", gap: "0.2rem", alignItems: "center",
                    color: "#A39F9F", overflow: "hidden"
                }}>
                    <Text variant={"xs"} style={{textTransform: "capitalize", paddingBottom: 0}}>{type}</Text>
                    <Text variant={"md"} style={{paddingBottom: 0}}>·</Text>
                    <Text variant={"xs"} style={{
                        whiteSpace: "nowrap", textOverflow: "ellipsis",
                        overflow: "hidden", paddingBottom: 0
                    }}>
                        {owner}
                    </Text>
                </div>
            </div>
        </StyledPlaylistItem>
    );
};
