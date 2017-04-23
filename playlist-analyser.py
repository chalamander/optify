from spotipy.oauth2 import SpotifyClientCredentials
import spotipy
import json
import pprint
import requests
from emotionsToFeatures import getFeatureJson

#Initialise Spotify object
client_credentials_manager = SpotifyClientCredentials()
sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

#spotify playlist URI to use
#uri = 'spotify:user:spotifycharts:playlist:37i9dQZEVXbJiZcmkrIHGU' #charts
#uri = 'spotify:user:flappster2:playlist:1pMn56LnnoiRXEi0ISTysa' #musica
uri = 'spotify:user:funnybunny000000:playlist:4EoPt05ztUjVaujcWbUL2Z' #sadness
#uri = 'spotify:user:spotify:playlist:65V6djkcVRyOStLd8nza8E' #happy
#uri = 'spotify:user:spotify:playlist:37i9dQZF1DX0BZrbvIqxCd' #punk

username = uri.split(':')[2]
playlist_id = uri.split(':')[4]

#get playlist contents using spotipy
results = sp.user_playlist(username, playlist_id)

avg_danceability = 0
avg_energy = 0
avg_mode = 0
avg_valence = 0
avg_tempo = 0
num_tracks = 0

#Get URI and key audio features of all tracks in playlist
for i, t in enumerate(results['tracks']['items']):
    trackfeatures = sp.audio_features([t['track']['uri']])
    avg_danceability += float(trackfeatures[0]['danceability'])
    avg_energy += float(trackfeatures[0]['energy'])
    avg_mode += float(trackfeatures[0]['mode'])
    avg_valence += float(trackfeatures[0]['valence'])
    avg_tempo += float(trackfeatures[0]['tempo'])
    num_tracks+=1


print("no. of songs", num_tracks)
print("avg danceability: " , avg_danceability / num_tracks)
print("avg energy: " , avg_energy / num_tracks)
print("avg mode: " , avg_mode / num_tracks)
print("avg valence: " , avg_valence / num_tracks)
print("avg tempo: " , avg_tempo / num_tracks)
