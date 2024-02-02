
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


//sad:

/*
Mood	Intensity	Timbre	Pitch	Rhythm
Happy	Medium	Medium	Very High	Very High
Exuberant	High	Medium	High	High
Energetic	Very High	Medium	Medium	High
Frantic	High	Very High	Low	Very High
Anxious/Sad	Medium	Very Low	Very Low	Low
Depression	Low	Low	Low	Low
Calm	Very Low	Very Low	Medium	Very Low
Contentment	Low	Low	High	Low


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
