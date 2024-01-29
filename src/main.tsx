import React from 'react';
import ReactDOM from 'react-dom/client';
import HomePage from './HomePage.tsx';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { DetailModal } from './components/DetailModal.tsx';
import { AddForm } from './components/AddForm.tsx';

const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />
    },
    {
      path: '/details',
      element: <DetailModal />
    },
    {
      path: '/add_form',
      element: <AddForm />
    }
  ])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div>
     <RouterProvider router={router} /> 
    </div>
  </React.StrictMode>
)
