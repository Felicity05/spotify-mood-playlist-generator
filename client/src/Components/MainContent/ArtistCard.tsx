import React from 'react';
import styled from "styled-components";
import {Text} from "../UI Components/Text";

const StyledArtistCard = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.5rem;
  //border: solid 2px mediumvioletred;
  padding: 1rem;
  width: 185px;
  box-sizing: border-box;
  justify-content: flex-start;


  &:hover {
    background-color: #2a2a2a;
    border-radius: 0.5rem;
  }

  @media (max-width: 768px) {
    width: 140px;
  }

  @media (max-width: 820px) {
    width: 175px;
  }
`

const StyledImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;

  @media (max-width: 768px) {
    width: 115px;
    height: 115px;
  }
`

interface ArtistCardProps {
    name: string;
    genres: string[];
    popularity: number;
    image: string;
    spotify_url: string;
}


export const ArtistCard: React.FC<ArtistCardProps> = ({
                                                          name, genres, popularity,
                                                          image, spotify_url
                                                      }) => {

    const handleOnClick = () => {
        window.open(spotify_url, '_blank'); // Open URL in a new tab
    }

    return (
        <StyledArtistCard onClick={handleOnClick}>
            {/*todo: fix scale of image so it doesn't loose quality*/}
            <StyledImage src={image} alt={"artist"}/> {/* "https://picsum.photos/200/300" */}
            <div style={{marginTop: "0.5rem"}}>
                <Text variant={"md"}>{name}</Text>
                <div style={{display: "flex"}}>
                    {genres.slice(0, 1).map((genre, index) => {
                        return (<Text variant={"sm"} key={index}>
                            Genres: {genre}
                        </Text>)
                    })}
                </div>
                <Text variant={"sm"}>Popularity: {popularity} </Text>
            </div>
        </StyledArtistCard>
    );
}
