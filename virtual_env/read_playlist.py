def do_playlist(uri, sp):
    from spotipy.oauth2 import SpotifyClientCredentials
    import spotipy
    import json
    import pprint
    import requests
    from optify import getEmotionJson

    #Initialise Spotify object
    client_credentials_manager = SpotifyClientCredentials()
    sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

    #username = uri.split(':')[2]
    #playlist_id = uri.split(':')[4]
    username = 'flappster2'
    playlist_id = uri

    #get playlist contents using spotipy
    results = sp.user_playlist(username, playlist_id)

    print 'Calculating....'

    #Get URI and key audio features of all tracks in playlist
    tracks = []
    for i, t in enumerate(results['tracks']['items']):
        try:
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
            print json.dumps(tracks[i], indent=4)
        except:
            pass

    #get image emotion values
    img_values = json.loads(getEmotionJson())

    #happy json
    img_sadness = float(img_values["sadness"])
    img_happiness = float(img_values['happiness'])
    img_anger = float(img_values['anger'])
    img_surprise = float(img_values['surprise'])
    img_fear = float(img_values['fear'])

    filtered_tracks = []

    for x in range(0, len(tracks)):
        appropriate = 0
        dance = tracks[x]['features']['dance']
        energy = tracks[x]['features']['energy']
        valence = tracks[x]['features']['valence']
        tempo = tracks[x]['features']['tempo']
        mode = tracks[x]['features']['mode']

        appropriate_criteria = ""

        #if happy and high energy
        if (img_happiness > 0.5 or img_anger > 0.6) and (energy > 0.7):
            appropriate += 1
            appropriate_criteria += " high energy(" + str(energy) + ")"
        #if not happy or sad or high fear, and energy is low
        if ((img_happiness < 0.5 or img_sadness > 0.5 or img_fear > 0.5) and (img_anger < 0.4)) and (energy  < 0.5):
            appropriate += 1
            appropriate_criteria += " low energy(" + str(energy) + ")"
        #if high happiness or high anger, and mode = 1
        if (img_happiness > 0.6 or img_anger > 0.6) and (mode > 0.5):
            appropriate += 1
            appropriate_criteria += " major key(" + str(mode) + ")"
        #if low happiness or high sadness or low anger, and mode = 0
        if ((img_happiness < 0.4 or img_sadness > 0.6)) and (mode < 0.5):
            appropriate += 1
            appropriate_criteria += " minor key(" + str(mode) + ")"
        #if low happiness or high sadness and low valence
        if ((img_happiness < 0.5 or img_sadness > 0.5) and img_anger < 0.5 and valence < 0.35):
            appropriate += 1
            appropriate_criteria += " low valence(" + str(valence) + ")"
        #if high happiness and high surprise, and danceability > 0.7
        if (img_happiness > 0.6 or img_surprise > 0.6) and dance > 0.7:
            appropriate += 1
            appropriate_criteria += " high danceability(" + str(dance) + ")"
        #if high anger or high surprise and tempo > 120
        if (img_anger > 0.6 or img_surprise > 0.6) and tempo > 120:
            appropriate +=1
            appropriate_criteria += " high tempo(" + str(tempo) + ")"

        if appropriate >= 2:
            filtered_tracks.append(tracks[x]['uri'])
            print (sp.track(tracks[x]['uri'])['name'], ": ", appropriate_criteria)


    print "Filtered tracks: ", filtered_tracks

    final_tracks = []

    for x in range(0, len(filtered_tracks)):
        print(sp.track(filtered_tracks[x])['name'])

    print("no. of tracks in playlist: " , len(tracks))
    print("no. of tracks in filtered playlist: ", len(filtered_tracks))

    return filtered_tracks
