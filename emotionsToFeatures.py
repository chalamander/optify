# takes the emotions provided by the Microsoft Emotions API and turns them into a scale for Spotify
import json
from optify import getEmotionJson

# normalises values
def normaliseValue(value):
    if (value > 1.0):
        value = 1.0
    if (value < 0.0):
        value = 0.0
    return value

def getFeatureJson():
    json_string = json.loads(getEmotionJson())
    # defining emotion variables
    anger = json_string["anger"] #tempo(>120), energy(>0.8), mode(1)
    fear = json_string["fear"] #energy(<0.6)
    happiness = json_string["happiness"] #energy(0.6-0.8), dance(<0.7)
    sadness = json_string["sadness"] #energy(<0.6), mode(1), valence(<0.3)
    surprise = json_string["surprise"] #tempo(>120), dance(<0.7)
    # defining Spotify features
    dance = 0.5 + (anger - contempt + disgust - fear + happiness - sadness + surprise)
    dance = normaliseValue(dance)
    energy = 0.5 + (anger + contempt + disgust - fear + happiness - sadness + surprise)
    energy = normaliseValue(energy)
    mode = round((0.5 - anger + contempt - disgust - fear + happiness - sadness + surprise), 0)
    mode = normaliseValue(mode)
    valence = (0.5 - anger - contempt - disgust - fear + happiness - sadness)
    valence = normaliseValue(valence);
    tempo = 90 + ((anger - contempt + disgust - fear + happiness - sadness) * 100)
    # encoding results as JSON object
    json_return = json.dumps({'danceability': str(dance), 'energy': str(energy), 'mode': str(mode), 'valence': str(valence), 'tempo': str(tempo)})
    return json.dumps(json_return)
