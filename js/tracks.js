function getElement(obj, key, element, place){
  for(var key in obj){
    if(obj.hasOwnProperty(key)){
      var value = obj[key];
      console.log(value.name);

      var button = document.createElement(element);
      button.innerHTML = "<a href='https://open.spotify.com/track'" + value.url + "'>" + value.name + "";
      var placeEl = document.getElementById(place)
      placeEl.append(button);
    }
  }
}
