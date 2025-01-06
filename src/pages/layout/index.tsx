import { useMobile } from '@/hooks/useMobile' // Custom hook to detect mobile view
import { useMode } from '@/hooks/useMode' // Custom hook to manage the theme mode (light/dark)
import clsx from 'clsx' // Utility for conditionally combining class names
import { AsideLogo, AsideMenu, MainHeader } from './components' // Import components for the layout
import { Outlet } from 'react-router-dom' // React Router's Outlet to render child routes

// Font overview:
// Poppins: A clean, modern sans-serif font, ideal for long-form content and descriptions.
// Inter: Popular sans-serif font suitable for small to medium-sized text, especially in interfaces.
// Montserrat: A strong font used for headlines or titles to give a professional impression.

export default function MainLayout() {
  const { mode, setMode } = useMode() // Hook for getting and setting the theme (light/dark)
  const { isMobile } = useMobile() // Hook to check if the screen is mobile-sized

  return (
    <div
      style={{ lineHeight: '130%' }} // Set the line height for better readability
      className={clsx(
        'scrollbar flex h-screen w-full overflow-auto font-poppins text-[2rem] text-primary phones:text-[2.4rem]',
        {
          'bg-light text-primary': mode !== 'DARK', // Light theme styling
          'bg-dark text-white': mode === 'DARK', // Dark theme styling
        },
      )}
    >
      {/* Conditional rendering for mobile and desktop views */}
      {isMobile ? (
        <div className="">Mobile App</div> // Display content for mobile devices (you can replace this later with mobile layout)
      ) : (
        <>
          {/* Desktop layout: Sidebar on the left */}
          <div
            className={clsx(
              'scrollbar flex h-full w-1/5 flex-col gap-48 overflow-auto py-32',
              {
                'bg-primary text-white': mode !== 'DARK', // Light theme sidebar
                'bg-slate-800 text-white': mode === 'DARK', // Dark theme sidebar
              },
            )}
          >
            <AsideLogo /> {/* The logo section in the sidebar */}
            <AsideMenu /> {/* The menu section in the sidebar */}
          </div>

          {/* Main content area on the right */}
          <div className="flex h-full w-4/5 flex-col gap-32 overflow-auto p-32">
            {/* Main header for the layout */}
            <MainHeader mode={mode} setMode={setMode} />
            {/* This is where child components will be rendered */}
            <div className="scrollbar flex flex-1 overflow-auto">
              <Outlet /> {/* React Router Outlet to render the child routes */}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
