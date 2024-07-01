import React, {useState} from 'react';
import styled from "styled-components";
import {Button} from "./Button";
import closeIcon from '../../assets/Icons/icons8-close-64-white.png'
import {Text} from "./Text";

const PageOverlay = styled.div<{ is_visible: string }>`
  display: ${({is_visible}) => (is_visible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
`

const ModalBox = styled.div`
  background-color: #121212;
  width: 500px;
  height: 300px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 50%;
  left: 60%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 25px;
`

const ModalButtons = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  button {
    margin: 0 10px;
  }
`

const ModalHeader = styled.div`
  display: flex;
  position: fixed;
  top: 10px;
  right: 10px;
`;

const ModalContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const HookMessageStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  width: 300px;
  gap: 1.5rem;
`

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    onCancel?: () => void;
    message: string;
    handleMood: () => void;
    handleTrackSource: () => void;
    handleBoth: () => void;
    hookMessage: string;
}

// @ts-ignore
const Modal: React.FC<ModalProps> = ({
                                         isOpen, onClose, onConfirm, handleMood,
                                         handleTrackSource, handleBoth, message, hookMessage
                                     }) => {

    if (!isOpen) return null;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [showResetOptions, setShowResetOptions] = useState(false)

    const handleNoClick = () => {
        setShowResetOptions(true);
    };

    return (
        <PageOverlay is_visible={isOpen.toString()}>
            <ModalBox>
                <ModalHeader>
                    <Button variant="icon_clear" size="cl" onClick={onClose}>
                        <img src={closeIcon} alt={""} className="close-icon" width={24}/>
                    </Button>
                </ModalHeader>
                <ModalContent>
                    {hookMessage ? (
                            <HookMessageStyled>
                                <Text variant={"md"}>{hookMessage}</Text>
                                <Button variant="secondary" size={"md"} onClick={onClose}>OK</Button>
                            </HookMessageStyled>)
                        : (<>
                            <p style={{marginBottom: '0px'}}>There would be only {message} songs on your playlist. </p>
                            <p>Are you sure you want to continue?</p>
                            <ModalButtons>
                                <Button variant="secondary" size="lg" onClick={handleNoClick}>No</Button>
                                <Button variant="secondary" size="lg" onClick={onConfirm}>Yes</Button>
                            </ModalButtons>
                        </>)}

                    {showResetOptions && (<>
                        <p>What would you like to reset?</p>
                        <ModalButtons>
                            <Button variant="secondary" size="md" onClick={handleMood}>Mood</Button>
                            <Button variant="secondary" size="md" onClick={handleTrackSource}>Tracks Source</Button>
                            <Button variant="secondary" size="md" onClick={handleBoth}> Start Over </Button>
                        </ModalButtons>
                    </>)}
                </ModalContent>
            </ModalBox>
        </PageOverlay>
    );
}

export default Modal;
