function showLocationOnMap() {
  var location = document.getElementById('locationInput').value;

  // Create a map centered on the retrieved location
  var map = L.map('map').setView([0, 0], 12);

  // Add the Tile Layer for the map (you can choose from different tile providers)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data © OpenStreetMap contributors',
    maxZoom: 18,
  }).addTo(map);

  // Geocode the entered location to get its latitude and longitude
  fetch('https://nominatim.openstreetmap.org/search?format=json&q=' + location)
    .then(response => response.json())
    .then(data => {
      if (data && data.length > 0) {
        var latitude = parseFloat(data[0].lat);
        var longitude = parseFloat(data[0].lon);

        // Set the map view to the retrieved location
        map.setView([latitude, longitude], 12);

        // Add a marker at the retrieved location
        L.marker([latitude, longitude]).addTo(map)
          .bindPopup(location)
          .openPopup();

        // Define custom icons with labels for north, south, east, and west markers
        var northIcon = L.divIcon({
          className: 'marker-label',
          html: 'N'
        });

        var southIcon = L.divIcon({
          className: 'marker-label',
          html: 'S'
        });

        var eastIcon = L.divIcon({
          className: 'marker-label',
          html: 'E'
        });

        var westIcon = L.divIcon({
          className: 'marker-label',
          html: 'W'
        });

        // Add markers for north, south, east, and west with custom icons and labels
        L.marker([latitude + 0.1, longitude], { icon: northIcon }).addTo(map)
          .bindPopup('North')
          .openPopup();

        L.marker([latitude - 0.1, longitude], { icon: southIcon }).addTo(map)
          .bindPopup('South')
          .openPopup();

        L.marker([latitude, longitude + 0.1], { icon: eastIcon }).addTo(map)
          .bindPopup('East')
          .openPopup();

        L.marker([latitude, longitude - 0.1], { icon: westIcon }).addTo(map)
          .bindPopup('West')
          .openPopup();
      } else {
        alert('Location not found.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred while geocoding the location.');
    });
}
