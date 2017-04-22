# obtains the emotions of a given image by making a request to the Microsoft API
import httplib, urllib, base64, json, requests

headers = {
    # Request headers. Replace the placeholder key below with your subscription key.
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': '1df236930c4f41d4a6ea8a5696d318a2 ',
}

params = urllib.urlencode({
})

def getEmotionJson():
    conn = httplib.HTTPSConnection('westus.api.cognitive.microsoft.com')
    conn.request("POST", "/emotion/v1.0/recognize?%s" % params, "{ 'url': 'http://img.timeinc.net/time/daily/2010/1011/poy_nomination_agassi.jpg' }", headers)
    response = conn.getresponse()
    data = response.read().decode('utf-8')
    json_obj = json.loads(data)
    result = json_obj[0]
    result = result['scores']
    conn.close()
    return json.dumps(result)
