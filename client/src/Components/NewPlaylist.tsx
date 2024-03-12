import React, {useState} from 'react';
import {HeaderBar} from "./UI Components/HeaderBar";
import styled, {CSSObject} from "styled-components";
import {getPlaylist} from "../api/api";
import {Simulate} from "react-dom/test-utils";
import {Text} from "./UI Components/Text";
import DataTable, {createTheme, Theme} from "react-data-table-component";
import {columns} from "./Playlist/Columns";
import {useQuery} from 'react-query';
import TableStyle from "react-data-table-component/dist/DataTable/Table";

createTheme('spotify-dark', {
    text: {
        default: '#A39F9F !important',
    },
    background: {
        default: 'transparent',
    },
    context: {
        background: '#cb4b16',
        text: '#A39F9F',
    },
    divider: {
        default: 'transparent'
    },
    action: {
        button: 'rgba(0,0,0,.54)',
        hover: 'rgba(0,0,0,.08)',
        disabled: 'rgba(0,0,0,.12)',
    },
}, 'dark')

const tableStyles = {
    headRow: {
        style: {
            color: "#A39F9F",
            borderBottom: "rgb(150, 146, 146, 0.55) solid 1px",
            // padding: '20px 0',
            // margin: '15px',
            fontWeight: '600',
            fontSize: '13px',
        }
    },
    rows: {
        style: {
            color: "#A39F9F",
            padding: "0.5rem 0",
            fontWeight: '500',
        },
        highlightOnHoverStyle: {
            borderRadius: '0.5rem'
        }
    },
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
`

const MainBackgroundColor = styled.div`
    background-color: darkred;
`

const SecondaryBackgroundColor = styled.div`
  background-image: linear-gradient(180deg, darkred, #121212);
  height: 200px;
  //overflow-y: scroll;
`

type NewPlaylistProps = {
    playlistId: string,
    showPlaylist: boolean
}


const NewPlaylist: React.FC<NewPlaylistProps> = ({playlistId, showPlaylist}) => {
    const {data: playlist, isLoading} = useQuery(['playlist', playlistId], () => getPlaylist(playlistId))

    const totalDuration = playlist?.tracks?.items?.reduce((n: number, item: any ) => n + item.track.duration_ms, 0)
    const hours = Math.round(totalDuration / 3.6e+6)
    const minutes = Math.round(totalDuration / 60000)

    console.log("showPlaylist==", showPlaylist)
    console.log(playlist)

    const items = playlist?.tracks?.items
    console.log("Playlist items=== ", items)

    return (
        <Wrapper>
            <MainBackgroundColor>
            <HeaderBar />
                <br/>
            <div style={{display:"flex", paddingBottom: '2rem', paddingLeft: '2rem'}}>
                <img src={playlist?.images[0].url} alt={""} style={{ maxWidth:"250px", height:"auto", borderRadius: "0.3rem"}}/>
                <div style={{display:"flex", flexDirection: "column", justifyContent: "flex-end",
                    alignItems: "flex-start", paddingLeft: "1.5rem"}}>
                    <Text variant="md">Playlist</Text>
                    <Text variant="lg">{playlist?.name}</Text>
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
            <SecondaryBackgroundColor>
                    <DataTable
                        columns={columns}
                        data={items} //items of the playlist
                        highlightOnHover
                        persistTableHead
                        theme="spotify-dark"
                        fixedHeader
                        fixedHeaderScrollHeight={"350px"}
                        customStyles={tableStyles}
                        style={{border: "blue solid 2px"}}
                    />
            </SecondaryBackgroundColor>
        </Wrapper>
    );
}

export default NewPlaylist;
