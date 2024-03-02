
export interface TrackAudioFeatures {
   id: string; //the spotify id for the track
   danceability: number;
   energy: number; //refers to the intensity
   key: number; // refers to the pitch the song is in
   loudness: number;
   mode: number;
   speechiness: number;
   acousticness: number;
   instrumentalness: number
   liveness: number;
   valence: number;
   tempo: number;
   time_signature: number;
   duration_ms: number;
   track_href: string //A link to the Web API endpoint providing full details of the track. An access token is required to access this data.
   type: string;
   uri: string; // uri of the track
   analysis_url: string; //A URL to access the full audio analysis of this track. An access token is required to access this data.
}

interface RecentlyPlayedTracksResponse {
   href: string
   limit: number;
   next: string;
   cursors: {
      after: string,
      before: string
   },
   total: number,
   items: PlayHistory []
   // Add other properties as needed
}

export interface PlayHistory {
   track: {
      name: string;
      href: string;
      id: string;
      popularity: number; //global song popularity
      preview_url: string;
      uri: string;
      artists: [{
         id: string;
         name: string;
      }]
   };
   played_at: string;
   context: { //the context(device) from where the track was played from
      type: string,
      href: string,
      external_urls: {
         spotify: string
      },
      uri: string
   }
}


/*
Mood of Western songs	Mean Intensity	Mean Timbre	Mean Pitch	Mean Rhythm
Happy	    0.2055	0.4418	967.47	209.01
Exuberant	0.317	0.4265	611.94	177.7
Energetic	0.4564	0.319	381.65	163.14
Frantic	    0.2827	0.6376	239.78	189.03
Sad	        0.2245	0.1572	95.654	137.23
Depression	0.1177	0.228	212.65	122.65
Calm	    0.0658	0.1049	383.49	72.23
Contentment	0.1482	0.2114	756.65	101.73
* */
