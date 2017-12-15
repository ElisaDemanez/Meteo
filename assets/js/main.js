
$(document).ready(function() {
   
    var ville= ('');
    $('.butt').click(function() {
      ville = ($('.search').val());


// IF YOU WANT TO INCR LOCALSTORAGE KEY
//  var key = localStorage.length;
// console.log(key);
// key++; // increment the localstoragekey.


// localStorage.clear()

var values= Object.values(localStorage); // all the names of the cities stored
var keys = Object.keys(localStorage);
console.log('values'+values);
if (keys.includes(ville) ) {
    console.log('yesitin');
    res = values.split(",")
    console.log('res:'+res)
}

//LOCALSTORAGE
var dataToStore = JSON.stringify(res); 
console.log(dataToStore) 
if (!values.includes(dataToStore)) localStorage.setItem(ville, dataToStore);

else {



//Meteo
 
$.ajax({
    url: 'http://api.openweathermap.org/data/2.5/forecast?q='+ville+'&APPID=bf854d63ecc39439b5f6b06ae991ce86',
    type: 'GET',
    dataType: 'json',
})
.done(function(res) {

// console.log(res);
// console.log(res.city);
// console.log(res.city.name);
// console.log(res.list[0].main);
$("#city").html('City: '+res.city.name);
$("#long").html('Latitude and long.: '+res.city.coord.lat+' '+res.city.coord.lon);
$("#temp").html('Temperature: '+((res.list[0].main.temp-273.15).toFixed())+ '°C, Min temp : '+((res.list[0].main.temp_min-273.15).toFixed())+ '°C, Max temp : '+((res.list[0].main.temp_max-273.15).toFixed())+'°C');
 $("#press").html('Pressure: '+res.list[0].main.pressure+' hPa');
 $("#humid").html('Humidity: '+res.list[0].main.humidity+' %');




})
.fail(function() {
    // console.log("error");
})
.always(function() { // S'execute dans tous les cas!
    // console.log("complete");
});
};

});// fin le la fonction onclick butt 

  

});
// bf854d63ecc39439b5f6b06ae991ce86

// api.openweathermap.org/data/2.5/weather?q=Cahors,fr 
