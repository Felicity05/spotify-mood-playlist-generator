import React from 'react';
import styled from "styled-components";
import './waveBarsStyle.css';

const WavesWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.75);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
`

const MusicWaves = () => {
    return (
        <WavesWrapper>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </WavesWrapper>
    );
}

export default MusicWaves;
