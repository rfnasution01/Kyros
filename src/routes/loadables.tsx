// Import the 'loadable' function from '@loadable/component' to dynamically load components
import { Loading } from '@/components/loading'
import loadable from '@loadable/component'

// Dynamically import the MainLayout component from the 'layout' page
// This component will be loaded only when needed (e.g., when navigating to the page)
// The 'Loading' will be shown as a fallback until the MainLayout is fully loaded
export const MainLayout = loadable(() => import('@/pages/layout'), {
  fallback: <Loading />, // Custom loading indicator while the layout is being fetched
})

// Dynamically import the HomePage component from the 'homepage' page
// This ensures the homepage is loaded only when the user visits it, improving initial load performance
export const HomePage = loadable(() => import('@/pages/homepage'), {
  fallback: <Loading />, // Show loading component until the HomePage is ready
})

// Dynamically import additional pages with custom loading component for better UX
export const PortfolioPage = loadable(() => import('@/pages/portfolio'), {
  fallback: <Loading />, // Custom loading indicator
})

export const TransactionsPage = loadable(() => import('@/pages/transactions'), {
  fallback: <Loading />, // Custom loading indicator
})

export const AnalysisPage = loadable(() => import('@/pages/analysis'), {
  fallback: <Loading />, // Custom loading indicator
})

export const AlertsPage = loadable(() => import('@/pages/alerts'), {
  fallback: <Loading />, // Custom loading indicator
})

export const NFTDEFIPage = loadable(() => import('@/pages/nft'), {
  fallback: <Loading />, // Custom loading indicator
})

export const SettingsPage = loadable(() => import('@/pages/settings'), {
  fallback: <Loading />, // Custom loading indicator
})

export const BlockScanPage = loadable(() => import('@/pages/blockscan'), {
  fallback: <Loading />, // Custom loading indicator
})

// Dynamically import the NotFoundPage component from the 'notFound' page
// This page will be used for displaying a 404 error when no matching route is found
export const NotFoundPage = loadable(() => import('@/pages/notFound'), {
  fallback: <Loading />, // Custom loading indicator
})
