import React from 'react'
import ReactDOM from 'react-dom/client'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import LoginPage from './LoginPage.jsx'
import AuthProvider from './AuthProvider.jsx'
import ComponentPage from './ComponentPage.jsx'
import CreateComponentPage from './CreateComponentPage.jsx'
import UpdateComponentPage from './UpdateComponentPage.jsx'
import RequireAuth from './RequireAuth.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
      {
        path: '/components',
        element: <RequireAuth><ComponentPage /></RequireAuth>,
      },
      {
        path: '/components/create',
        element: <RequireAuth><CreateComponentPage /></RequireAuth>,
      },
      {
        path: '/components/update/:id_comp_fotovoltaico',
        element: <RequireAuth><UpdateComponentPage /></RequireAuth>,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
