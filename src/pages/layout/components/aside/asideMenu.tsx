import { ListMenu } from '@/data/listMenu'
import { usePathname } from '@/hooks/usePathname'
import { convertSlugToText, convertToSlug } from '@/utils/formatText'
import clsx from 'clsx'
import { useNavigate } from 'react-router-dom'

/**
 * AsideMenu component renders a vertical menu list with navigation options.
 *
 * Each menu item is rendered as a button. If the button is clicked, the user is navigated
 * to the respective route based on the menu label. The menu also indicates the status of
 * each menu item (e.g., available, pending, coming soon) with different visual styles.
 *
 * @returns {JSX.Element} - A component rendering the aside menu with buttons for navigation.
 */
export function AsideMenu() {
  // Get the first part of the pathname from the custom hook `usePathname`
  const { firstPathname } = usePathname()
  // Hook to programmatically navigate to different routes
  const navigate = useNavigate()

  return (
    <div className="flex flex-col gap-16 px-16">
      {/* Iterate over each menu item in the ListMenu data */}
      {ListMenu?.map((menu, idx) => (
        <button
          key={idx}
          // Disable the button if the menu item's status is not 'available' or 'pending'
          disabled={menu?.status !== 'available' && menu?.status !== 'pending'}
          onClick={() => {
            // Navigate to the respective path based on the menu label
            if (menu?.label === 'Dashboard') {
              navigate('/') // Navigate to the homepage for 'Dashboard'
            } else {
              navigate(`/${convertToSlug(menu?.label)}`) // Navigate using the slugified label
            }
          }}
          className={clsx(
            // Apply classes for styling, including hover and disabled states
            'group flex items-center gap-16 px-16 py-16 disabled:cursor-not-allowed disabled:bg-opacity-80 disabled:text-white disabled:text-opacity-50',
            {
              // Apply a background for the active menu item
              'bg-white bg-opacity-10':
                convertToSlug(menu?.label) === firstPathname ||
                (menu?.label === 'Dashboard' && firstPathname === ''),
            },
          )}
        >
          {/* Menu icon with hover transition effect */}
          <span className="transition-all duration-300 group-hover:text-white group-hover:text-opacity-50">
            {menu?.icon}
          </span>
          <div className="flex items-center gap-16">
            {/* Menu label with hover transition effect */}
            <p className="transition-all duration-300 group-hover:text-white group-hover:text-opacity-50">
              {menu?.label}
            </p>
            {/* If the menu item is not 'available', show the status */}
            {menu?.status !== 'available' && (
              <p
                className={clsx(
                  // Style the status label with different colors based on the status
                  'flex-1 rounded-2xl px-8 py-2 font-inter text-[1.4rem]',
                  {
                    'bg-indigo-500': menu?.status === 'pending',
                    'bg-orange-500': menu?.status === 'coming-soon',
                    'bg-rose-500': menu?.status === 'unavailable',
                    'bg-sky-500': menu?.status === 'beta',
                  },
                )}
              >
                {/* Display the human-readable status text */}
                {convertSlugToText(menu?.status)}
              </p>
            )}
          </div>
        </button>
      ))}
    </div>
  )
}
