import React from 'react';
import styled, {keyframes} from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Loader = styled.div`
  border: 16px solid #212121;
  border-top: 16px solid limegreen;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: ${rotate} 2s linear infinite;
`;

/* HTML: <div class="loader"></div>
.loader {
    color: #000;
    width: 4px;
    aspect-ratio: 1;
    border-radius: 50%;
    box-shadow: 19px 0 0 7px, 38px 0 0 3px, 57px 0 0 0;
    transform: translateX(-38px);
    animation: l21 .5s infinite alternate linear;
}

@keyframes l21 {
    50%  {box-shadow: 19px 0 0 3px, 38px 0 0 7px, 57px 0 0 3px}
    100% {box-shadow: 19px 0 0 0  , 38px 0 0 3px, 57px 0 0 7px}
}

border: 16px solid #212121; /* Light grey
border-top: 16px solid limegreen; /* Blue
border-radius: 50%;
width: 120px;
height: 120px;
animation: ${rotate} 2s linear infinite;

*/

const LoadingPage = () => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: "black"
        }}>
            <Loader/>
            Loading Page...
        </div>
    );
};

export default LoadingPage;
