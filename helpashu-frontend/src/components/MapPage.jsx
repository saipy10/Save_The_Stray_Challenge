// import React from "react";
import MapView from "./MapView"; // Import the reusable MapView component

const MapPage = () => {
  return (
    <div style={styles.page}>
      <MapView />
    </div>
  );
};

const styles = {
  page: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100vh",
  },
};

export default MapPage;
