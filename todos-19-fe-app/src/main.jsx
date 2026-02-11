import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';

import Root from './routes/Root.jsx';
import Login from './routes/Login.jsx';
import Signup from './routes/Signup.jsx';
import Dash from './components/Dash.jsx';
import ProtectedRoute from './routes/ProtectedRoute.jsx';
import './index.css';

const dummyFallback = () => null;

const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    errorElement: <h1>Something went wrong!</h1>,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Dash />
          </ProtectedRoute>
        ),
      },
      { path: '/login', Component: Login, HydrateFallback: dummyFallback },
      { path: '/signup', Component: Signup, HydrateFallback: dummyFallback },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
