# obtains the emotions of a given image by making a request to the Microsoft API
import httplib, urllib, base64, json, requests

headers = {
    # Request headers. Replace the placeholder key below with your subscription key.
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': '1df236930c4f41d4a6ea8a5696d318a2 ',
}

params = urllib.urlencode({
})

#def getEmotionJson(body):
def getEmotionJson(body):
    conn = httplib.HTTPSConnection('westus.api.cognitive.microsoft.com')
    #print (body)
    conn.request("POST", "/emotion/v1.0/recognize?%s" % params, "{ 'url': '" + body + "'}" , headers)
    response = conn.getresponse()
    data = response.read().decode('utf-8')
    json_obj = json.loads(data)
    #print(json_obj)
    result = json_obj[0]
    result = result['scores']
    #print(result)
    conn.close()
    return json.dumps(result)

getEmotionJson('https://i.imgur.com/f2otPhq.jpg')
