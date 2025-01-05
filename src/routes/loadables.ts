// Import the 'loadable' function from '@loadable/component' to dynamically load components
import loadable from '@loadable/component'

// Dynamically import the MainLayout component from the 'layout' page
// This component will be loaded only when needed (e.g., when navigating to the page)
export const MainLayout = loadable(() => import('@/pages/layout'))

// Dynamically import the HomePage component from the 'homepage' page
// This ensures the homepage is loaded only when the user visits it, improving initial load performance
export const HomePage = loadable(() => import('@/pages/homepage'))

// Dynamically import the NotFoundPage component from the 'notFound' page
// This page will be used for displaying a 404 error when no matching route is found
export const NotFoundPage = loadable(() => import('@/pages/notFound'))
