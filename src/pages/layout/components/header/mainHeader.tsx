import { useNetwork } from '@/hooks/useNetwork'
import { setStateMode } from '@/store/reducer/stateMode'
import { CloudMoon, CloudSun, Fuel } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'
import { useDispatch } from 'react-redux'
import { HeaderNetwork } from './headerNetwork'
import { HeaderProfile } from './headerProfile'
import { ListNetwork } from '@/data/listNetwork'

/**
 * MainHeader component serves as the main header of the application.
 * It displays information such as the current network, price, fuel cost,
 * and provides options for changing the theme (dark/light) and selecting networks.
 *
 * @param {string} mode - The current theme mode (either 'DARK' or 'LIGHT').
 * @param {Dispatch<SetStateAction<string>>} setMode - Function to set the theme mode.
 * @returns {JSX.Element} - The MainHeader component.
 */
export function MainHeader({
  mode,
  setMode,
}: {
  mode: string
  setMode: Dispatch<SetStateAction<string>>
}) {
  // Redux dispatch to update global state
  const dispatch = useDispatch()

  // Custom hook to get and set the current network
  const { network, setNetwork } = useNetwork()

  // Find the data for the current network from the list
  const dataNetwork = ListNetwork?.find((item) => item?.value === network)

  return (
    <div className="flex w-full items-center gap-32 border-b pb-16">
      {/* Left section displaying network information */}
      <div className="flex flex-1 items-center gap-16">
        <div className="flex items-center gap-8">
          <img
            src={dataNetwork?.icon} // Display the network icon
            alt={dataNetwork?.label}
            loading="eager"
            className="h-[2.4rem] w-[2.4rem]"
          />
          <p>
            <span className="uppercase">{dataNetwork?.coin}</span> Price:{' '}
            <span className="font-montserrat">$NaN</span>{' '}
            {/* Price placeholder */}
          </p>
        </div>
        <div className="flex items-center gap-8">
          <Fuel size={14} /> {/* Fuel icon */}
          <p className="font-montserrat">NaN Gwei</p>{' '}
          {/* Fuel cost placeholder */}
        </div>
      </div>

      {/* Right section displaying profile, theme toggle, and network selection */}
      <div className="flex items-center gap-16">
        <HeaderProfile /> {/* Profile header component */}
        {/* Theme toggle button */}
        <span
          onClick={() => {
            // Toggle between light and dark modes
            if (mode === 'DARK') {
              setMode('LIGHT')
              dispatch(setStateMode({ isDark: 'LIGHT' }))
            } else if (mode === 'LIGHT') {
              setMode('DARK')
              dispatch(setStateMode({ isDark: 'DARK' }))
            } else {
              setMode('LIGHT')
              dispatch(setStateMode({ isDark: 'LIGHT' }))
            }
          }}
          className="flex h-[5.2rem] w-[5.2rem] items-center justify-center rounded-2xl border border-slate-300 transition-colors duration-300 hover:cursor-pointer hover:bg-slate-300 hover:text-slate-700"
        >
          {mode === 'DARK' ? <CloudSun size={16} /> : <CloudMoon size={16} />}
          {/* Display the appropriate icon based on current theme mode */}
        </span>
        {/* Network selection component */}
        <HeaderNetwork
          listNetwork={ListNetwork} // List of available networks
          dataNetwork={dataNetwork} // Data for the current network
          setNetwork={setNetwork} // Function to update the selected network
        />
      </div>
    </div>
  )
}
