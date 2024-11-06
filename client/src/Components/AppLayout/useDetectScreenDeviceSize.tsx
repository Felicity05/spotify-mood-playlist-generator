import {useState, useEffect} from 'react';

//i can extend this to include a breakpoint for tablet and desktop
export const COMMON_BREAK_POINTS = {
    small: 700, // < 500px A 4-column grid is commonly used at this breakpoint size.
    medium: 1200, // between 500px & 1200px A 8-column grid or 12-column grid is commonly used at this breakpoint size.
    large: 1440, // > 1400 A 16-column grid is commonly used at this breakpoint size.
    xlarge: 2560, // > 1920 A 24-column grid is commonly used at this breakpoint size.
}

const useDetectScreenDeviceSize = (breakpoint: number) => {
    const [screenSize, setScreenSize] = useState<boolean>(window.innerWidth <= breakpoint);

    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth <= breakpoint);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [breakpoint]);

    return screenSize;
};

export default useDetectScreenDeviceSize;
