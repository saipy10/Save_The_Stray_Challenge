from flask import Flask, request, jsonify
from twilio.rest import Client
from dotenv import load_dotenv
from flask_cors import CORS
from pymongo import MongoClient
import random
import os

# Flask app initialization
app = Flask(__name__)
CORS(app)

load_dotenv()

# Twilio credentials (set these as environment variables for security)
TWILIO_ACCOUNT_SID = os.getenv("TWILIO_ACCOUNT_SID")
TWILIO_AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN")
TWILIO_PHONE_NUMBER = os.getenv("TWILIO_PHONE_NUMBER")

# In-memory OTP storage (use a database for production)
otp_storage = {}

# Twilio client initialization
client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

client = MongoClient(
    "mongodb://localhost:27017/"
)  # Update with your connection string if needed
db = client["myDB"]  # Replace with your database name
collection = db["locations"]  # Replace with your collection name
collection1 = db["reports"]


@app.route("/locations", methods=["GET"])
def get_locations():
    try:
        # Fetch all documents from the collection
        locations = list(
            collection.find({}, {"_id": 0, "latitude": 1, "longitude": 1, "color": 1})
        )
        return jsonify(locations)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Endpoint to send OTP
@app.route("/send-otp", methods=["POST"])
def send_otp():
    data = request.json
    mobile = data.get("mobile")

    if not mobile or len(mobile) != 10:
        return jsonify({"error": "Invalid mobile number"}), 400

    # Generate a 6-digit OTP
    otp = random.randint(100000, 999999)
    otp_storage[mobile] = otp  # Store OTP temporarily

    # Send OTP via Twilio
    try:
        message = client.messages.create(
            body=f"Your OTP is {otp}. It will expire in 5 minutes.",
            from_=TWILIO_PHONE_NUMBER,
            to=f"+91{mobile}",  # Assuming Indian mobile numbers
        )
        return jsonify({"message": "OTP sent successfully!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Endpoint to verify OTP
@app.route("/verify-otp", methods=["POST"])
def verify_otp():
    data = request.json
    mobile = data.get("mobile")
    otp = data.get("otp")
    size = data.get("size")
    count = data.get("count")
    location = data.get("location")
    contact = data.get("contact")

    if not mobile or not otp:
        return jsonify({"error": "Mobile number and OTP are required"}), 400

    # Check if the OTP is correct
    if otp_storage.get(mobile) == int(otp):
        # Clear the OTP after verification
        del otp_storage[mobile]
        collection1.insert_one(
            {
                "mobile": mobile,
                "size": size,
                "count": count,
                "location": location,
                "contact": contact,
            }
        )

        # Here you can store the user data in a database
        # For now, we'll just log it
        # print("Verified Data:")
        # print({
        #     "mobile": mobile,
        #     "size": size,
        #     "count": count,
        #     "location": location
        # })

        return jsonify({"message": "OTP verified successfully!"}), 200
    else:
        return jsonify({"error": "Invalid or expired OTP"}), 400


# Main entry point
if __name__ == "__main__":
    app.run(debug=True, port=5000)
