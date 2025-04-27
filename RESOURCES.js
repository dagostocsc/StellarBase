// Initialize map
const map = L.map('map').setView([0, 0], 2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Custom ISS icon
const issIcon = L.icon({
  iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/International_Space_Station.svg',
  iconSize: [50, 32]
});

// Create marker
const marker = L.marker([0, 0], { icon: issIcon }).addTo(map);

// Update ISS location
async function updateISS() {
  try {
    const res = await fetch('http://api.open-notify.org/iss-now.json');
    const data = await res.json();

    const lat = parseFloat(data.iss_position.latitude);
    const lon = parseFloat(data.iss_position.longitude);

    marker.setLatLng([lat, lon]);
    map.setView([lat, lon], 3);

    document.getElementById("iss-location").innerHTML =
      `🌍 Latitude: ${lat.toFixed(4)}<br>🌐 Longitude: ${lon.toFixed(4)}`;
  } catch (error) {
    document.getElementById("iss-location").textContent = "Failed to fetch ISS location.";
  }
}

// Initial call + interval
updateISS();
setInterval(updateISS, 5000);
