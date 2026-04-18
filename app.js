import { db, collection, getDocs } from "./firebase.js";

let map = L.map('map').setView([-1.286389, 36.817223], 12);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

async function loadHouses() {
  const querySnapshot = await getDocs(collection(db, "houses"));
  const container = document.getElementById("houses");

  container.innerHTML = "";

  querySnapshot.forEach((doc) => {
    const h = doc.data();

    container.innerHTML += `
      <div class="house-card" onclick='openHouse(${JSON.stringify(h)})'>
        <img src="${h.image}">
        <div class="house-info">
          <h2>${h.title}</h2>
          <p>💰 ${h.price}</p>
          <p>📞 ${h.contact}</p>
        </div>
      </div>
    `;

    L.marker([h.lat, h.lng])
      .addTo(map)
      .bindPopup(`<b>${h.title}</b><br>${h.price}`);
  });
}

window.openHouse = function(house) {
  localStorage.setItem("house", JSON.stringify(house));
  window.location.href = "house.html";
};

loadHouses();
