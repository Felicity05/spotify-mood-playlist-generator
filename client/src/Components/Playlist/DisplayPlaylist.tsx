import React from 'react';
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
    table: {
        style: {
            backgroundColor: "transparent",
            width: '100%',
        },
    },
    headRow: {
        style: {
            color: "#A39F9F",
            borderBottom: 'rgb(150, 146, 146, 0.55) solid 1px',
            fontWeight: '600',
            fontSize: '13.5px',
            width: "100%",
            marginBottom: '0.5rem'
        }
    },
    rows: {
        style: {
            color: "#A39F9F",
            padding: "0.5rem 0",
            fontWeight: '500',
            width: "100%"
        },
        highlightOnHoverStyle: {
            borderRadius: '0.5rem'
        }
    },
    cells: {
        style: {
            // border: "solid pink",
            width: "20px"
        }
    }
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const PlaylistBody = styled.div`
  background-color: rgba(18, 18, 18, 0.3);
  //border: solid yellowgreen;
  padding: 0 1.25rem;
  z-index: 99;
  overflow: clip;
`

type NewPlaylistProps = {
    playlistId?: string,
    showPlaylist?: boolean
}

//todo: get a cool animation to put here
const LoadingPlaylist = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #1db954;
  z-index: 99;
  height: 90vh;
`

const StickyTableHeader = styled.div<{ scrolled?: boolean }>`
  background-color: ${({scrolled}) => (scrolled ? 'rgba(0, 0, 0, 0.8)' : 'purple')};
  transition: background-color 0.3s;
  width: 100%;
  z-index: 1000;
  border: solid purple 2px;
  padding: 20px;
  position: sticky;
  top: 57px;
`;


export const DisplayPlaylist: React.FC<NewPlaylistProps> = () => {
    const {playlistId} = useParams<{ playlistId: string }>();
    const {data: playlist, isLoading} = useQuery(['playlist', playlistId], () => getPlaylist(playlistId!))
    const playlistTracks = playlist?.tracks?.items

    //todo: future: implement function to get all playlist tracks - limit to 100 per request

    /* for debugging purposes
        console.log(playlist)
        console.log("playlistId== ", playlistId)
        console.log("Playlist playlistTracks=== ", playlistTracks)
     */

    return (
        <Wrapper>
            {isLoading ?
                <LoadingPlaylist>
                    <h1>Loading Playlist...</h1>
                </LoadingPlaylist> :
                <>
                    <PlaylistHeader playlist={playlist}/>
                    <PlaylistBody>
                        {/*<StickyTableHeader>*/}
                        {/*    # Title Album Date Added Clock*/}
                        {/*</StickyTableHeader>*/}
                        <DataTable
                            columns={columns}
                            data={playlistTracks} //tracks of the playlist
                            highlightOnHover
                            persistTableHead
                            theme="spotify-dark"
                            customStyles={tableStyles}
                            responsive={false}
                        />
                    </PlaylistBody>
                </>}
        </Wrapper>
    );
}
