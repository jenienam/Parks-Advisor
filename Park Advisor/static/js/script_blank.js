// Animation for header text
let textWrapperHeader = document.querySelector(".trails-header");
textWrapperHeader.innerHTML = textWrapperHeader.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: true})
  .add({
    targets: '.trails-header .letter',
    opacity: [0,1],
    easing: "easeInOutQuad",
    duration: 2250,
    delay: (el, i) => 150 * (i+1)
  }).add({
    targets: '.trails-header',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });

// Animation for header tagline
let textWrapperTagline = document.querySelector(".trails-tagline");
textWrapperTagline.innerHTML = textWrapperTagline.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: true})
  .add({
    targets: '.trails-tagline .letter',
    opacity: [0,1],
    easing: "easeInOutQuad",
    duration: 2250,
    delay: (el, i) => 150 * (i+1)
  }).add({
    targets: '.trails-tagline',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });


//Setting up map
var myMap = L.map('map', {
    center: [40.7749, -100.4194],
    zoom: 5,
    minZoom: 3,
    maxZoom: 18,
});
//get random latlng
function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    // .toFixed() returns string, so ' * 1' is a trick to convert to number
}
function getLatLng() {
    return [getRandomInRange(-180, 180, 4), getRandomInRange(-180, 180, 4)];
}



//add interactivemap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(myMap);

// //add clusters
// var markers = new L.markerClusterGroup();
// var points_rand = L.geoJson(trailfeatures, {
//     onEachFeature: function (feature, layer) //functionality on click on feature
//         {
//         layer.bindPopup("hi! I am one of thousands"); //just to show something in the popup. could be part of the geojson as well!
//         }   
// });
// markers.addTo(myMap);

// let url = trailfeatures;


//add icon
var hiking = new
L.Icon({iconUrl:"images/hiking.png"});




//add pop up
function locationPins (feature,
layer) { 
    layer.bindPopup("<h3 class='infoHeader'>TRAIL NAME : " + feature.properties.trail_name + "</h3><h5 class='infoHeader'>  DIFFICULTY RATING : " + feature.properties.difficulty_rating + 
   " / 7 </h5>" + "<h5 class='infoHeader'> OVERALL RATING  : " + feature.properties.avg_rating + " / 5 </h5>" + "<p class='infoHeader'> FEATURES : " + feature.properties.features + "</p>" );
    layer.setIcon(hiking);
  
 };


//add geoJson
L.geoJson(trailfeatures,{
    onEachFeature: locationPins
}).addTo(myMap);


//add button
var button = document.getElementById('button')
var button = L.popup();
function OnMapClick(e) {
    popup
}


//addingpopuptobutton
