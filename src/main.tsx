import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { DetailModal } from './components/DetailModal.tsx'

const router = createBrowserRouter([
    {
      path: '/',
      element: <App />
    },
    {
      path: '/details',
      element: <DetailModal />
    }
  ])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div>
     <RouterProvider router={router} /> 
    </div>
  </React.StrictMode>
)
