import {useEffect, useState} from "react";
import {useUserStore} from "../../store/userStore";
import {Text} from '../UI Components/Text';
import {TextLink} from "../UI Components/TextLink";
import {LibraryItem} from './LibraryItem';
import {LibraryCategories} from "./LibraryCategories";
import styled from 'styled-components';
import libraryIcon from '../../assets/Icons/icons8-music-library-96(1).png'
import playlistImage from '../../assets/Icons/icons8-musical-note-96 copy.png'
import noPlaylistImage from '../../assets/Icons/icons8-playlist-96-no.png'

const StyledLibrary = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  overflow-y: auto;
`

const LibraryHeader = styled.div`
  display: flex;
  gap: 0.5rem;
  padding-left: 0.5rem;
  padding-bottom: 0.5rem;
  align-items: center;
`

const LibraryItemsWrapper = styled.div`
`

const NoPlaylistsWrapper = styled.div`
  margin: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 20rem;
  justify-content: center
`

export const LibrarySection = () => {
    const {user, filteredPlaylists, fetchPlaylistsData} = useUserStore();
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        fetchPlaylistsData();
    }, [fetchPlaylistsData])

    return (
        <StyledLibrary>
            <div style={{
                position: "sticky",
                zIndex: "1000",
                top: 0,
                backgroundColor: "#121212",
                padding: "0 0.5rem",
                border: "solid 2px #121212"
            }}>
                <LibraryHeader>
                    <img src={libraryIcon} alt={"musicLibrary"} width={40} height={40}/>
                    <Text>Your Playlists Library</Text>
                </LibraryHeader>
                <LibraryCategories searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
            </div>

            <div style={{padding: "0.5rem"}}>
                {filteredPlaylists.length === 0 &&
                    <NoPlaylistsWrapper>
                        {searchTerm ? (
                            <>
                                <Text style={{textAlign: "center", paddingBottom: "1rem"}} variant={"md"}>
                                    No playlists found matching "{searchTerm}".
                                </Text>
                                <Text style={{textAlign: "center"}}>
                                    Try searching again using a different spelling or keyword.
                                </Text>
                            </>
                        ) : (
                            <>
                                <img src={noPlaylistImage} alt={"no playlists"} height={48}
                                     style={{paddingBottom: "0.5rem"}}/>
                                <Text style={{textAlign: "center"}}> Oh no! You don't have any playlist yet. Head over
                                    to <TextLink to={user?.external_urls.spotify!} target={'_blank'}
                                                 style={{color: "#1DB954", fontWeight: "700"}}>Spotify
                                    </TextLink> to create your first playlist!
                                </Text>
                            </>
                        )}
                    </NoPlaylistsWrapper>
                }

                <LibraryItemsWrapper>
                    {filteredPlaylists.map((playlistObject, index) => {
                        return (
                            <LibraryItem
                                key={index}
                                name={playlistObject.name}
                                owner={playlistObject.owner.display_name}
                                type={playlistObject.type}
                                image={playlistObject.images ? playlistObject.images[playlistObject.images.length - 1].url
                                    : playlistImage}
                                playlist_id={playlistObject.id}
                                searchTerm={searchTerm}
                            />
                        )
                    })}
                </LibraryItemsWrapper>
            </div>
        </StyledLibrary>
    )
}
