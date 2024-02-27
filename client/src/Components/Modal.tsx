import React, {useState} from 'react';
import styled from "styled-components";
import {Button} from "./Button";

const ModalWrapper = styled.div<{ is_visible: any }>`
  display: ${({ is_visible }) => (is_visible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
`

const ModalContent = styled.div`
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

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    onCancel: () => void;
    message: string;
}

// @ts-ignore
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm, onCancel, message }) => {
    if (!isOpen) return null;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [showResetOptions, setShowResetOptions] = useState(false)

    const handleNoClick = () => {
        setShowResetOptions(true);
    };

    return (
        <ModalWrapper is_visible={isOpen.toString()}>
            <ModalContent>
            {!showResetOptions ? ( <>
                    <p style={{marginBottom: '0px'}}>There would be only {message} songs on your playlist. </p>
                    <p>Are you sure you want to continue?</p>
                    <ModalButtons>
                        <Button onClick={onConfirm}>Yes</Button>
                        <Button onClick={handleNoClick}>No</Button>
                    </ModalButtons>
                </>)
                : ( <>
                    <p>What would you like to reset?</p>
                    <ModalButtons>
                        <Button >Mood</Button>
                        <Button >Tracks Source</Button>
                        <Button> Both </Button>
                    </ModalButtons>
                </>)
            }
            </ModalContent>
        </ModalWrapper>
    );
}

export default Modal;
