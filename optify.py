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

#hap http://www.pngall.com/wp-content/uploads/2016/04/Happy-Person-Free-Download-PNG.png
#sad http://cliparts.co/cliparts/di9/rad/di9radxAT.jpg
#angry http://www.islamiclife.com/2014/12/11/4824.jpeg

def getEmotionJson():
    conn = httplib.HTTPSConnection('westus.api.cognitive.microsoft.com')
    conn.request("POST", "/emotion/v1.0/recognize?%s" % params, "{ 'url': 'http://www.pngall.com/wp-content/uploads/2016/04/Happy-Person-Free-Download-PNG.png' }", headers)
    response = conn.getresponse()
    data = response.read().decode('utf-8')
    json_obj = json.loads(data)
    #print(json_obj)
    result = json_obj[0]
    result = result['scores']
    #print(result)
    conn.close()
    #print("PHOTO VALS")
    #print(json.dumps(result))
    return json.dumps(result)

getEmotionJson('https://i.imgur.com/f2otPhq.jpg')
