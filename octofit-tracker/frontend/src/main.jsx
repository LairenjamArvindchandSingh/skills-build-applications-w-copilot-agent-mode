import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App.jsx'

// Environment variables:
// VITE_CODESPACE_NAME must be defined in .env.local for Codespaces support.
// Example:
//   VITE_CODESPACE_NAME=my-codespace-name
// If not set, the app will use localhost:8000 as fallback.

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
