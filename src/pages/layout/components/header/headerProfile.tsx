import { MenubarCustom } from '@/components/menubar/menubarCustom'
import { User2 } from 'lucide-react'
import { useState } from 'react'

/**
 * HeaderProfile component displays a profile menu in the header.
 *
 * This component renders a profile icon, and when clicked, shows a dropdown
 * menu that provides options such as viewing the user profile.
 *
 * @returns {JSX.Element} - The HeaderProfile component.
 */
export function HeaderProfile() {
  // State for managing the open/close status of the profile menu
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  /**
   * Handle the closing of the profile menu.
   */
  const handleMenuClose = () => {
    setIsMenuOpen(false)
  }

  /**
   * Handle the opening of the profile menu.
   */
  const handleMenuOpen = () => {
    setIsMenuOpen(true)
  }

  return (
    <MenubarCustom
      // Pass the menu open state and handlers to the MenubarCustom component
      isMenuOpen={isMenuOpen}
      handleMenuClose={handleMenuClose}
      handleMenuOpen={handleMenuOpen}
      // Trigger element (profile icon) that opens the menu when clicked
      trigger={
        <span className="flex h-[5.2rem] w-[5.2rem] items-center justify-center rounded-2xl border border-slate-300 transition-colors duration-300 hover:cursor-pointer hover:bg-slate-300 hover:text-slate-700">
          <User2 size={16} /> {/* Profile icon from Lucide React */}
        </span>
      }
      // Content for the menu (user profile options)
      content={
        <div className="flex flex-col gap-16 p-4">
          <p className="border-b pb-16">Zhong XIna</p> {/* Display user name */}
          <div className="flex flex-col gap-16">
            <p>My Profile</p> {/* Option for viewing profile */}
          </div>
        </div>
      }
      // Positioning of the menu and custom styling
      position="left"
      custom="top-[1rem] -right-[5rem]"
    />
  )
}
