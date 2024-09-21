import React, {useEffect} from "react"
import {useNavigate} from "react-router-dom";
import {useUserStore} from "../../store/userStore";
import {Text} from "../UI Components/Text";
import homeIcon from '../../assets/Icons/icons8-home-96 (2).png'
import {RxDotFilled} from "react-icons/rx";
import {TextLink} from "../UI Components/TextLink";

/*
    todo: future improvement: figure out a better design for this section
 */

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
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            margin: '0 1rem',
            padding: "0 0.5rem",
            width: "-webkit-fill-available"
        }}>
            <div style={{display: "flex", alignItems: "center", cursor: "pointer", gap: "1rem"}}
                 onClick={() => navigate('/')}>
                <img src={homeIcon} alt={"home"} width={40} height={40}/>
                <TextLink style={{fontWeight: "bold", fontSize: "20px"}} to={'/'}>Home</TextLink>
            </div>
            <div style={{marginTop: '0.5rem'}}>
                <div style={{display: "flex", flexWrap: "wrap"}}>
                    <Text> {userProfile?.followers.total} followers</Text>
                    <RxDotFilled/>
                    <Text>{followedArtists ? followedArtists.total : 0} followed artists</Text>
                </div>
                <div>
                    <Text> {playlists.filter((playlist) =>
                        playlist.owner.display_name === userProfile?.display_name!).length} original playlists
                    </Text>
                    <Text> {playlists.length} total playlists </Text>
                </div>
            </div>
        </div>
    )
}
