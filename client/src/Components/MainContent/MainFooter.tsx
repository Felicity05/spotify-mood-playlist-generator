import React from 'react';
import {Text} from "../UI Components/Text";

const MainFooter = () => {
    return (
        <div style={{margin: "1rem 0", color: "hsla(0,0%,100%,.6)"}}>
            <Text variant={"sm"}>* Spotify's popularity of artist
                calculated from the popularity of all the artist's tracks. </Text>
            <Text>This App does not collect any personal data, it uses Spotify's data.
                Please refer to Spotify for more information about their data collection and data privacy policy.</Text>
            <Text>This App is not intended to be a clone of Spotify but an extension of it. --- Copyright © 2024 -
                Built by Arelys Alvarez v1.0 </Text>
        </div>
    );
}

export default MainFooter;
