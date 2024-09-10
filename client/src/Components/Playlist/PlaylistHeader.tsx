import React, {useEffect} from 'react';
import {Text} from "../UI Components/Text";
import styled from "styled-components";
import playlistImage from '../../assets/Icons/icons8-musical-note-100 copy.png'
import {TextLink} from "../UI Components/TextLink";

const HeaderWrapper = styled.div`
  //background-color: darkred;
  margin: 1.5rem 0;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
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
    const hours = Math.floor(totalDuration / 3.6e+6) // Calculate full hours
    const minutes = Math.floor((totalDuration % 3.6e+6) / 60000) // Calculate remaining minutes

    const decodeHtmlEntities = (text: string) => {
        const textarea = document.createElement('textarea');
        textarea.innerHTML = text;
        return textarea.value;
    }

    const modifyAndStyleLinks = (text: string) => {
        const decodedText = decodeHtmlEntities(text);

        // Create a temporary container to manipulate the DOM
        const tempContainer = document.createElement('div');
        tempContainer.innerHTML = decodedText;

        // Modify the links
        const links = tempContainer.querySelectorAll('a');
        links.forEach(link => {
            // console.log("original link== ", link)

            // Modify the href attribute to the correct format
            const playlistId = link.href.split(':').pop();
            // console.log("playlistId= ", playlistId)
            link.href = `https://open.spotify.com/playlist/${playlistId}`;
            link.target = '_blank';

            // console.log("modified link== ", link)
            // Apply styling
            link.style.color = 'white'; // Spotify green or any other color '#1DB954'
            link.style.textDecoration = 'none'; // Optional: remove underline

            // Add hover effect for text-decoration
            link.classList.add('styled-link');
        });

        return tempContainer.innerHTML;
    }
    const modifiedText = modifyAndStyleLinks(playlist?.description);

    /** todo: fix playlist header text to be bigger when there is space and smaller when there isn't
     * fix color background for playlist to be a random generated color
     * fix table playlist header
     */

    return (
        <HeaderWrapper>
            <div style={{
                display: "flex",
                paddingBottom: '1rem',
                width: "95%"
            }}>
                <img src={playlist?.images ? playlist?.images[0].url : playlistImage} alt={""}
                     style={{maxWidth: "200px", height: "200px", borderRadius: "0.3rem"}}/>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    alignItems: "flex-start",
                    paddingLeft: "1.5rem",
                    paddingBottom: "0.3rem",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    width: "100%"
                }} id={"text-area"}>
                    <Text variant="xsm" style={{fontWeight: "600"}}>Playlist</Text>
                    <Text variant="xl"
                          style={{fontWeight: "900"}}>{playlist?.name}</Text>
                    <Text variant="sm" dangerouslySetInnerHTML={{__html: modifiedText}}
                          style={{
                              color: "#e3e3e3c2",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              width: "-webkit-fill-available"
                          }}/>
                    <div>
                        {/*<img src={""} alt={""} width="24"/>*/}
                        <Text variant="xsm">
                            <TextLink to={playlist.owner.external_urls.spotify} target={"_blank"}
                                      style={{fontWeight: "700"}}> {playlist?.owner?.display_name}
                            </TextLink>
                            <span style={{fontWeight: "700"}}> · </span>
                            {playlist?.tracks?.total} songs,
                            <span
                                style={{color: "#e3e3e3c2"}}> about {hours > 0 ? ` ${hours} hr ${minutes} min` : ` ${minutes} min`}</span>
                        </Text>
                    </div>
                    {playlist?.tracks?.total > 100 &&
                        <Text variant={"xs"} style={{color: "#e3e3e3c2"}}>* Only first 100 songs are displayed, to see
                            entire playlist
                            click <TextLink
                                to={playlist.external_urls.spotify} target={"_blank"}
                                style={{fontWeight: "bolder"}}>here</TextLink>
                        </Text>}
                </div>
            </div>
        </HeaderWrapper>
    );
}
