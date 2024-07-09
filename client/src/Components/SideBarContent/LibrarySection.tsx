import {LibraryItem} from './LibraryItem';
import styled from 'styled-components';
import {Text} from '../UI Components/Text';
import libraryIcon from '../../assets/Icons/icons8-music-library-96(1).png'
import playlistImage from '../../assets/Icons/icons8-playlist-96.png'
import {LibraryCategories} from "./LibraryCategories";
import {useEffect} from "react";
import {useUserStore} from "../../store/userStore";
import {TextLink} from "../UI Components/TextLink";
import noPlaylistImage from '../../assets/Icons/icons8-playlist-96-no.png'

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
    const {user, playlists, filteredPlaylists, fetchPlaylistsData, setFilteredPlaylists} = useUserStore();

    useEffect(() => {
        fetchPlaylistsData();
    }, [fetchPlaylistsData])

    return (
        <StyledLibrary>
            <LibraryHeader>
                <img src={libraryIcon} alt={"musicLibrary"} width={40} height={40}/>
                <Text>Your Playlists Library</Text>
            </LibraryHeader>
            {filteredPlaylists.length > 0 && <LibraryCategories/>}

            {filteredPlaylists.length === 0 &&
                <div style={{
                    margin: '1rem',
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    height: "25rem",
                    justifyContent: "center"
                }}>
                    <img src={noPlaylistImage} alt={"no playlists"} height={48} style={{paddingBottom: "0.5rem"}}/>
                    <Text style={{textAlign: "center"}}>Oh no! You don't have any playlist yet. Head over to <TextLink
                        to={user?.external_urls.spotify!}
                        target={'_blank'}>Spotify</TextLink> to
                        create your
                        first playlist!</Text>
                </div>
            }

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
