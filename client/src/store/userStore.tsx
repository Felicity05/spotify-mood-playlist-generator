import {create} from 'zustand';
import {devtools, persist} from 'zustand/middleware';
import {FollowedArtists, UserProfile} from "../types";
import {getFollowedArtistsForUser, getPlaylistsForCurrentUser, getUserProfileData} from "../api/api";
import {Playlist} from "../utils/playlistTypes";

interface UserStore {
    user: UserProfile | null;
    followedArtists: FollowedArtists | null;
    playlists: Playlist[];
    filteredPlaylists: Playlist[];
    fetchUserData: () => void;
    fetchFollowingData: () => void;
    fetchPlaylistsData: () => void;
    setFilteredPlaylists: (filteredPlaylists: Playlist[]) => void;
    resetFilteredPlaylists: () => void;

}

export const useUserStore = create<UserStore>()(
    devtools(
        persist(
            (set, get) => ({
                user: null,
                followedArtists: null,
                playlists: [],
                filteredPlaylists: [],
                fetchUserData: async () => {
                    try {
                        const userProfileResponse = await getUserProfileData();
                        set({user: userProfileResponse.data});
                    } catch (error) {
                        console.error('Error fetching user profile data: ', error);
                    }
                },
                fetchFollowingData: async () => {
                    try {
                        const response = await getFollowedArtistsForUser();
                        set({followedArtists: response});
                    } catch (error) {
                        console.error('Failed to fetch followed artist for user', error);
                    }
                },
                fetchPlaylistsData: async () => {
                    try {
                        const response = await getPlaylistsForCurrentUser();
                        set({playlists: response});
                    } catch (error) {
                        console.error('Failed to fetch playlists', error);
                    }
                },
                setFilteredPlaylists: (filteredPlaylists: Playlist[]) => set({filteredPlaylists}),
                resetFilteredPlaylists: () => set({filteredPlaylists: get().playlists}),
            }),
            {name: 'user-storage'}
        )
    )
);
