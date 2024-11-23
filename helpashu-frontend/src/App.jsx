// import React from "react";
import { BrowserRouter as Router, Route, Routes, NavLink } from "react-router-dom";
import MobileOtpPage from "./components/MobileOtpPage";
import MapPage from "./components/MapPage";

const App = () => {
  return (
    <Router>
      <div style={styles.container}>
        {/* Routes for different pages */}
        <div style={styles.content}>
          <Routes>
            <Route path="/" element={<MobileOtpPage />} />
            <Route path="/map" element={<MapPage />} />
          </Routes>
        </div>

        {/* Bottom Navigation Bar */}
        <div style={styles.navbar}>
          <NavLink
            to="/map"
            style={({ isActive }) =>
              isActive ? { ...styles.navItem, ...styles.activeNavItem } : styles.navItem
            }
          >
            Map
          </NavLink>
          <NavLink
            to="/"
            style={({ isActive }) =>
              isActive ? { ...styles.navItem, ...styles.activeNavItem } : styles.navItem
            }
          >
            Report Stray
          </NavLink>
        </div>
      </div>
    </Router>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  },
  content: {
    flex: 1,
    overflowY: "auto",
  },
  navbar: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    height: "60px",
    borderTop: "1px solid #ccc",
    backgroundColor: "#fff",
    position: "fixed",
    bottom: 0,
    width: "100%",
  },
  navItem: {
    textDecoration: "none",
    color: "#888",
    fontSize: "18px",
    fontWeight: "bold",
  },
  activeNavItem: {
    color: "#4caf50",
  },
};

export default App;
