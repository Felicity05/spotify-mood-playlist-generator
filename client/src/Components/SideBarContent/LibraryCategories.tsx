import React, {useState} from 'react';
import {Button} from "../UI Components/Button";
import styled from "styled-components";
import search from '../../assets/Icons/icons8-search-96 (1).png'
import {Text} from '../UI Components/Text';
import {useUserStore} from "../../store/userStore";
import {Simulate} from "react-dom/test-utils";
import play = Simulate.play;
import icon_close from '../../assets/Icons/icons8-close-64-white.png'

const ButtonBar = styled.div`
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  margin-bottom: 0.5rem;
  //border: solid 2px #1db954;
  scrollbar-width: none;
`

export const LibraryCategories = () => {
    const {user, playlists, setFilteredPlaylists, resetFilteredPlaylists} = useUserStore();
    const [activeFilter, setActiveFilter] = useState<string | null>(null);

    const filterPlaylistByAuthor = (author: string) => {
        if (activeFilter === author) {
            resetFilters();
        } else {
            const filteredData = playlists.filter(playlist => playlist.owner.display_name === author)
            setActiveFilter(author);
            setFilteredPlaylists(filteredData);
            console.log(filteredData)
        }
        console.log("filter function has been called -- ", activeFilter);
    }

    const filterPlaylistByOthers = () => {
        if (activeFilter === 'others') {
            resetFilters();
        } else {
            const filteredData = playlists.filter(playlist => playlist.owner.display_name !== user?.display_name
                && playlist.owner.display_name !== 'Spotify')
            setActiveFilter('others');
            setFilteredPlaylists(filteredData);
            console.log(filteredData)
        }
        console.log("filter by others function has been called -- ", activeFilter);
    }

    const resetFilters = () => {
        setActiveFilter(null);
        resetFilteredPlaylists();
    };

    return (
        <div style={{marginLeft: "0.5rem", marginRight: "0.5rem"}}>
            <ButtonBar>
                {/*<Button variant={"secondary"} size={"sm"}*/}
                {/*        onClick={(event) => handleActive(event.target)}>Playlists</Button>*/}
                {/*<Button variant={"secondary"} size={"sm"} onClick={handleActive}>Artists</Button>*/}
                {/*<Button variant={"secondary"} size={"sm"} onClick={handleActive}>Albums</Button>*/}
                {/*only show this two when playlist is active*/}
                {activeFilter && (
                    <>
                        <Button variant={'icon'} size={'cl'} onClick={resetFilters}>
                            <img src={icon_close} alt={"close icon"} width={12}/>
                        </Button>
                        <Button variant={'secondary'} size={'sm'} onClick={() => filterPlaylistByAuthor(activeFilter)}>
                            {activeFilter === 'others' ? 'By Others' : `By ${activeFilter}`}
                        </Button>
                    </>
                )}

                {!activeFilter && (
                    <>
                        <Button variant={"secondary"} size={"sm"}
                                onClick={() => filterPlaylistByAuthor(user?.display_name!)}>
                            By You
                        </Button>
                        <Button variant={"secondary"} size={"sm"} onClick={() => filterPlaylistByAuthor("Spotify")}>
                            By Spotify
                        </Button>
                        <Button variant={"secondary"} size={"sm"} onClick={filterPlaylistByOthers}>
                            By Others
                        </Button>
                    </>
                )}
            </ButtonBar>
            <div style={{
                backgroundColor: "#212121",
                borderRadius: "9999rem",
                padding: "0.2rem 1rem",
                marginBottom: "0.5rem",
                display: "flex",
                alignItems: "center"
            }}>

                <img src={search} alt={"search"} width={24}/>
                <input type={"search"} style={{backgroundColor: "transparent", border: "none"}}
                       placeholder={"Search your library..."}
                />
            </div>
        </div>
    );
}
