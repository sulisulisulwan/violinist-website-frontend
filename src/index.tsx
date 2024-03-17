import * as React from 'react';
import * as ReactDom from 'react-dom/client'

import { 
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'

import Layout from './Layout'
import HomeMain from './pages/home/HomeMain'
import BiographyMain from './pages/biography/BiographyMain'
import CalendarMain from './pages/calendar/CalendarMain'
import { UpcomingEvents, PastEvents } from './pages/calendar/eventListing/EventsList'
import MediaMain from './pages/media/MediaMain'
import MediaVideos from './pages/media/MediaVideos'
import MediaPhotos from './pages/media/MediaPhotos'
import ContactMain from './pages/contact/ContactMain'
import BlogMain from './pages/blog/BlogMain'
import ErrorPage from './pages/ErrorPage'
import UnderConstruction from './pages/UnderConstruction';
import ShopMain from './pages/shop/ShopMain';
import ShopItemsDisplay from './pages/shop/ShopItemsDisplay';
import Checkout from './pages/shop/Checkout';



const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        index: true,
        element: <HomeMain/>
      },
      {
        path: 'biography',
        element: <BiographyMain/>
      },
      {
        path: 'calendar',
        element: <CalendarMain/>,
        children: [
          {
            index: true,
            element:<UpcomingEvents/>,
          },
          {
            path: 'upcoming-concerts',
            element:<UpcomingEvents/>,
          },
          {
            path: 'past-concerts',
            element: <PastEvents/>
          },
        ]
      },
      {
        path: 'blog',
        element: <BlogMain/>
      },
      {
        path: 'media',
        element: <MediaMain/>,
        children: [
          {
            index: true,
            element: <MediaPhotos/>
          },
          {
            path: 'photos',
            element: <MediaPhotos/>
          },
          {
            path: 'videos',
            element: <MediaVideos/>
          }
        ]
      },
      {
        path: 'shop',
        element: <ShopMain/>,
        // element: <UnderConstruction/>
        children: [
          {
            index: true,
            element: <ShopItemsDisplay/>
          },
          {
            path: 'checkout',
            element: <Checkout/>
          }
        ]
      },
      {
        path: 'contact',
        element: <ContactMain/>
      },
    ]
  },
])

const root = ReactDom.createRoot(document.getElementById('app'))

root.render((    
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
))