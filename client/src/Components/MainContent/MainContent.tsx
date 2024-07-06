import {Button} from "../UI Components/Button";
import React, {HTMLAttributes, useState} from "react";
import TracksSourceSelector from "./TracksSourceSelector";
import {MoodSelector} from "./MoodSelector";
import {useMoodSourceStore} from "../../store/moodStore";
import Modal from "../UI Components/Modal";
import ProgressBar from "../UI Components/ProgressBar";
import styled from "styled-components";
import {TopArtist} from "./TopArtist";
import {Artist} from "../../types";
import restart from '../../assets/Icons/icons8-rotate-left-96.png'
import {useTimeOfDay} from "../../custom_hooks/useTimeOfDay";
import MainFooter from "./MainFooter";
import {useGeneratePlaylist} from "../../custom_hooks/useGeneratePlaylist";
import {useUserStore} from "../../store/userStore";

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
    const {user: userProfile} = useUserStore();
    const timeOfDay = useTimeOfDay();

    const [showModal, setShowModal] = useState<boolean>(false);
    const [topArtist, setTopArtist] = useState<Artist[]>([])

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
    }

    return (
        <CardContent>
            <h1 style={{color: "white"}}>Good {timeOfDay}, {userProfile?.display_name.split(" ")[0]}</h1>
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
            <TracksSourceSelector/>
            {source && <MoodSelector/>} {/*conditional rendering after selecting track source*/}
            {mood && source &&   /*conditional rendering once both mood and source are set */
                <div>
                    <p>Great! Now that you've made your selections, you're all. Just click
                        below to get your playlist! </p>
                    <Button variant="primary" size="lg" onClick={handlePlaylistCreation}>Generate Playlist</Button>
                </div>}
            {showProgressBar && <ProgressBar/>}
            <br/>
            <div>
                <Button variant={"icon"} size={"cl"} onClick={handleResetMoodAndTrackSource}>
                    <img src={restart} alt={"restart"} width={48}/>
                </Button>
            </div>
            <TopArtist topArtist={topArtist} setTopArtist={setTopArtist}/>
            <hr style={{
                width: '98%',
                height: .2,
                backgroundColor: "hsla(0,0%,100%,.6)"
            }}/>
            <MainFooter/>
        </CardContent>
    )
}
