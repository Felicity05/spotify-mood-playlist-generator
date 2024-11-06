import React, {useEffect} from 'react';
import {Text} from "../UI Components/Text";
import styled, {css} from "styled-components";
import playlistImage from '../../assets/Icons/icons8-musical-note-100 copy.png'
import {TextLink} from "../UI Components/TextLink";
import {Textfit} from 'react-textfit';

/* todo: fix playlist header text to be bigger when there is space and smaller when there isn't
    fix table playlist header image to resize for smaller screen sizes
    fix text to resize for smaller screen sizes
    add underline effect when hover to links on the playlist description

    ** nice to have **
    fix color background for playlist to be a random generated color picked from the image playlist cover
 */

const HeaderWrapper = styled.div`
  //background-color: darkred;
  margin: 1.5rem 0;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
  //border: solid blue;
`

const PlaylistContent = styled.div`
  display: flex;
  width: 95%;
  //border: solid magenta;

  @media (max-width: 550px) {
    flex-direction: column;
    align-items: center;
  }
`

const ImageWrapper = styled.div`
  width: 250px;
  margin: 0 1.5rem;
  //border: solid cyan;

  @media (max-width: 550px) {
    width: 175px;
    margin-bottom: 1rem;
  }
`

const PlaylistInfoWrapper = styled.div`
  //border: solid yellow;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  padding-bottom: 0.3rem;
  width: 100%;
  max-width: 100%;
  overflow: auto;
  gap: 0.25rem;
`

const StyledTextLinks = css`
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

            // Modify the href attribute to the correct format
            const playlistId = link.href.split(':').pop();
            link.href = `https://open.spotify.com/playlist/${playlistId}`;
            link.target = '_blank';

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
        <HeaderWrapper>
            <PlaylistContent>

                <ImageWrapper>
                    <img src={playlist?.images ? playlist?.images[0].url : playlistImage} alt={""}
                         style={{maxWidth: "100%", height: "auto", borderRadius: "0.3rem"}}/>
                </ImageWrapper>

                <PlaylistInfoWrapper id={"text-area"}>
                    {/*<Textfit mode='single' max={20} min={13} style={{fontWeight: "600", width: '100%'}}>*/}
                    {/*    Playlist*/}
                    {/*</Textfit> /!*hide this on small screen*!/*/}
                    <Textfit mode='single' onReady={() => console.log("hello")}
                             style={{fontWeight: "900", width: "100%"}}>{playlist?.name}</Textfit>

                    <Text variant="sm" dangerouslySetInnerHTML={{__html: modifiedText}}
                          style={{
                              color: "#e3e3e3c2", overflow: "hidden", whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
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
                                style={{color: "#e3e3e3c2"}}> about {hours > 0 ? ` ${hours} hr ${minutes} min` : ` ${minutes} min`}
                            </span>
                        </Text>
                    </div>
                    {playlist?.tracks?.total > 100 &&
                        <Text variant={"xs"} style={{color: "#e3e3e3c2"}}>* Only first 100 songs are displayed here,
                            see the entire playlist on <TextLink to={playlist.external_urls.spotify} target={"_blank"}
                                                                 style={{fontWeight: "bolder"}}>Spotify</TextLink>
                        </Text>}
                </PlaylistInfoWrapper>
            </PlaylistContent>
        </HeaderWrapper>
    );
}
