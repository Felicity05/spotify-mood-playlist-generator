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
import useDetectScreenDeviceSize, {COMMON_BREAK_POINTS} from "../AppLayout/useDetectScreenDeviceSize";

const StyledLibrary = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  overflow-y: auto;
  z-index: 5;
`

const LibraryHeader = styled.div`
  display: flex;
  gap: 0.5rem;
  padding-left: 0.5rem;
  padding-bottom: 0.5rem;
  align-items: center;
`

const LibraryItemsWrapper = styled.div`
  //margin: 1.5rem 0;
  //overflow: hidden;
  //overflow-y: auto;
`

const NoPlaylistsWrapper = styled.div`
  margin: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 20rem;
  justify-content: center
`

const StickyHeader = styled.div`
  z-index: 1000;
  top: 0;
  background-color: #121212;
  padding: 0.5rem;
  position: sticky;
  box-sizing: border-box;
  width: 100%;
`;

export const LibrarySection = () => {
    const {user, filteredPlaylists, fetchPlaylistsData} = useUserStore();
    const [searchTerm, setSearchTerm] = useState<string>("");
    const isMobileView = useDetectScreenDeviceSize(COMMON_BREAK_POINTS.small);

    useEffect(() => {
        fetchPlaylistsData();
    }, [fetchPlaylistsData])

    return (
        <StyledLibrary>
            <StickyHeader>
                {!isMobileView && <LibraryHeader>
                    <img src={libraryIcon} alt={"musicLibrary"} width={40} height={40}/>
                    <Text>Your Playlists Library</Text>
                </LibraryHeader>}
                <LibraryCategories searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
            </StickyHeader>

            <div style={{padding: "0 0.5rem"}}>
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
                    {filteredPlaylists.map((playlist, index) => {
                        return (
                            <LibraryItem
                                key={index}
                                name={playlist.name}
                                owner={playlist.owner.display_name}
                                type={playlist.type}
                                image={playlist.images ? playlist.images[playlist.images.length - 1].url
                                    : playlistImage}
                                playlist_id={playlist.id}
                                searchTerm={searchTerm}
                            />
                        )
                    })}
                </LibraryItemsWrapper>
            </div>
        </StyledLibrary>
    )
}
