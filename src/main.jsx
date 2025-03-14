import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import router from './router/router';
import AuthProvider from './provider/AuthProvider';
import { ToastContainer } from 'react-toastify';
import { HelmetProvider } from 'react-helmet-async';
import DarkModeProvider from './components/DarkModeContext/DarkModeContext';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DarkModeProvider>
      <HelmetProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </HelmetProvider>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Slide
      />
    </DarkModeProvider>
  </StrictMode>,
)
