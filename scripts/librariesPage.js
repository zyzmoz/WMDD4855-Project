

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lng = position.coords.longitude;
      Map.getMapInstance().panTo(new L.LatLng(lat, lng));
      getNearByLibraries(lat, lng).then((libraries) => {
        libraries.map((library) => {
          let marker = L.marker([
            library.geocodes.main.latitude,
            library.geocodes.main.longitude,
          ]).addTo(map);
          marker.bindPopup(
            `<b>${library.name}</b><br>${library.location.formatted_address}`
          );
          return marker;
        });
      });
    });
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

getLocation();
