const socket = io();
if(navigator.geolocation) {  // Change from 'getlocation' to 'geolocation'
    navigator.geolocation.watchPosition((position) => {
        const {latitude, longitude} = position.coords;
        socket.emit("send-location", {latitude, longitude});
    }, (error) => {
        console.error(error);
    }, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
    });
} else {
    console.log("Geolocation is not supported by this browser.");
}
const map = L.map("map").setView([0,0],16);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "Suvam Neog"
}).addTo(map);
 const markers ={};
 socket.on("received-location",(data) => {
    const {id, latitude, longitude} = data;
    map.setView([latitude,longitude]);
    if(markers[id]){
        markers[id].setLatLng([latitude, longitude]);
    } else {
        markers[id] = L.marker([latitude, longitude]).addTo(map);
    }

 });
 socket.on("Disconnected",(id) => {
    if(markers[id]) {
    map.removeLayer(markers[id]);
    delete markers[id];
 }});
