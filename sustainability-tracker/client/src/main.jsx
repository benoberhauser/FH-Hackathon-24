import React from 'react';
import ReactDOM from 'react-dom/client';

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from './App.jsx';
import './index.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import ErrorPage from './components/Errors/ErrorPage';
import Dashboard from './components/Dashboard';  // Importiere dein Dashboard


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,  // Dies gibt an, dass dies die Standardkomponente ist
        element: <Dashboard />,  // Das Dashboard als Home-Page-Element
      },
    ],
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
);
