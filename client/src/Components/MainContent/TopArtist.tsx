import React, {useEffect, useState} from 'react';
import {ArtistCard} from "./ArtistCard";
import {Text} from '../UI Components/Text';
import {Artist} from "../../types";
import {getTopItemsForUser} from "../../api/api";
import styled from "styled-components";

const StyledTopArtist = styled.div`
  box-sizing: border-box;
  margin: 1.5rem 0;
`

interface TopArtistProps {
    topArtist: Artist[];
    setTopArtist: (artist: Artist[]) => void;
}

export const TopArtist: React.FC<TopArtistProps> = ({topArtist, setTopArtist}) => {

    useEffect(() => {
        getTopItemsForUser("artists").then(artist => setTopArtist(artist as Artist[]))

    },);

    // console.log(topArtist);

    return (
        <StyledTopArtist>
            <Text variant={"lg"} style={{fontWeight: '800'}}>Your Top Artists Last Year </Text>
            <div style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1rem"
            }}>
                {topArtist.slice(0, 15).sort((a, b) => b.popularity - a.popularity)
                    .map((artist, index) => {
                        return (
                            <ArtistCard
                                key={index}
                                name={artist.name}
                                genres={artist.genres}
                                popularity={artist.popularity}
                                image={artist.images[0].url}
                                spotify_url={artist.external_urls.spotify}
                            />
                        )
                    })
                }
            </div>
        </StyledTopArtist>
    );
}

// include this as a footer on the main page
// The popularity of the artist. The value will be between 0 and 100, with 100 being the most popular.
// The artist's popularity is calculated from the popularity of all the artist's tracks.
//style={{position: "fixed", bottom: "10px"}}
