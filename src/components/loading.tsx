// Import the loading GIF asset
import ImgLoading from '@/assets/img/loading.gif'

/**
 * Loading Component
 * Displays a loading spinner or GIF centered in the viewport.
 *
 * @returns {JSX.Element} - A centered loading indicator.
 */
export function Loading() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      {/* Render the loading GIF with eager loading for faster display */}
      <img src={ImgLoading} alt="Loading" loading="eager" className="w-1/6" />
    </div>
  )
}
