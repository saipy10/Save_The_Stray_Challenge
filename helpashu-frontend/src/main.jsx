import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
// import MobileOtpPage from './components/mobileOTPpage'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App/>
  </StrictMode>,
)
