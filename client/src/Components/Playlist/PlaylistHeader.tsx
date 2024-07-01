import React from 'react';
import {Button} from "../UI Components/Button";
import arrowLeft from '../../assets/Icons/icons8-arrow-96.png'
import arrowRight from '../../assets/Icons/icons8-arrow-96(1).png'
import {Text} from "../UI Components/Text";
import styled from "styled-components";

const MainBackgroundColor = styled.span`
  //background-color: darkred;
  margin: 1.5rem 0;
  z-index: 99;
`

export const PlaylistHeader: React.FC<any> = ({playlist}) => {
    const totalDuration = playlist?.tracks?.items?.reduce((n: number, item: any) => n + item.track.duration_ms, 0)
    const hours = Math.round(totalDuration / 3.6e+6)
    const minutes = Math.round(totalDuration / 60000)

    return (
        <MainBackgroundColor>
            <div style={{display: "flex", paddingBottom: '1rem', paddingLeft: '2rem'}}>
                <img src={playlist?.images[0].url} alt={""}
                     style={{maxWidth: "200px", height: "200px", borderRadius: "0.3rem"}}/>
                <div style={{
                    display: "flex", flexDirection: "column", justifyContent: "flex-end",
                    alignItems: "flex-start", paddingLeft: "1.5rem"
                }}>
                    <Text variant="md">Playlist</Text>
                    <Text variant="xl">{playlist?.name}</Text>
                    <Text>{playlist?.description.replace(/&#(\d+);/g, (_: any, match: number) =>
                        String.fromCharCode(match)
                    )}</Text>
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
