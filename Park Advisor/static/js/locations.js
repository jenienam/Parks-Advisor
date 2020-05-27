
// Animation for header text
let textWrapperHeader = document.querySelector(".location-header");
textWrapperHeader.innerHTML = textWrapperHeader.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: true})
  .add({
    targets: '.location-header .letter',
    opacity: [0,1],
    easing: "easeInOutQuad",
    duration: 2250,
    delay: (el, i) => 150 * (i+1)
  }).add({
    targets: '.location-header',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });

// Animation for header tagline
let textWrapperTagline = document.querySelector(".location-tagline");
textWrapperTagline.innerHTML = textWrapperTagline.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: true})
  .add({
    targets: '.location-tagline .letter',
    opacity: [0,1],
    easing: "easeInOutQuad",
    duration: 2250,
    delay: (el, i) => 150 * (i+1)
  }).add({
    targets: '.location-tagline',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });

// Create a map object
const myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 5
});
// Attribution below.
// <div>Icons made by <a href="https://www.flaticon.com/authors/vectors-market" title="Vectors Market">Vectors Market</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
let smallIcon = new L.Icon({
  iconSize: [30, 30],
  iconAnchor: [13, 27],
  popupAnchor:  [1, -24],
  iconUrl: 'images/tree1.png'
});

// Add a tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

// loading geoJSON
$.getJSON('data/parks.geojson',function(data){
  let datalayer = L.geoJSON(data, {
    onEachFeature: function (f, l) {
      l.bindPopup('<pre>'+JSON.stringify(f.properties,null,' ').replace(/[\{\}"]/g,'')+'</pre>');
    },
    pointToLayer: function (feature,latlng){
      return L.marker(latlng, {icon: smallIcon});
    }    
   }).addTo(myMap);
   myMap.fitBounds(datalayer.getBounds());
  });


