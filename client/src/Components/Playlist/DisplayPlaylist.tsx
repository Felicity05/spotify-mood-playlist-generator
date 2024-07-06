import React, {useEffect, useState} from 'react';
import {PlaylistHeader} from "./PlaylistHeader";
import styled from "styled-components";
import {getPlaylist} from "../../api/api";
import DataTable, {createTheme} from "react-data-table-component";
import {columns} from "./Columns";
import {useQuery} from 'react-query';
import {useParams} from "react-router-dom";

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
            borderBottom: 'rgb(150, 146, 146, 0.55) solid 1px',
            fontWeight: '600',
            fontSize: '13.5px',
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
  //border: yellow solid 2px;
  width: 100%;
`

const PlaylistBody = styled.span`
  //background-image: linear-gradient(180deg, darkred, #121212);
  //height: 200px;
  //overflow-y: scroll;
  //background-color: rgba(45, 18, 18, 0.3); //for testing
  background-color: rgba(18, 18, 18, 0.3);
`

type NewPlaylistProps = {
    playlistId?: string,
    showPlaylist?: boolean
}

const LoadingPlaylist = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #1db954;
`

const StickyTableHeader = styled.div<{ scrolled?: boolean }>`
  background-color: ${({scrolled}) => (scrolled ? 'rgba(0, 0, 0, 0.8)' : 'purple')};
  transition: background-color 0.3s;
  width: 100%;
  z-index: 1000;
  border: solid purple 2px;
  padding: 20px;
  position: sticky;
  top: 50px;
`;


export const DisplayPlaylist: React.FC<NewPlaylistProps> = ({showPlaylist}) => {
    const {playlistId} = useParams<{ playlistId: string }>();
    const {data: playlist, isLoading} = useQuery(['playlist', playlistId], () => getPlaylist(playlistId!))

    //todo: implement function to get all playlist tracks - limit to 100 per request

    // console.log("showPlaylist==", showPlaylist)
    // console.log(playlist)
    console.log("playlistId== ", playlistId)

    //todo: show total of items of playlist, now limited to 100
    const items = playlist?.tracks?.items
    console.log("Playlist items=== ", items)

    return (
        <Wrapper>
            {isLoading ? <LoadingPlaylist> Getting Playlist...</LoadingPlaylist> :
                <>
                    <PlaylistHeader playlist={playlist}/>
                    <PlaylistBody>
                        <StickyTableHeader>
                            hello
                        </StickyTableHeader>
                        <div style={{margin: '0 1.3rem'}}>
                            <DataTable
                                columns={columns}
                                data={items} //items of the playlist
                                highlightOnHover
                                persistTableHead
                                theme="spotify-dark"
                                customStyles={tableStyles}
                            />
                        </div>
                    </PlaylistBody>
                </>}
        </Wrapper>
    );
}
