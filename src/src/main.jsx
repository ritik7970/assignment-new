import { StrictMode } from 'react'
import { createRoot,ReactDom } from 'react-dom/client'
import './index.css'
import { AuthProvider } from "./contexts/AuthContext";
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import { initializeMockData } from "./utils/localStorageUtils";
import { ShipsProvider } from "./contexts/ShipsContext";
initializeMockData();
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <ShipsProvider>
        <App />
      </ShipsProvider>
    </AuthProvider>
  </BrowserRouter>
)
