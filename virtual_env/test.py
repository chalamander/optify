from flask import Flask
from flask import request, redirect
import pprint
import sys
import os
import subprocess
import json
from read_playlist import do_playlist
import spotipy
import spotipy.util as util
from spotipy.oauth2 import SpotifyOAuth

app = Flask(__name__)
app.config['DEBUG'] = True

spotifyoauth = SpotifyOAuth(os.environ['SPOTIPY_CLIENT_ID'],
    os.environ['SPOTIPY_CLIENT_SECRET'],
    os.environ['SPOTIPY_REDIRECT_URI'],
    scope="playlist-read-private")

sp = None

@app.route("/")
def hello():
    print "test"
    if not request.args.get('q') == None:
        print("OPENING PLAYLIST: " + request.args.get('q'))
        sp.user_playlist_create('flappster2','new_playlist',True)
        uri_list = do_playlist(request.args.get('q'),sp)
        if uri_list:
            sp.user_playlist_add_tracks('flappster2',sp.user_playlists('flappster2')['items'][0]['id'],uri_list)
            return "Created your new playlist"
        else:
            return "Sorry! An emotion playlist could not be generated from this playlist. Please select another."


    # shows a user's playlists (need to be authenticated via oauth)
    if len(sys.argv) > 1:
        username = sys.argv[1]
    else:
        print("Whoops, need your username!")
        print("usage: python user_playlists.py [username]")
        sys.exit()

    scope='playlist-read-private'

    playlists = sp.user_playlists(username)
    list = []
    for playlist in playlists['items']:
        list.append("<a href='?q=" + playlist['id'] + "'>\n" + playlist['name'] + "</a>")

    playlists = sp.user_playlists(username,offset="50")
    for playlist in playlists['items']:
        list.append("<a href='?q=" + playlist['id'] + "'>\n" + playlist['name'] + "</a>")

    return '\n'.join(list)

@app.route("/spotifyLogin")
def spotifyLogin():
    print "testing"
    return redirect(spotifyoauth.get_authorize_url())

@app.route('/spotifyRedirect')
def spotifyRedirect():
    print ("TESTEST")
    global sp
    code = request.args.get('code')
    response = spotifyoauth.get_access_token(code)
    sp = spotipy.Spotify(auth=response['access_token'])
    if sp == None:
        print "Error: authorisation failed"
    return redirect("/")

if __name__ == "__main__":
    app.run()
