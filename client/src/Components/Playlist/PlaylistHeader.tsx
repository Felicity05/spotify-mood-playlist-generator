import React from 'react';
import {Text} from "../UI Components/Text";
import styled from "styled-components";
import playlistImage from '../../assets/Icons/icons8-musical-note-100 copy.png'

const MainBackgroundColor = styled.span`
  //background-color: darkred;
  margin: 1.5rem 0;
  z-index: 99;
`

const TextLinks = styled.a`
  color: white; // Spotify green or any other color #1DB954
  text-decoration: none; // Remove underline by default

  &:hover {
    text-decoration: underline; // Show underline on hover
  }
`;

export const PlaylistHeader: React.FC<any> = ({playlist}) => {
    const totalDuration = playlist?.tracks?.items?.reduce((n: number, item: any) => n + item.track.duration_ms, 0)
    const hours = Math.round(totalDuration / 3.6e+6)
    const minutes = Math.round(totalDuration / 60000)

    console.log("description", playlist?.description)
    const decodeHtmlEntities = (text: string) => {
        const textarea = document.createElement('textarea');
        textarea.innerHTML = text;
        return textarea.value;
    }
    // const decodedText = decodeHtmlEntities(playlist?.description);

    const modifyAndStyleLinks = (text: string) => {
        const decodedText = decodeHtmlEntities(text);

        // Create a temporary container to manipulate the DOM
        const tempContainer = document.createElement('div');
        tempContainer.innerHTML = decodedText;

        // Modify the links
        const links = tempContainer.querySelectorAll('a');
        links.forEach(link => {
            console.log("original link== ", link)

            // Modify the href attribute to the correct format
            const playlistId = link.href.split(':').pop();
            console.log("playlistId= ", playlistId)
            link.href = `https://open.spotify.com/playlist/${playlistId}`;
            link.target = '_blank';

            console.log("modified link== ", link)
            // Apply styling
            link.style.color = 'white'; // Spotify green or any other color '#1DB954'
            link.style.textDecoration = 'none'; // Optional: remove underline

            // Add hover effect for text-decoration
            link.classList.add('styled-link');
        });

        return tempContainer.innerHTML;
    }
    const modifiedText = modifyAndStyleLinks(playlist?.description);


    return (
        <MainBackgroundColor>
            <div style={{display: "flex", paddingBottom: '1rem', paddingLeft: '2rem'}}>
                <img src={playlist?.images ? playlist?.images[0].url : playlistImage} alt={""}
                     style={{maxWidth: "200px", height: "200px", borderRadius: "0.3rem"}}/>
                <div style={{
                    display: "flex", flexDirection: "column", justifyContent: "flex-end",
                    alignItems: "flex-start", paddingLeft: "1.5rem"
                }}>
                    <Text variant="md">Playlist</Text>
                    <Text variant="xl">{playlist?.name}</Text>
                    <div dangerouslySetInnerHTML={{__html: modifiedText}} style={{color: "white"}}/>
                    <div>
                        <img src={""} alt={""} width="24"/>
                        <Text>{playlist?.owner?.display_name} · {playlist?.tracks?.total} songs,
                            {hours > 0 ? ` ${hours} h ${minutes} min` : ` ${minutes} min`}</Text>
                    </div>
                </div>
            </div>
        </MainBackgroundColor>
    );
}
