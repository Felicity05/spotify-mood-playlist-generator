import {LibraryItem} from './LibraryItem';
import styled from 'styled-components';
import {Text} from '../UI Components/Text';
import playlistIcon from '../../assets/Icons/icons8-music-library-96(1).png'
import {LibraryCategories} from "./LibraryCategories";
import {useEffect, useState} from "react";
import {getPlaylistsForCurrentUser} from "../../api/api";
import {Playlist} from "../../utils/playlistTypes";
import {Button} from "../UI Components/Button";

const StyledLibrary = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  box-sizing: border-box;
  width: 100%;
  //border: solid 2px red;
`

const LibraryHeader = styled.div`
  display: flex;
  gap: 0.5rem;
  padding-left: 0.5rem;
  padding-bottom: 0.5rem;
  align-items: center;
  //border: solid 2px purple;
`

const LibraryItems = styled.div`
`

export const LibrarySection = () => {
    const [playlist, setPlaylists] = useState<Playlist[]>([]);

    useEffect(() => {

        getPlaylistsForCurrentUser().then(response => (
            setPlaylists(response)
        )).catch(error => console.log("Error: ", error.message))

    }, [])

    return (
        <StyledLibrary>
            <LibraryHeader>
                <img src={playlistIcon} alt={"musicLibrary"} width={40} height={40}/>
                <Text>Your Playlist Library</Text>
            </LibraryHeader>
            <LibraryCategories/>

            <LibraryItems>
                {playlist.map((item, index) => {
                    return (
                        <LibraryItem
                            key={index}
                            name={item.name}
                            owner={item.owner.display_name}
                            type={item.type}
                            image={item.images[item.images.length - 1].url} //"https://picsum.photos/200/300"
                            playlist_id={item.id}
                        />
                    )
                })}
            </LibraryItems>
        </StyledLibrary>
    )
}
