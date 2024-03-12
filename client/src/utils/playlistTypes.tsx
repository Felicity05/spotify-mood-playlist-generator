import {Image} from "../types";

export interface Playlist {
    collaborative: boolean;
    description: string | null;
    external_urls: {spotify: string};
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

interface  Track {
    "album": {
    "album_type": string,
        "total_tracks": number,
        "available_markets": string[],
        "external_urls": {
            "spotify": "string"
        },
    "href": string,
    "id": string,
    "images": [
        {
            "url": "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
            "height": 300,
            "width": 300
        }
    ],
        "name": "string",
        "release_date": "1981-12",
        "release_date_precision": "year",
        "restrictions": {
        "reason": "market"
    },
    "type": "album",
        "uri": "spotify:album:2up3OPMp9Tb4dAKM2erWXQ",
        "artists": [
        {
            "external_urls": {
                "spotify": "string"
            },
            "href": "string",
            "id": "string",
            "name": "string",
            "type": "artist",
            "uri": "string"
        }
    ]
},
    "artists": [
    {
        "external_urls": {
            "spotify": "string"
        },
        "followers": {
            "href": "string",
            "total": 0
        },
        "genres": [
            "Prog rock",
            "Grunge"
        ],
        "href": "string",
        "id": "string",
        "images": [
            {
                "url": "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
                "height": 300,
                "width": 300
            }
        ],
        "name": "string",
        "popularity": 0,
        "type": "artist",
        "uri": "string"
    }
],
    "available_markets": [
    "string"
],
    "disc_number": 0,
    "duration_ms": 0,
    "explicit": false,
    "external_ids": {
    "isrc": "string",
        "ean": "string",
        "upc": "string"
},
    "external_urls": {
    "spotify": "string"
},
    "href": "string",
    "id": "string",
    "is_playable": false,
    "linked_from": {},
    "restrictions": {
    "reason": "string"
},
    "name": "string",
    "popularity": 0,
    "preview_url": "string",
    "track_number": 0,
    "type": "track",
    "uri": "string",
    "is_local": false
}


interface Episode {

}
