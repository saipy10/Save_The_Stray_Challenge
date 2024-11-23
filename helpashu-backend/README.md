# Backend for HELPASHU Stray Animal Reporting System

This is the backend application for the **HELPASHU**, built using Flask. The backend handles user authentication, OTP verification, and manages the storage and retrieval of stray animal reports.

## Features

- **OTP-based Authentication**: Secure mobile number verification using OTP.
- **API Endpoints**: For reporting stray animals, fetching stray reports, and verifying OTP.
- **Database Integration**: MongoDB is used for storing user and stray report data.
- **Location Services**: Geolocation handling for reporting and fetching stray locations.

---

## Technologies Used

- **Flask**: Web framework for building the backend.
- **Flask-CORS**: For enabling Cross-Origin Resource Sharing.
- **PyMongo**: MongoDB driver for Python.
- **Twilio**: For sending OTPs (or any other SMS service provider).
- **dotenv**: For environment variable management.

---

## Installation and Setup

### Prerequisites

Ensure you have the following installed:

- **Python 3.x**: [Download here](https://www.python.org/)
- **MongoDB**: [Download here](https://www.mongodb.com/try/download/community)

### Steps to Run Locally

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/saipy10/Save_The_Stray_Challenge
   cd Save_The_Stray_Challenge/helpashu-backend
   ```

2. **Create a Virtual Environment**:

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
   ```

3. **Install Dependencies**:

   ```bash
   pip install -r requirements.txt
   ```

4. **Setup Environment Variables**:

   Create a `.env` file in the root of the `backend` directory and add the following:

   ```env
   MONGO_URI=your_mongo_uri
   TWILIO_ACCOUNT_SID=your_twilio_account_sid
   TWILIO_AUTH_TOKEN=your_twilio_auth_token
   TWILIO_PHONE_NUMBER=your_twilio_phone_number
   ```

   Replace the placeholders with your actual credentials and database URI.

5. **Run the Flask Application**:

   ```bash
   python app.py
   ```

6. **Access the Application**:

   The backend server will run on `http://localhost:5000`.

---

## Project Structure

```
helpashu-backend/
│
├── app.py               # Main application file
├── requirements.txt     # Python dependencies
└── .env                 # Environment variables
```

---

## API Endpoints

- **POST `/send-otp`**: Sends an OTP to the given mobile number.
- **POST `/verify-otp`**: Verifies the given OTP.
- **GET `/locations`**: Retrieves all stray animal reports.

---

## Environment Variables

- **MONGO_URI**: MongoDB connection string.
- **TWILIO_ACCOUNT_SID**: Your Twilio account SID.
- **TWILIO_AUTH_TOKEN**: Your Twilio authentication token.
- **TWILIO_PHONE_NUMBER**: Your Twilio phone number for sending SMS.

---

## Contributing

Contributions are welcome! Follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/new-feature`).
3. Commit your changes (`git commit -m "Add new feature"`).
4. Push to the branch (`git push origin feature/new-feature`).
5. Open a pull request.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Acknowledgments

- [Flask](https://flask.palletsprojects.com/)
- [MongoDB](https://www.mongodb.com/)
- [Twilio](https://www.twilio.com/)
