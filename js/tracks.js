function getElement(obj, key){
  for(var key in obj){
    if(obj.hasOwnProperty(key)){
      var value = obj[key];
      console.log(value.name);
    }
  }
}
