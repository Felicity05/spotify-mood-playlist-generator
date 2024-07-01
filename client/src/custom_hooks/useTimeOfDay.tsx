// hooks/useTimeOfDay.ts
import {useState, useEffect} from "react";

export const useTimeOfDay = () => {
    const [timeOfDay, setTimeOfDay] = useState<string>("");

    const getTimeOfDay = (): string => {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) {
            return 'Morning';
        } else if (hour >= 12 && hour < 18) {
            return 'Afternoon';
        } else if (hour >= 18 && hour < 22) {
            return 'Evening';
        } else {
            return 'Night';
        }
    };

    useEffect(() => {
        setTimeOfDay(getTimeOfDay());
    }, []);

    return timeOfDay;
};
