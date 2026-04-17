import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './Home.jsx'
import Mystock from './Mystock.jsx'
import Header from "./component/Header.jsx";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom"; // เพิ่ม Outlet

const AppLayout = () => (
  <>
    <Header />
    <Outlet />
  </>
);

const routes = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/Mystock",
        element: <Mystock />
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>
)
