function getElement(obj, key, place){
  for(var key in obj){
    if(obj.hasOwnProperty(key)){
      var value = obj[key];
      console.log(value.name);
      var urlString = value.URI;

      var button = document.createElement('button');
      button.setAttribute("type", "submit");
      button.setAttribute("value", urlString);
      button.innerHTML = value.name;
      var placeEl = document.getElementById(place)
      placeEl.append(button);
    }
  }
}
