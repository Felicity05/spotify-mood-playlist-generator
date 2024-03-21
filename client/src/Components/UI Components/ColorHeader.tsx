import React, {HTMLAttributes, ReactNode} from 'react';
import {useLocation} from "react-router-dom";
import {useAccessToken} from "../../Context/AccessTokenContext";

interface ColorHeaderProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
}

const ColorHeader: React.FC<ColorHeaderProps> = ({children, ...rest}) => {
    const location = useLocation();
    const {accessToken} = useAccessToken()

    let background;
    switch (true) {
        case location.pathname === '/' && !!accessToken:
            background = 'linear-gradient(to bottom, rgba(14, 192, 76, 0.74), rgba(85, 30, 153, 0.60), rgba(140, 32, 223, 0))';
            break;
        case location.pathname.startsWith('/playlist/') && !!accessToken:
            background = 'linear-gradient(to bottom, darkred, darkred, #121212)';
            break;
        // Add more cases for other pages
        default:
            background = 'none';
    }

    return (
        <div {...rest}
             style={{
                 backgroundImage: background,
                 height: "500px",
                 width: "inherit",
                 position: "absolute"
             }}>
        </div>
    );
}

export default ColorHeader;
