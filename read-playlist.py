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
uri = 'spotify:user:flappster2:playlist:1pMn56LnnoiRXEi0ISTysa' #musica
#uri = 'spotify:user:funnybunny000000:playlist:4EoPt05ztUjVaujcWbUL2Z' #sadness
#uri = 'spotify:user:spotify:playlist:65V6djkcVRyOStLd8nza8E' #happy

username = uri.split(':')[2]
playlist_id = uri.split(':')[4]

#get playlist contents using spotipy
results = sp.user_playlist(username, playlist_id)
#r = requests.get('https://api.spotify.com/v1/users/{user_id}/playlists/' + playlist_id)
#print r.text

#Get URI and key audio features of all tracks in playlist
tracks = []
for i, t in enumerate(results['tracks']['items']):
    trackfeatures = sp.audio_features([t['track']['uri']])
    tracks.append({
    "uri":trackfeatures[0]['uri'],
    "features":
    {"dance":trackfeatures[0]['danceability'],
    "energy":trackfeatures[0]['energy'],
    "mode":trackfeatures[0]['mode'],
    "valence":trackfeatures[0]['valence'],
    "tempo":trackfeatures[0]['tempo']}
    })
    #print json.dumps(tracks[i], indent=4)

#Get JSON object with image attribute values
img_values = json.loads(getFeatureJson())

#happy json
img_dance = float(img_values["danceability"])
img_energy = float(img_values['energy'])
img_valence = float(img_values['valence'])
img_tempo = float(img_values['tempo'])
img_mode = float(img_values['mode'])

filtered_tracks = []

for x in range(0, len(tracks)):
    valid = True
    dance = tracks[x]['features']['dance']
    energy = tracks[x]['features']['energy']
    valence = tracks[x]['features']['mode']
    tempo = tracks[x]['features']['valence']
    mode = tracks[x]['features']['tempo']
    #if danceability in 25% range
    #if not (dance-0.5 <= img_dance <= dance+0.5):
    #    valid = False
    if not (img_energy-0.2 <= energy <= img_energy+0.2):
        valid = False
    #if not (img_valence-0.2 <= valence <= img_valence+0.2):
    #    valid = False
    if not (tempo-50 <= img_tempo <= tempo+50):
        valid = False
    #if not (mode == img_mode):
    #    valid = False

    print "energy min: ", (energy - 0.2), " energy max: " , (energy + 0.27)
    #print "valence min: ", (valence - 0.2), " valence max: ", (valence + 0.27)

    if valid:
        filtered_tracks.append(tracks[x]['uri'])

print filtered_tracks

for x in range(0, len(filtered_tracks)):
    print(sp.track(filtered_tracks[x])['name'])

print("no. of tracks in playlist: " , len(tracks))
print("no. of tracks in filtered playlist: ", len(filtered_tracks))
