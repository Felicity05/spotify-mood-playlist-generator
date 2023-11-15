export {}
// needed for authentication
const CLIENT_ID = 'd5398f16c9b246898c33eda2ca52a59f'
const REDIRECT_URI = 'http://localhost:3000'
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize'
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const RESPONSE_TYPE = 'code'
const SCOPES = "user-read-private user-read-email user-read-recently-played playlist-modify-public playlist-modify-private"
