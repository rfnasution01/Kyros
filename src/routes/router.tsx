// Import necessary modules from 'react-router-dom' to handle routing in the app
import { createBrowserRouter } from 'react-router-dom'
// Import dynamically loaded components using 'loadable'
import {
  AlertsPage,
  AnalysisPage,
  BlockScanPage,
  HomePage,
  MainLayout,
  NFTDEFIPage,
  NotFoundPage,
  PortfolioPage,
  SettingsPage,
  TransactionsPage,
} from './loadables'

// Create a router configuration using 'createBrowserRouter' from 'react-router-dom' to define the app's routes
export const router = createBrowserRouter([
  {
    // Define the root path '/' for the app, where the MainLayout component will be rendered
    // MainLayout serves as the wrapper for the app's layout structure
    path: '/',
    element: <MainLayout />,
    children: [
      {
        // This is the child route for the home page, loaded when the user accesses the root path ('/')
        path: '',
        element: <HomePage />,
      },
      {
        // Child route for the portfolio page
        path: 'portfolio',
        element: <PortfolioPage />,
      },
      {
        // Child route for the transactions page
        path: 'transactions',
        element: <TransactionsPage />,
      },
      {
        // Child route for the block scan page
        path: 'blockscan',
        element: <BlockScanPage />,
      },
      {
        // Child route for the analysis page
        path: 'analysis',
        element: <AnalysisPage />,
      },
      {
        // Child route for the alerts page
        path: 'alerts',
        element: <AlertsPage />,
      },
      {
        // Child route for the NFT-Defi page
        path: 'nft-defi',
        element: <NFTDEFIPage />,
      },
      {
        // Child route for the settings page
        path: 'settings',
        element: <SettingsPage />,
      },
    ],
  },
  {
    // Wildcard '*' route to catch all undefined paths
    // When a route does not match any of the defined routes, it will render the NotFoundPage
    path: '*',
    element: <NotFoundPage />,
  },
])
