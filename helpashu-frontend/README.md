# Frontend for HELPASHU - Stray Animal Reporting System

This is the frontend application for the **Helpashu**, built using React.js and Vite. The application allows users to report stray animals by providing their location, details about the stray, and OTP-based mobile verification.

## Features

- **Interactive Map**: Displays the user's current location and nearby stray reports using markers.
- **Dynamic Form**: Users can input the size, count, and location of the stray animals.
- **OTP Verification**: Secure mobile verification to validate user reports.
- **Responsive UI**: Optimized for both desktop and mobile devices.

---

## Technologies Used

- **React.js**: Frontend library.
- **Vite**: Modern build tool for fast development.
- **MapLibre**: Open-source mapping library.
- **Maptiler**: Map tiles and styles (API key required).
- **CSS**: For styling.

---

## Installation and Setup

### Prerequisites

Ensure you have the following installed:

- **Node.js**: [Download here](https://nodejs.org)
- **npm** or **yarn**: Comes with Node.js

### Steps to Run Locally

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/saipy10/Save_The_Stray_Challenge
   cd helpashu_frontend
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Setup Environment Variables**:

   Create a `.env` file in the root of the project and add the following:

   ```env
   VITE_MAPTILER_API_KEY=your_maptiler_api_key
   ```

   Replace `your_maptiler_api_key` with your actual Maptiler API key.

4. **Run the Development Server**:

   ```bash
   npm run dev
   ```

5. **Access the Application**:

   Open your browser and navigate to `http://localhost:5173`.

---

## Project Structure

```
src/
│
├── components/        # Reusable UI component
├── assets/            # Static assets like images
├── App.jsx            # Main application file
└── main.jsx           # Entry point for React
```

---

## Deployment

1. **Build the Application**:

   ```bash
   npm run build
   ```

2. **Serve the Build**:

   Deploy the `dist` folder to any static hosting service, such as:

   - **Netlify**
   - **Vercel**
   - **GitHub Pages**

---

## Environment Variables

- **VITE_MAPTILER_API_KEY**: Required for accessing map services.

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

- [React.js](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [MapLibre](https://maplibre.org/)
- [MapTiler](https://www.maptiler.com/)
```
