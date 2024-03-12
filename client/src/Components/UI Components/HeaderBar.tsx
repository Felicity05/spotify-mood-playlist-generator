import React from 'react';
import {Button} from "./Button";
import arrowLeft from '../../assets/Icons/icons8-arrow-96.png'
import arrowRight from '../../assets/Icons/icons8-arrow-96(1).png'

export const HeaderBar = () => {
    return (
        <div>
            <Button variant="icon" size="sm">
                <img src={arrowLeft} alt="" width="24"/>
            </Button>
            <Button variant="icon" size="sm">
                <img src={arrowRight} alt="" width="24"/>
            </Button>
        </div>
    );
}
