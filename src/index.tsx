import * as React from 'react';
import * as ReactDom from 'react-dom/client'
const { lazy } = React

import { 
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'

import Layout from './Layout'
<<<<<<< HEAD
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
=======
import { DARK_MODE_BACKGROUND_COLOR, NAVY_BLUE_LIGHT } from './sharedStyles/colors';
>>>>>>> 43300cae6262ef996a3dd0962ce6aee6e6bbb25a

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

const LoadingScreen = () => {

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
          <React.Suspense fallback={<LoadingScreen/>}>
            <HomeMain/>
          </React.Suspense>
        )
      },
      {
        path: 'biography',
        element: ( 
          <React.Suspense fallback={<LoadingScreen/>}>
            <BiographyMain/>
          </React.Suspense>
        )
      },
      {
        path: 'calendar',
        element: (
          <React.Suspense fallback={<LoadingScreen/>}>
            <CalendarMain/>
          </React.Suspense>
        ),
        children: [
          {
            index: true,
            element:(
              <React.Suspense fallback={<LoadingScreen/>}>
                <UpcomingEvents/>
              </React.Suspense>
            ),
          },
          {
            path: 'upcoming-concerts',
            element:(
              <React.Suspense fallback={<LoadingScreen/>}>
                <UpcomingEvents/>
              </React.Suspense>
            ),
          },
          {
            path: 'past-concerts',
            element: (
              <React.Suspense fallback={<LoadingScreen/>}>
                <PastEvents/>
              </React.Suspense>
            )
          },
        ]
      },
      {
        path: 'blog',
        element: (
          <React.Suspense fallback={<LoadingScreen/>}>
            <BlogMain/>
          </React.Suspense>
        )
      },
      {
        path: 'media',
        element: (
          <React.Suspense fallback={<LoadingScreen/>}>
            <MediaMain/>
          </React.Suspense>
        ),
        children: [
          {
            index: true,
            element: (
              <React.Suspense fallback={<LoadingScreen/>}>
                <MediaPhotos/>
              </React.Suspense>
            )
          },
          {
            path: 'photos',
            element: (
              <React.Suspense fallback={<LoadingScreen/>}>
                <MediaPhotos/>
              </React.Suspense>
            )
          },
          {
            path: 'videos',
            element: (
              <React.Suspense fallback={<LoadingScreen/>}>
                <MediaVideos/>
              </React.Suspense>
            )
          }
        ]
      },
      {
        path: 'shop',
<<<<<<< HEAD
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
=======
        // element: <ShopMain/>
        element: (
          <React.Suspense fallback={<LoadingScreen/>}>
            <UnderConstruction/>
          </React.Suspense>
        )
>>>>>>> 43300cae6262ef996a3dd0962ce6aee6e6bbb25a
      },
      {
        path: 'contact',
        element: (
          <React.Suspense fallback={<LoadingScreen/>}>
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