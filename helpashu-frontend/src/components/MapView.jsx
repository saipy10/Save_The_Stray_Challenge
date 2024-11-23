import { useState, useEffect } from "react";
import Map, { Marker } from "react-map-gl";
import maplibregl from "maplibre-gl";
import "@maptiler/sdk/dist/maptiler-sdk.css";

const MapView = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [error, setError] = useState(null);
  const [locations, setLocations] = useState([]); // State for locations from backend

  // console.log(import.meta.env.VITE_MAPTILER_API_KEY)
  const map_api_key = import.meta.env.VITE_MAPTILER_API_KEY
  // Fetch user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log(latitude, longitude);
          setUserLocation({ latitude, longitude });
        },
        (err) => {
          console.error("Error fetching location:", err);
          setError(
            "Unable to fetch your location. Please enable location services."
          );
        },
        { enableHighAccuracy: true }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  // Fetch locations from backend
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch("http://localhost:5000/locations"); // Use localhost
        if (response.ok) {
          const data = await response.json();
          setLocations(data); // Set the fetched locations
        } else {
          console.error("Failed to fetch locations:", response.statusText);
          setError("Error fetching locations from server.");
        }
      } catch (err) {
        console.error("Error:", err);
        setError("Unable to fetch locations. Please try again later.");
      }
    };

    fetchLocations();
  }, []);

  if (error) {
    return <div style={styles.error}>{error}</div>;
  }

  if (!userLocation) {
    return <div style={styles.loading}>Fetching your location...</div>;
  }

  return (
    <>
      <div style={styles.page}>
        {/* Title Bar */}
        <header style={styles.titleBar}>
          <h1 style={styles.title}>Drive Safely - Animals Nearby</h1>
        </header>
      </div>
      <Map
        mapLib={maplibregl}
        initialViewState={{
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          zoom: 20,
        }}
        style={{ width: "100%", height: "calc(100vh - 77px)" }}
        mapStyle={`https://api.maptiler.com/maps/streets/style.json?key=${map_api_key}`}
      >
        {/* User's Current Location Marker */}
        <Marker
          latitude={userLocation.latitude}
          longitude={userLocation.longitude}
          color="blue"
        />

        {/* Dynamic Locations Markers */}
        {locations.map((location, index) => (
          <Marker
            key={index}
            latitude={location.latitude}
            longitude={location.longitude}
            color={location.color || "red"} // Default color if not provided
          />
        ))}
      </Map>
    </>
  );
};

const styles = {
  titleBar: {
    backgroundColor: "green",
    color: "white",
    textAlign: "center",
    padding: "10px 0",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  },
  title: {
    margin: 0,
    fontSize: "24px",
    fontWeight: "bold",
  },
  loading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    fontSize: "18px",
    color: "#333",
  },
  error: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    fontSize: "18px",
    color: "red",
  },
};

export default MapView;
