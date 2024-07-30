import React, {useEffect} from "react"
import {Link, useNavigate} from "react-router-dom";
import {useUserStore} from "../../store/userStore";
import {Text} from "../UI Components/Text";
import {Button} from "../UI Components/Button";
import profileImage from '../../assets/Icons/icons8-user-96-1.png'
import likedTracks from "../../assets/Icons/icons8-music-heart-96.png"
import homeIcon from '../../assets/Icons/icons8-home-96 (2).png'
import {GoDotFill} from "react-icons/go";
import {BsDot} from "react-icons/bs";
import {RxDotFilled} from "react-icons/rx";
import {TextLink} from "../UI Components/TextLink";

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
            <div style={{
                marginTop: '1.2rem',
                display: "flex",
                flexDirection: "column",
                gap: "1rem"
            }}>
                <Text
                    style={{display: "flex", alignItems: "center"}}>
                    {userProfile?.followers.total} followers <RxDotFilled/> {followedArtists ? followedArtists.total : 0} followed
                    artists
                </Text>
                <Text style={{display: "flex", alignItems: "center"}}>
                    {playlists.filter((playlist) => playlist.owner.display_name === userProfile?.display_name!).length} original
                    playlists <RxDotFilled/> {playlists.length} total playlists
                </Text>
            </div>
        </div>
    )
}
