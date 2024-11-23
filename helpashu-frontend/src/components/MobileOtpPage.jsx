import { useState } from "react";

const MobileOtpPage = () => {
  const [step, setStep] = useState("selectDetails"); // Tracks the current step
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedCount, setSelectedCount] = useState(null);
  const [location, setLocation] = useState({});
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [userLocation, setUserLocation] = useState(null);

  // Function to get current location
  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
          setLocation({ latitude, longitude });
        },
        (err) => {
          alert("Failed to get current location. Please enable location services.");
          console.error("Error fetching location:", err);
        },
        { enableHighAccuracy: true }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  // Function to handle mobile number submission
  const handleMobileSubmit = async (e) => {
    e.preventDefault();
    if (mobile.length === 10) {
      try {
        const response = await fetch("https://127.0.0.1:5000/send-otp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ mobile }),
        });

        if (response.ok) {
          alert("OTP sent successfully!");
          setStep("enterOtp");
        } else {
          const error = await response.json();
          alert(`Error sending OTP: ${error.message}`);
        }
      } catch (error) {
        console.error("Error sending OTP:", error);
        alert("Error sending OTP. Please try again later.");
      }
    } else {
      alert("Please enter a valid 10-digit mobile number.");
    }
  };

  // Function to handle OTP submission
  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      mobile,
      otp,
      size: selectedSize,
      count: selectedCount,
      location,
    };

    try {
      const response = await fetch("https://127.0.0.1:5000/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        alert("OTP verified successfully!");
        setStep("selectDetails");
        setSelectedSize(null);
        setSelectedCount(null);
        setLocation({});
        setMobile("");
        setOtp("");
      } else {
        const error = await response.json();
        alert(`OTP verification failed: ${error.message}`);
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("Error verifying OTP. Please try again later.");
    }
  };

  return (
    <div style={styles.page}>
      {/* Title Bar */}
      <header style={styles.titleBar}>
        <h1 style={styles.title}>Report Stray</h1>
      </header>

      <div style={styles.box}>
        {/* Step 1: Select Details */}
        {step === "selectDetails" && (
          <div style={styles.detailsStep}>
            <h2 style={styles.heading}>Enter Stray Details</h2>

            {/* Stray Size */}
            <div>
              <h3 style={styles.subHeading}>Size of Stray</h3>
              <div style={styles.options}>
                <button
                  onClick={() => setSelectedSize("Small")}
                  style={{
                    ...styles.optionButton,
                    backgroundColor: selectedSize === "Small" ? "yellow" : "#f0f0f0",
                    color: selectedSize === "Small" ? "#fff" : "#333",
                  }}
                >
                  Small 🐕
                </button>
                <button
                  onClick={() => setSelectedSize("Medium")}
                  style={{
                    ...styles.optionButton,
                    backgroundColor: selectedSize === "Medium" ? "orange" : "#f0f0f0",
                    color: selectedSize === "Medium" ? "#fff" : "#333",
                  }}
                >
                  Medium 🐄
                </button>
                <button
                  onClick={() => setSelectedSize("Large")}
                  style={{
                    ...styles.optionButton,
                    backgroundColor: selectedSize === "Large" ? "red" : "#f0f0f0",
                    color: selectedSize === "Large" ? "#fff" : "#333",
                  }}
                >
                  Large 🐘
                </button>
              </div>
            </div>

            {/* Stray Count */}
            <div>
              <h3 style={styles.subHeading}>Count of Stray</h3>
              <div style={styles.options}>
                <button
                  onClick={() => setSelectedCount("1-5")}
                  style={{
                    ...styles.optionButton,
                    backgroundColor: selectedCount === "1-5" ? "yellow" : "#f0f0f0",
                    color: selectedCount === "1-5" ? "#fff" : "#333",
                  }}
                >
                  1 to 5
                </button>
                <button
                  onClick={() => setSelectedCount("5-10")}
                  style={{
                    ...styles.optionButton,
                    backgroundColor: selectedCount === "5-10" ? "orange" : "#f0f0f0",
                    color: selectedCount === "5-10" ? "#fff" : "#333",
                  }}
                >
                  5 to 10
                </button>
                <button
                  onClick={() => setSelectedCount("10+")}
                  style={{
                    ...styles.optionButton,
                    backgroundColor: selectedCount === "10+" ? "red" : "#f0f0f0",
                    color: selectedCount === "10+" ? "#fff" : "#333",
                  }}
                >
                  10+
                </button>
              </div>
            </div>

            {/* Location */}
            <div>
              <h3 style={styles.subHeading}>Location</h3>
              <input
                type="text"
                placeholder="Enter Location"
                value={`lat: ${location.latitude}, lng: ${location.longitude}`}
                onChange={(e) => setLocation(e.target.value)}
                style={styles.input}
              />
              <button onClick={handleGetCurrentLocation} style={styles.button}>
                Get Current Location
              </button>
            </div>

            <button
              onClick={() => setStep("enterMobile")}
              style={styles.continueButton}
              disabled={!selectedSize || !selectedCount || !location}
            >
              Continue
            </button>
          </div>
        )}

        {/* Step 2: Enter Mobile Number */}
        {step === "enterMobile" && (
          <form onSubmit={handleMobileSubmit} style={styles.form}>
            <h2 style={styles.heading}>Enter Mobile Number</h2>
            <input
              type="text"
              placeholder="Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              style={styles.input}
            />
            <button type="submit" style={styles.button}>
              Send OTP
            </button>
          </form>
        )}

        {/* Step 3: Enter OTP */}
        {step === "enterOtp" && (
          <form onSubmit={handleOtpSubmit} style={styles.form}>
            <h2 style={styles.heading}>Enter OTP</h2>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              style={styles.input}
            />
            <button type="submit" style={styles.button}>
              Submit OTP
            </button>
          </form>
        )}
      </div>
    </div>
  );
};


const styles = {
  page: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f0f0f0",
  },
  titleBar: {
    width: "100%",
    backgroundColor: "green",
    color: "white",
    textAlign: "center",
    padding: "15px 0",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  },
  title: {
    margin: 0,
    fontSize: "24px",
    fontWeight: "bold",
  },
  box: {
    width: "300px",
    padding: "20px",
    margin: "50px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    backgroundColor: "#fff",
    textAlign: "center",
  },
  heading: {
    marginBottom: "20px",
    fontSize: "18px",
    color: "#333",
  },
  subHeading: {
    marginBottom: "10px",
    fontSize: "16px",
    color: "#333",
  },
  options: {
    display: "flex",
    justifyContent: "space-around",
    marginBottom: "20px",
  },
  optionButton: {
    padding: "10px 20px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "16px",
    cursor: "pointer",
    transition: "0.3s",
  },
  continueButton: {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#4caf50",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    margin: "10px 0",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  button: {
    padding: "10px",
    margin: "8px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#4caf50",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default MobileOtpPage;
