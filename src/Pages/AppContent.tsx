import {DisplayUserProfile} from "../Components/DisplayUserProfile";
import {MoodDropDown} from "../Components/MoodDropDown";
import {useAccessToken} from "../Context/AccessTokenContext";
import {Button} from "../Components/Button";
import {setAccessToken, TOKEN_STORAGE_KEY} from "../utils/auth";

export const AppContent = () => {
    const {setAccessToken} = useAccessToken();

    const handleLogOut = () => {
        setAccessToken(null);
        localStorage.removeItem(TOKEN_STORAGE_KEY);
    }

    return(
        <div>
            <h1>All the content and components of the app go here</h1>
            <Button onClick={handleLogOut}>Log Out</Button>
            <DisplayUserProfile />
            <MoodDropDown />
        </div>
    )
}
