import { db, collection, addDoc } from "./firebase.js";

let selectedLat = null;
let selectedLng = null;

const map = L.map('landlord-map').setView([-1.286389, 36.817223], 12);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

let marker = null;

map.on('click', function(e) {
  selectedLat = e.latlng.lat;
  selectedLng = e.latlng.lng;

  if (marker) {
    marker.setLatLng(e.latlng);
  } else {
    marker = L.marker(e.latlng).addTo(map);
  }
});

async function addHouse() {
  const title = document.getElementById('title').value;
  const price = document.getElementById('price').value;
  const contact = document.getElementById('contact').value;
  const image = document.getElementById('image').value;

  if (!title || !price || !contact || !image || !selectedLat) {
    alert("Fill all fields + select location");
    return;
  }

  await addDoc(collection(db, "houses"), {
    title,
    price,
    contact,
    image,
    lat: selectedLat,
    lng: selectedLng
  });

  alert("House uploaded!");
}

window.addHouse = addHouse;
