import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>  {/* Assure-toi que toutes les routes sont encapsulées ici */}
            <App />
        </BrowserRouter>
    </StrictMode>
);
