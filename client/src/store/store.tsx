import {create} from 'zustand';

interface SelectorState {
    selectedMood: string,
    setSelectedMood: (selectedMood: string) => void ,
    selectedTrackSource: string,
    setSelectedTrackSource: (selectedTracksSource: string) => void
}

export const useMoodSourceStore = create<SelectorState>((set) => ({
    selectedMood: '',
    selectedTrackSource: '',
    setSelectedMood: (selectedMood) => set((state) => ({...state, selectedMood })),
    setSelectedTrackSource: (selectedTrackSource) => set((state) => ({...state, selectedTrackSource })),
}));
