import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './pages/home/page.tsx';
import Cart from './pages/cart/page.tsx';
import Profile from './pages/profile/page.tsx';
import Clothes from './pages/clothes/page.tsx';
import Auth from './pages/auth/page.tsx';

const pages = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/cart", element: <Cart /> },
      { path: "/profile", element: <Profile /> },
      { path: "/clothes", element: <Clothes /> },
      { path: "/auth", element: <Auth /> },
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={pages}></RouterProvider>
  </StrictMode>,
)
