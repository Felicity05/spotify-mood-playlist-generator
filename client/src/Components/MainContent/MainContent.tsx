import React, {HTMLAttributes, useEffect, useState} from "react";
import {useAccessToken} from "../../Context/AccessTokenContext";
import {useMoodSourceStore} from "../../store/moodStore";
import {useTimeOfDay} from "../../custom_hooks/useTimeOfDay";
import {useGeneratePlaylist} from "../../custom_hooks/useGeneratePlaylist";
import {useUserStore} from "../../store/userStore";
import {MoodSelector} from "./MoodSelector";
import TracksSourceSelector from "./TracksSourceSelector";
import styled from "styled-components";
import {Text} from "../UI Components/Text";
import {TextLink} from "../UI Components/TextLink";
import {Button} from "../UI Components/Button";
import Modal from "../UI Components/Modal";
import ProgressBar from "../UI Components/ProgressBar";
import {TopArtist} from "./TopArtist";
import {Artist} from "../../types";
import {getRecentlyPlayedTracks} from "../../api/api";
import restart from '../../assets/Icons/icons8-rotate-left-96.png'
import ohNoImage from '../../assets/Icons/icons8-no-audio-wave-100.png'
import {useNavigate} from "react-router-dom";
import turntablePlayer from '../../assets/turntable-img.png'
import {PlayHistory} from "../../utils/trackTypes";

//TODO: add types for track object, artist object, clean up this component

const CardContent = styled.div`
  //background-image: linear-gradient(180deg, rgba(14, 192, 76, 0.74),
  // rgba(85, 30, 153, 0.60), rgba(140, 32, 223, 0));
  //border: blue solid 2px;
  display: flex;
  flex-direction: column;
  padding: 0 0.5rem 0 1rem;
  position: relative;
  z-index: 999;
`

interface MainContentProps extends HTMLAttributes<HTMLDivElement> {
}

export const MainContent: React.FC<MainContentProps> = () => {
    const {isLoggedIn, loading} = useAccessToken();
    const {user: userProfile} = useUserStore();
    const timeOfDay = useTimeOfDay();

    const [showModal, setShowModal] = useState<boolean>(false);
    const [topArtist, setTopArtist] = useState<Artist[]>([]);
    const [listeningHistory, setListeningHistory] = useState<boolean>(false);
    const [activeSourceButton, setActiveSourceButton] = useState<string | null>("");
    const [activeMoodButton, setActiveMoodButton] = useState<string | null>("");

    const {
        selectedMood: mood, selectedTrackSource: source,
        setSelectedMood: setMood, setSelectedTrackSource: setTrackSource
    } = useMoodSourceStore();

    const {
        showProgressBar,
        createPlaylistFlow,
        playlistSize,
        showModal: hookShowModal,
        setShowModal: setHookShowModal,
        message: hookMessage
    } = useGeneratePlaylist();

    useEffect(() => {
        const fetchRecentlyPlayedTracks = async () => {
            const res: PlayHistory[] = await getRecentlyPlayedTracks();
            console.log(res)
            if (res.length > 0) setListeningHistory(true);
        }

        if (isLoggedIn) {
            fetchRecentlyPlayedTracks().then(r => console.log(r));
        }
    }, [isLoggedIn]);

    if (!isLoggedIn) {
        return null; // Render nothing if the user is not logged in
    }

    const handlePlaylistCreation = async () => {
        await createPlaylistFlow(mood, source, topArtist);
    }

    /*Modal options for when playlist is smaller than 5 tracks*/
    const handleConfirm = async () => {
        setShowModal(false);
        setHookShowModal(false);
        //todo: send variable to hook so the playlist creation flow continues
        console.log("create playlist with selected songs -- need to work on this functionality")
    }

    const handleResetMood = () => {
        setMood("")
        setShowModal(false);
        setHookShowModal(false);
    }

    const handleResetTrackSource = () => {
        setTrackSource("")
        setShowModal(false);
        setHookShowModal(false);
    }

    const handleResetMoodAndTrackSource = () => {
        setMood("")
        setTrackSource("")
        setShowModal(false);
        setHookShowModal(false);
        setActiveSourceButton("");
        setActiveMoodButton("");
    }

    console.log("listeningHistory== ", listeningHistory);
    console.log("loading== ", loading);

    return (
        <CardContent>
            <h1 style={{color: "white"}}>Good {timeOfDay}, {userProfile?.display_name.split(" ")[0]}!</h1>

            {listeningHistory && !loading && <>
                <h2>Ready to create your moodified playlist with a single click? </h2>
                <Modal
                    isOpen={showModal || hookShowModal}
                    onClose={handleResetMoodAndTrackSource}
                    onConfirm={handleConfirm}
                    handleMood={handleResetMood}
                    handleTrackSource={handleResetTrackSource}
                    handleBoth={handleResetMoodAndTrackSource}
                    message={playlistSize.toString()}
                    hookMessage={hookMessage}
                />
                <div>
                    <TracksSourceSelector activeButton={activeSourceButton} setActiveButton={setActiveSourceButton}
                                          recentlyListened={listeningHistory}/>
                    <MoodSelector activeButton={activeMoodButton} setActiveButton={setActiveMoodButton}/>
                </div>
                {/*<div style={{position: "absolute", top: "125px", left: "620px"}}>*/}
                {/*    <img src={turntablePlayer} alt={"turntable music player"}*/}
                {/*         style={{width: "100%", height: "250px"}}/>*/}
                {/*    /!*have it playing whatever song is currently playing on the spotify user*!/*/}
                {/*</div>*/}
                <div>
                    <p>Great! You're all set. Just click below to witness the magic happen! </p>
                    <div style={{display: "flex", gap: "1.5rem", paddingLeft: '1rem', alignItems: "center"}}>
                        <Button variant="primary" size="lg" disabled={!source || !mood}
                                onClick={handlePlaylistCreation}> Generate Playlist
                            {/*music waves animation here */}
                        </Button>
                        <Button variant={"icon"} disabled={!source && !mood}
                                onClick={handleResetMoodAndTrackSource} style={{padding: "0.35rem", height: "2.25rem"}}>
                            <img src={restart} alt={"restart"} width={24} height={24}/>
                        </Button>
                    </div>
                </div>
                {showProgressBar && <ProgressBar/>}
                <br/>
                <TopArtist topArtist={topArtist} setTopArtist={setTopArtist}/>
            </>}


            {!listeningHistory && loading &&
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                    height: "25rem",
                    padding: "2rem"
                }}>
                    <img src={ohNoImage} alt={"oh no"}/>
                    <Text variant={"mdd"} style={{textAlign: "center"}}> Oh no! It looks like you are new to <TextLink
                        to={userProfile?.external_urls.spotify!}
                        target={'_blank'} style={{color: "#1DB954", fontWeight: "700"}}>Spotify</TextLink> and
                        don't have any activity yet.
                        Start listening and then come back here to create your custom playlists!</Text>
                </div>
            }
        </CardContent>
    )
}
