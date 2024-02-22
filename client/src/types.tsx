export interface UserProfile {
    country: string;
    display_name: string;
    email: string;
    explicit_content: {
        filter_enabled: boolean,
        filter_locked: boolean
    },
    external_urls: { spotify: string; };
    followers: { href: string; total: number; };
    href: string;
    id: string;
    images: Image[];
    product: string;
    type: string;
    uri: string;
}

interface Image {
    url: string;
    height: number;
    width: number;
}

export interface RecentlyPlayedTracks {
    href: string;
    limit: number;
    next: string;
    total: number;
    items: PlayHistoryObject[];
}

export interface PlayHistoryObject {
    track: {
        artist: Artist[];
        id: string; /*The Spotify ID for the track.*/
        name: string;
        popularity: number; /*popularity of a track based on number of plays and how recent the plays are, may lag by a few days*/
        uri: string; /*The Spotify URI for the track.*/
        href: string; /*A link to the Web API endpoint providing full details of the track.*/
    }
    played_at: string;
}

interface Artist {
    href: string;
    id: string;
    images: Image[]
    name: string;
    popularity: number /*derived from the popularity of all artist's tracks*/
    uri: string;
}

export {}
