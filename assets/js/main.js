
$(document).ready(function() {
    
    var ville= ('');
    var res  ;
    
    $('.button').click(function() {
        ville = ($('.search').val());
        
        // localStorage.clear()
        
        //search if the city is in the localSto
        var keys = Object.keys(localStorage); 
        var values= Object.values(localStorage); 
        // console.log('values: '+values);

        // if city is in the log, it fetches it and doesn't do the ajax request
        if (keys.includes(ville) ) {
            console.log('yesitsin');
            
            var res = JSON.parse(localStorage.getItem(ville));
            console.log(res);console.log('ok');
            
            $("#city").html('City: '+res.city.name);
            $("#long").html('Latitude and long.: '+res.city.coord.lat+' '+res.city.coord.lon);
            $("#temp").html('Temperature: '+((res.list[0].main.temp-273.15).toFixed())+ '°C, Min temp : '+((res.list[0].main.temp_min-273.15).toFixed())+ '°C, Max temp : '+((res.list[0].main.temp_max-273.15).toFixed())+'°C');
            $("#press").html('Pressure: '+res.list[0].main.pressure+' hPa');
            $("#humid").html('Humidity: '+res.list[0].main.humidity+' %');
            
        }
        
        else {
            
            //Meteo
            
            $.ajax({
                url: 'http://api.openweathermap.org/data/2.5/forecast?q='+ville+'&APPID=bf854d63ecc39439b5f6b06ae991ce86',
                type: 'GET',
                dataType: 'json',
            })
            .done(function(res) {
                console.log('.ajax runs');
                // console.log(res);
                // console.log(res.city);
                // console.log(res.city.name);
                // console.log(res.list[0].main);
                $("#city").html('City: '+res.city.name);
                $("#long").html('Latitude and long.: '+res.city.coord.lat+' '+res.city.coord.lon);
                $("#temp").html('Temperature: '+((res.list[0].main.temp-273.15).toFixed())+ '°C, Min temp : '+((res.list[0].main.temp_min-273.15).toFixed())+ '°C, Max temp : '+((res.list[0].main.temp_max-273.15).toFixed())+'°C');
                $("#press").html('Pressure: '+res.list[0].main.pressure+' hPa');
                $("#humid").html('Humidity: '+res.list[0].main.humidity+' %');
                
                
                
                //LOCALSTORAGE
                //stringify the infos of the city and localS them
                var dataToStore = JSON.stringify(res); 
                console.log('datatostore'+dataToStore) 
                if (!values.includes(dataToStore)) localStorage.setItem(ville, dataToStore);


                
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
// IF YOU WANT TO INCR LOCALSTORAGE KEY
//  var key = localStorage.length;
// console.log(key);
// key++; // increment the localstoragekey.