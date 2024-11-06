import React, {HTMLAttributes, useState} from 'react';
import {useUserStore} from "../../store/userStore";
import {Button} from "../UI Components/Button";
import styled from "styled-components";
import search from '../../assets/Icons/icons8-search-96 (1).png'
import icon_close from '../../assets/Icons/icons8-close-64-white.png'

const ButtonBar = styled.div`
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  margin-bottom: 0.5rem;
  //border: solid 2px #1db954;
  scrollbar-width: none;
`
const SearchContainer = styled.div`
  background-color: #212121;
  border-radius: 9999rem;
  padding: 0.2rem 0.85rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  position: relative;
`;

const StyledSearchBar = styled.input`
  background-color: transparent;
  border: none;
  appearance: none;
  outline: none;
  width: 100%;
  height: 20px;
  color: white;

  &::-webkit-search-cancel-button {
    appearance: none;
  }
`

const ClearIcon = styled.img`
  position: absolute;
  right: 10px;
`;

export const LibraryCategories = ({
                                      searchTerm,
                                      setSearchTerm
                                  }: { searchTerm: string, setSearchTerm: (value: string) => void }) => {
    const {user, playlists, setFilteredPlaylists, resetFilteredPlaylists} = useUserStore();
    const [activeFilter, setActiveFilter] = useState<string | null>(null);
    // const [searchTerm, setSearchTerm] = useState<string>('');

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

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchTerm(value);
        const filteredData = playlists.filter(playlist =>
            playlist.name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredPlaylists(filteredData);
    };

    const clearSearch = () => {
        setSearchTerm('');
        setFilteredPlaylists(playlists);
    };


    return (
        <div style={{padding: "0 0.5rem"}}>
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
            <SearchContainer>
                <img src={search} alt={"search"} width={24}/>
                <StyledSearchBar type={"search"} name={"search"}
                                 placeholder={"Search your library..."}
                                 value={searchTerm}
                                 onChange={handleSearch}
                />
                {searchTerm && (
                    <ClearIcon src={icon_close} alt={"clear search"} width={12} onClick={clearSearch}/>
                )}
            </SearchContainer>
        </div>
    );
}
