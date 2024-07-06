import {LibraryItem} from './LibraryItem';
import styled from 'styled-components';
import {Text} from '../UI Components/Text';
import libraryIcon from '../../assets/Icons/icons8-music-library-96(1).png'
import playlistImage from '../../assets/Icons/icons8-playlist-96.png'
import {LibraryCategories} from "./LibraryCategories";
import {useEffect} from "react";
import {useUserStore} from "../../store/userStore";

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
    const {filteredPlaylists, fetchPlaylistsData} = useUserStore();

    useEffect(() => {
        fetchPlaylistsData();
    }, [fetchPlaylistsData])

    return (
        <StyledLibrary>
            <LibraryHeader>
                <img src={libraryIcon} alt={"musicLibrary"} width={40} height={40}/>
                <Text>Your Playlists Library</Text>
            </LibraryHeader>
            <LibraryCategories/>

            <LibraryItems>
                {filteredPlaylists.map((playlistObject, index) => {
                    return (
                        <LibraryItem
                            key={index}
                            name={playlistObject.name}
                            owner={playlistObject.owner.display_name}
                            type={playlistObject.type}
                            image={playlistObject.images ? playlistObject.images[playlistObject.images.length - 1].url
                                : playlistImage} //"https://picsum.photos/200/300"
                            playlist_id={playlistObject.id}
                        />
                    )
                })}
            </LibraryItems>
        </StyledLibrary>
    )
}
