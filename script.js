document.addEventListener("DOMContentLoaded", () => {
    const userLocationMarker = document.getElementById("user-location");
    const mapContainer = document.getElementById("map-container");
  
    // Check if Geolocation API is supported
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          
          // Convert geolocation to map coordinates (customized for your map)
          const mapPosition = convertCoordinatesToMap(latitude, longitude);
          
          // Place the marker on the map
          userLocationMarker.style.left = `${mapPosition.x}%`;
          userLocationMarker.style.top = `${mapPosition.y}%`;
          userLocationMarker.style.display = "block";
        },
        error => {
          console.error("Error obtaining location", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  
    // Function to convert real-world coordinates to map coordinates
    function convertCoordinatesToMap(lat, lon) {
      // Sample conversion logic - adjust these based on your map's scale and campus boundary
      const mapLatitudeRange = { min: -38.0, max: -37.9 }; // Example coordinates
      const mapLongitudeRange = { min: 145.2, max: 145.3 };
  
      const xPercent = ((lon - mapLongitudeRange.min) / (mapLongitudeRange.max - mapLongitudeRange.min)) * 100;
      const yPercent = 100 - ((lat - mapLatitudeRange.min) / (mapLatitudeRange.max - mapLatitudeRange.min)) * 100;
  
      return { x: xPercent, y: yPercent };
    }
  });
  