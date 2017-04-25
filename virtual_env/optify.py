# obtains the emotions of a given image by making a request to the Microsoft API
import httplib, urllib, base64, json, requests

headers = {
    # Request headers. Replace the placeholder key below with your subscription key.
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': '1df236930c4f41d4a6ea8a5696d318a2 ',
}

params = urllib.urlencode({
})

#hap http://www.pngall.com/wp-content/uploads/2016/04/Happy-Person-Free-Download-PNG.png
#sad http://cliparts.co/cliparts/di9/rad/di9radxAT.jpg
#angry http://www.islamiclife.com/2014/12/11/4824.jpeg
#angry2 https://thumbs.dreamstime.com/z/angry-man-isolated-white-looking-meanly-33151363.jpg
#angry3 https://previews.123rf.com/images/doglikehorse/doglikehorse1107/doglikehorse110700013/9938977-Very-angry-man-gritting-his-teeth-and-pointing-at-the-camera-Stock-Photo.jpg

def getEmotionJson():
    conn = httplib.HTTPSConnection('westus.api.cognitive.microsoft.com')
    conn.request("POST", "/emotion/v1.0/recognize?%s" % params, "{ 'url': 'http://www.pngall.com/wp-content/uploads/2016/04/Happy-Person-Free-Download-PNG.png' }", headers)
    response = conn.getresponse()
    data = response.read().decode('utf-8')
    json_obj = json.loads(data)
    result = json_obj[0]
    result = result['scores']
    conn.close()
    print("PHOTO VALS")
    print(json.dumps(result))
    return json.dumps(result)
