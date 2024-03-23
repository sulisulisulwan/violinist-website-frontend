import * as React from 'react';
import * as ReactDom from 'react-dom/client'
const { lazy } = React

import { 
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'

import Layout from './Layout'
import { DARK_MODE_BACKGROUND_COLOR, NAVY_BLUE_LIGHT } from './sharedStyles/colors';

const ShopItemsDisplay = lazy(() => import('./pages/shop/ShopItemsDisplay'));
const Checkout = lazy(() => import('./pages/shop/Checkout'));
const HomeMain = lazy(() => import('./pages/home/HomeMain'))
const BiographyMain = lazy(() => import('./pages/biography/BiographyMain'))
const CalendarMain = lazy(() => import('./pages/calendar/CalendarMain'))
const UpcomingEvents = lazy(() => import('./pages/calendar/eventListing/UpcomingEvents'))
const PastEvents = lazy(() => import('./pages/calendar/eventListing/PastEvents'))
const MediaMain = lazy(() => import('./pages/media/MediaMain'))
const MediaVideos = lazy(() => import('./pages/media/MediaVideos'))
const MediaPhotos = lazy(() => import('./pages/media/MediaPhotos'))
const ContactMain = lazy(() => import('./pages/contact/ContactMain'))
const BlogMain = lazy(() => import('./pages/blog/BlogMain'))
const ErrorPage = lazy(() => import('./pages/ErrorPage'))
const UnderConstruction = lazy(() => import('./pages/UnderConstruction'))
const ShopMain = lazy(() => import('./pages/shop/ShopMain'))

const FallbackMainLoadingScreen = () => {

  return (
    <div 
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: localStorage.getItem('darkMode') === 'true' ? DARK_MODE_BACKGROUND_COLOR : 'white',
        fontSize: 100,
        zIndex: 3000,
        color: localStorage.getItem('darkMode') === 'true' ? 'white' : NAVY_BLUE_LIGHT,
        textAlign: 'center',
        transition: ''
      }}
    ></div>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        index: true,
        element: (
          <React.Suspense fallback={<FallbackMainLoadingScreen/>}>
            <HomeMain/>
          </React.Suspense>
        )
      },
      {
        path: 'biography',
        element: ( 
          <React.Suspense fallback={<FallbackMainLoadingScreen/>}>
            <BiographyMain/>
          </React.Suspense>
        )
      },
      {
        path: 'calendar',
        element: (
          <React.Suspense fallback={<FallbackMainLoadingScreen/>}>
            <CalendarMain/>
          </React.Suspense>
        ),
        children: [
          {
            index: true,
            element:(
              <React.Suspense fallback={<FallbackMainLoadingScreen/>}>
                <UpcomingEvents/>
              </React.Suspense>
            ),
          },
          {
            path: 'upcoming-concerts',
            element:(
              <React.Suspense fallback={<FallbackMainLoadingScreen/>}>
                <UpcomingEvents/>
              </React.Suspense>
            ),
          },
          {
            path: 'past-concerts',
            element: (
              <React.Suspense fallback={<FallbackMainLoadingScreen/>}>
                <PastEvents/>
              </React.Suspense>
            )
          },
        ]
      },
      {
        path: 'blog',
        element: (
          <React.Suspense fallback={<FallbackMainLoadingScreen/>}>
            <BlogMain/>
          </React.Suspense>
        )
      },
      {
        path: 'media',
        element: (
          <React.Suspense fallback={<FallbackMainLoadingScreen/>}>
            <MediaMain/>
          </React.Suspense>
        ),
        children: [
          {
            index: true,
            element: (
              <React.Suspense fallback={<FallbackMainLoadingScreen/>}>
                <MediaPhotos/>
              </React.Suspense>
            )
          },
          {
            path: 'photos',
            element: (
              <React.Suspense fallback={<FallbackMainLoadingScreen/>}>
                <MediaPhotos/>
              </React.Suspense>
            )
          },
          {
            path: 'videos',
            element: (
              <React.Suspense fallback={<FallbackMainLoadingScreen/>}>
                <MediaVideos/>
              </React.Suspense>
            )
          }
        ]
      },
      {
        path: 'shop',
        // element: <ShopMain/>,
        element: <UnderConstruction/>
        // children: [
        //   {
        //     index: true,
        //     element: <ShopItemsDisplay/>
        //   },
        //   {
        //     path: 'checkout',
        //     element: <Checkout/>
        //   }
        // ]
      },
      {
        path: 'contact',
        element: (
          <React.Suspense fallback={<FallbackMainLoadingScreen/>}>
            <ContactMain/>
          </React.Suspense>
        )
      },
    ]
  },
])

const appDiv = document.getElementById('app')
const darkModeSetting = localStorage.getItem('darkMode')
const initBackgroundColor = darkModeSetting ? (darkModeSetting === 'true' ? DARK_MODE_BACKGROUND_COLOR : 'white') : 'white'
appDiv.style.backgroundColor = initBackgroundColor

const root = ReactDom.createRoot(document.getElementById('app'))

root.render((    
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
))