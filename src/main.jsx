import React from 'react';
import ReactDOM from 'react-dom/client';  // Change this to 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import StoreContextProvider from './context/StoreContext';
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";

// Create a root with React 18's new API
const root = ReactDOM.createRoot(document.getElementById('root')); // Use createRoot here
root.render(
  <BrowserRouter future={{ v7_startTransition: true }}>
   <StoreContextProvider>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App/>
      </ThemeProvider>
   </StoreContextProvider>
  </BrowserRouter>
);