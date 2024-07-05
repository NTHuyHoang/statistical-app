import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <GoogleOAuthProvider clientId="936056609798-qhmojib77nh666mmhklgsajqsl5g0n8c.apps.googleusercontent.com">
            <App />
        </GoogleOAuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
