import {Image} from "../types";

export interface Playlist {
    collaborative: boolean;
    description: string | null;
    external_urls: { spotify: string };
    followers: {
        href: string | null;
        total: number;
    };
    href: string;
    id: string;
    images: Image[];
    name: string;
    owner: {
        external_urls: {
            spotify: string;
        },
        followers: {
            href: string | null;
            total: number;
        }
        href: string;
        id: string;
        type: string;
        uri: string;
        display_name: string | null;
    }
    public: boolean;
    snapshot_id: string;
    primary_color: string;
    tracks: {
        href: string;
        limit: number;
        next: string | null;
        offset: number;
        previous: string | null;
        total: number;
        items: PlaylistTrack[]
    }
    type: string;
    uri: string;
}


interface PlaylistTrack {
    added_at: string //date-time
    added_by: {
        "external_urls": {
            "spotify": "string"
        },
        "followers": {
            "href": "string",
            "total": 0
        },
        "href": "string",
        "id": "string",
        "type": "user",
        "uri": "string"
    }
    isLocal: boolean
    track: Track | Episode

}

export interface Track {
    "album": {
        "album_type": string,
        "total_tracks": number,
        "available_markets": string[],
        "external_urls": {
            "spotify": string
        },
        "href": string,
        "id": string,
        "images": Image[],
        "name": string,
        "release_date": string,
        "release_date_precision": string,
        "restrictions": {
            "reason": string
        },
        "type": string,
        "uri": string,
        "artists": [
            {
                "external_urls": {
                    "spotify": string
                },
                "href": string,
                "id": string,
                "name": string,
                "type": string,
                "uri": string
            }
        ]
    },
    "artists": [
        {
            "external_urls": {
                "spotify": string
            },
            "followers": {
                "href": string,
                "total": number
            },
            "genres": string[],
            "href": string,
            "id": string,
            "images": Image[],
            "name": string,
            "popularity": number,
            "type": string,
            "uri": string
        }
    ],
    "available_markets": string[],
    "disc_number": number,
    "duration_ms": number,
    "explicit": boolean,
    "external_ids": {
        "isrc": string,
        "ean": string,
        "upc": string
    },
    "external_urls": {
        "spotify": string
    },
    "href": string,
    "id": string,
    "is_playable": false,
    "linked_from": {},
    "restrictions": {
        "reason": string
    },
    "name": string,
    "popularity": number,
    "preview_url": string,
    "track_number": number,
    "type": string,
    "uri": string,
    "is_local": boolean
}


interface Episode {

}
