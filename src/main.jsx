import { StrictMode } from 'react'
import { createRoot,ReactDom } from 'react-dom/client'
import './index.css'
import { AuthProvider } from "./contexts/AuthContext";
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import { initializeMockData } from "./utils/localStorageUtils";
import { ShipsProvider } from "./contexts/ShipsContext";
import { ComponentsProvider } from "./contexts/ComponentsContext";
import { JobsProvider } from './contexts/JobsContext.jsx';
import { NotificationProvider } from './contexts/NotificationContext.jsx';
initializeMockData();
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <ShipsProvider>
        <ComponentsProvider>
           <JobsProvider>
            <NotificationProvider>
                <App />
            </NotificationProvider>
          </JobsProvider>
        </ComponentsProvider>
      </ShipsProvider>
    </AuthProvider>
  </BrowserRouter>
)
