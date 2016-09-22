/*global $*/
/*global L*/
var map

$(document).ready(function() {
    map = L.map('map').setView([34.043265, -118.246369], 13);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    getRouteA();
    getRouteAFood();
});

function getRouteA() {
    $.getJSON( "https://data.lacity.org/resource/5icv-hrai.json?routename=Route%20A", 
        function( data ) {
            console.log("Route A data - success");
            var coordinateArray = data[0].the_geom.coordinates[0];
            for (var i=0; i < coordinateArray.length; i++) {
                coordinateArray[i] = coordinateArray[i].reverse();
            }
            
            var polylineRouteA = L.polyline(coordinateArray, {color: 'red'}).addTo(map);
            map.fitBounds(polylineRouteA.getBounds());
        });
}

function getRouteAFood() {
    $.getJSON( "data/route-a-food.json", 
        function( data ) {
            console.log("Route A food data - success");
            for (var i=0; i < data.length; i++) {
                var coordinates = data[i].coordinates;
                var marker = L.marker(coordinates).addTo(map);
                marker.bindPopup("<strong>" + data[i].name + "</strong><br><em>" + data[i].food + "</em><br><br>" + data[i].notes);
            }
            
        });
}