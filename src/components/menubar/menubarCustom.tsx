import { ReactNode } from 'react' // Importing ReactNode to define the type of 'trigger' and 'content' props
import { Menubar, MenubarContent, MenubarMenu, MenubarTrigger } from './menubar' // Importing custom Menubar components
import clsx from 'clsx' // Importing clsx for conditionally applying classes
import { useMode } from '@/hooks/useMode' // Importing a custom hook to access the current mode (light or dark)

export function MenubarCustom({
  trigger, // The content for the trigger button that will open the menu
  content, // The content to be displayed inside the menu
  position = 'right', // Default position of the menu ('left' or 'right')
  width = 'w-[30rem]', // Default width of the menu
  height, // Optional height for the menu
  padding = 'p-12', // Default padding inside the menu
  custom, // Optional custom styles to be added
  disabled, // Flag to disable the Menubar trigger
  isNoClick, // Flag to disable closing the menu on click inside
  handleMenuOpen, // Function to open the menu
  handleMenuClose, // Function to close the menu
  isMenuOpen, // Flag to check if the menu is open
}: {
  trigger: ReactNode // The content for the trigger element (e.g., button or icon)
  content: ReactNode // The content that will be displayed in the menu
  position?: 'left' | 'right' // Optional, determines whether the menu opens to the left or right
  width?: string // Optional, width of the menu
  height?: string // Optional, height of the menu
  padding?: string // Optional, padding inside the menu
  custom?: string // Optional, custom CSS class names
  disabled?: boolean // Optional, disables the Menubar trigger
  isNoClick?: boolean // Optional, prevents closing the menu when clicking inside
  handleMenuClose?: () => void // Optional, callback for closing the menu
  handleMenuOpen?: () => void // Optional, callback for opening the menu
  isMenuOpen?: boolean // Optional, checks whether the menu is open
}) {
  const { mode } = useMode() // Using a custom hook to get the current theme mode (e.g., 'DARK' or 'LIGHT')

  return (
    <Menubar>
      {' '}
      {/* Root container for the Menubar */}
      <MenubarMenu>
        {' '}
        {/* Wraps the menu trigger and content */}
        <MenubarTrigger
          className="w-full text-center transition-all duration-300 hover:cursor-pointer hover:opacity-90 disabled:cursor-not-allowed" // Styling for the trigger button
          variant="nothing" // Button variant, ensuring no specific style is applied
          layout="icon" // Button layout, for icon-based trigger
          size="fit" // The button will fit its content size
          onClick={handleMenuOpen} // Handles opening the menu
          disabled={disabled} // Disables the trigger if the 'disabled' prop is true
        >
          {trigger} {/* The content to be displayed on the trigger */}
        </MenubarTrigger>
        {/* Conditionally render MenubarContent based on the 'isMenuOpen' state */}
        {isMenuOpen && (
          <MenubarContent
            className={clsx(
              `${width} absolute top-0 ${height} overflow-auto ${padding} text-primary-900 text-[2rem] shadow-lg transition-all duration-300`, // Basic styling for the menu
              {
                'left-0': position === 'right', // If the position is 'right', the menu opens to the left
                'right-0 phones:-right-[5rem]': position === 'left', // If the position is 'left', the menu opens to the right
              },
              custom, // Additional custom classes passed via props
              {
                'bg-white': mode !== 'DARK', // Background color based on the current mode
                'bg-slate-700 text-white': mode === 'DARK', // Dark mode styling
              },
            )}
            onClick={() => {
              if (!isNoClick) {
                handleMenuClose() // Closes the menu when clicking outside if 'isNoClick' is false
              }
            }}
          >
            {content} {/* The content to be displayed inside the menu */}
          </MenubarContent>
        )}
      </MenubarMenu>
    </Menubar>
  )
}
