import React, {useEffect, useState} from "react"
import {useAccessToken} from "../../Context/AccessTokenContext";
import {getFollowedArtistsForUser} from "../../api/api";
import homeIcon from "../../assets/Icons/icons8-boombox-96 (1).png"
import {Button} from "../UI Components/Button";
import {useNavigate} from "react-router-dom";
import {Artists} from "../../types";

export const UserProfileSection = () => {
    const {userProfile} = useAccessToken();
    const navigate = useNavigate();

    const [followedArtists, setFollowedArtist] = useState<Artists>({
        cursors: {after: "", before: ""},
        href: "",
        items: [],
        limit: 0,
        next: "",
        total: 0
    });
    // console.log("user data= ", userProfile);
    // getFollowedArtist -> to display the number of artist the user is following

    useEffect(() => {
        getFollowedArtistsForUser().then(followedArtists => {
                setFollowedArtist(followedArtists);
                // console.log(followedArtists)
            }
        ).catch(error => console.log("Error: ", error.message))
    }, [])

    return (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <img style={{borderRadius: '100px', width: '100px', marginBottom: '0.5rem'}}
                 src={userProfile?.images[1].url} alt={"user profile"}/>
            <h3 style={{color: "white", margin: '0.3rem'}}> {userProfile?.followers.total} followers
                · {followedArtists.total} followed artists
            </h3>
            <p style={{color: "white", margin: '0.3rem'}}>Public Playlists: {} </p>
            <Button variant={"icon_clear"} onClick={() => navigate('/')}>
                <img src={homeIcon} alt={"home"} width={32} height={32}/>
            </Button>
        </div>
    )
}
