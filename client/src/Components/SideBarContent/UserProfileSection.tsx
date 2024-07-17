import React, {useEffect} from "react"
import {Button} from "../UI Components/Button";
import {useNavigate} from "react-router-dom";
import {useUserStore} from "../../store/userStore";
import {Text} from "../UI Components/Text";
import profileImage from '../../assets/Icons/icons8-user-96-1.png'
import likedTracks from "../../assets/Icons/icons8-music-heart-96.png"
import homeIcon from '../../assets/Icons/icons8-home-96 (2).png'

export const UserProfileSection = () => {
    const navigate = useNavigate();
    const {
        user: userProfile,
        fetchUserData,
        followedArtists,
        fetchFollowingData,
        playlists,
        fetchPlaylistsData
    } = useUserStore();

    useEffect(() => {
        fetchUserData();
        fetchFollowingData();
        fetchPlaylistsData();
    }, [fetchUserData, fetchFollowingData, fetchPlaylistsData])

    // console.log("PLAYLISTS: ", playlists)

    return (
        <div style={{display: "flex", flexDirection: "column", alignItems: "flex-start", margin: '0 1rem'}}>
            {/*todo: add intermedia playlist page to show all playlist the user has saved */}
            <div
                style={{
                    display: 'flex',
                    alignItems: "center",
                    justifyContent: "center",
                    width: '100%',
                    margin: '0.5rem 0'
                }}>
                <div style={{cursor: "pointer", width: "auto", height: '3.5rem'}}
                     onClick={() => window.open(userProfile?.external_urls.spotify!, '_blank')}>
                    <img style={{borderRadius: '100px', width: '3.5rem', objectFit: "scale-down"}}
                         src={userProfile?.images.length !== 0 ? userProfile?.images[1].url : profileImage}
                         alt={"user profile"}/>
                </div>
            </div>
            <div style={{marginBottom: '0.5rem'}}>
                <Text> {userProfile?.followers.total} followers
                    · {followedArtists ? followedArtists.total : 0} followed artists
                </Text>
                <Text>{playlists.length} playlists </Text>
                <Text> {playlists.filter((playlist) => playlist.public).length} public playlists</Text>
            </div>
            <div style={{display: "flex", gap: "0.5rem"}}>
                <Button variant={"icon_clear"} size="cl" onClick={() => navigate('/')}>
                    <img src={homeIcon} alt={"home"} width={32} height={32}/>
                </Button>
                <Button variant={"icon_clear"} size="cl" onClick={() => navigate('/')}>
                    <img src={likedTracks} alt={"home"} width={32} height={32}/>
                </Button>
            </div>
        </div>
    )
}
