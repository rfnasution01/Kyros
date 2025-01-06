import { MenubarCustom } from '@/components/menubar/menubarCustom'
import { ListNetworkType } from '@/data/listNetwork'
import { setStateNetwork } from '@/store/reducer/stateNetwork'
import clsx from 'clsx'
import { Dispatch, SetStateAction, useState } from 'react'
import { useDispatch } from 'react-redux'

/**
 * HeaderNetwork component displays a network selection menu in the header.
 *
 * This component allows users to choose a network from a list. It also handles
 * opening and closing the menu, and updates both the local state and Redux store
 * with the selected network.
 *
 * @param {Object} props - Component properties
 * @param {Dispatch<SetStateAction<string>>} props.setNetwork - Function to update the local network state.
 * @param {ListNetworkType} props.dataNetwork - The currently selected network data.
 * @param {ListNetworkType[]} props.listNetwork - List of available networks to choose from.
 *
 * @returns {JSX.Element} - The HeaderNetwork component.
 */
export function HeaderNetwork({
  setNetwork,
  dataNetwork,
  listNetwork,
}: {
  setNetwork: Dispatch<SetStateAction<string>> // Function to update local network state
  dataNetwork: ListNetworkType // Current network data
  listNetwork: ListNetworkType[] // List of available networks
}) {
  // Redux dispatcher to update the global state
  const dispacth = useDispatch()

  // State for managing the open/close status of the network menu
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  /**
   * Handle the closing of the network selection menu.
   */
  const handleMenuClose = () => {
    setIsMenuOpen(false)
  }

  /**
   * Handle the opening of the network selection menu.
   */
  const handleMenuOpen = () => {
    setIsMenuOpen(true)
  }

  return (
    <MenubarCustom
      // Pass menu open state and handlers to the MenubarCustom component
      isMenuOpen={isMenuOpen}
      handleMenuClose={handleMenuClose}
      handleMenuOpen={handleMenuOpen}
      // Trigger element (network icon) that opens the menu when clicked
      trigger={
        <span className="flex h-[5.2rem] w-[5.2rem] items-center justify-center rounded-2xl border border-slate-300 transition-colors duration-300 hover:cursor-pointer hover:bg-slate-300">
          <img
            src={dataNetwork?.icon} // Display the icon of the selected network
            alt={dataNetwork?.value} // Alt text for the image
            className="h-[2.8rem] w-[2.8rem] rounded-lg"
            loading="eager" // Eager loading for better performance
          />
        </span>
      }
      // Content for the menu (list of networks to select from)
      content={
        <div className="flex flex-col gap-16 p-4">
          <p className="border-b pb-16">Choose Network</p>{' '}
          {/* Title for the menu */}
          <div className="flex flex-col gap-16">
            {/* Map over the available networks and display each one */}
            {listNetwork?.map((network, idx) => (
              <div
                key={idx}
                onClick={() => {
                  // Update the selected network both locally and globally (Redux)
                  setNetwork(network?.value)
                  dispacth(setStateNetwork({ networkName: network?.value }))
                }}
                className="group flex items-center gap-12 hover:cursor-pointer"
              >
                <img
                  src={network?.icon} // Network icon
                  alt={network?.label} // Alt text for the icon
                  loading="lazy" // Lazy load the icons
                  className="h-[2.4rem] w-[2.4rem]"
                />
                <p
                  className={clsx('group-hover:text-accent', {
                    // Highlight the selected network label
                    'text-accent': network?.value === dataNetwork?.value,
                  })}
                >
                  {network?.label} {/* Display the network label */}
                </p>
              </div>
            ))}
          </div>
        </div>
      }
      // Menu positioning and custom styles
      position="left"
      custom="top-[1rem] -right-[5rem]"
    />
  )
}
