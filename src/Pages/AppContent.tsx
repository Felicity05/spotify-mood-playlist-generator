import {DisplayUserProfile} from "../Components/DisplayUserProfile";
import {MoodDropDown} from "../Components/MoodDropDown";

export const AppContent = () => {
    return(
        <div>
            <h1>All the content and components of the app go here</h1>
            <DisplayUserProfile />
            <MoodDropDown />
        </div>
    )
}
