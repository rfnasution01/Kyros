import { Dispatch, ReactNode, SetStateAction } from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/dialog/dialog'
import { X } from 'lucide-react'
import { useMode } from '@/hooks/useMode'

// A customizable dialog component that allows for various configurations
export function DialogCustom({
  isOpen, // Boolean that determines if the dialog is open or closed
  setIsOpen, // A function to control the dialog's open/close state
  buttonContent, // Optional custom button content to be displayed at the bottom
  headerTitle, // Title for the dialog header
  textContent, // Main text content of the dialog
  isAuto, // Determines if the width is set to auto or a fixed value
  width, // Custom width for the dialog (overrides default settings)
  isMobile, // Boolean to adjust the dialog size for mobile devices
  classNameHeader, // Custom class for the dialog header section
  className, // Custom class for the dialog content section
  position = 'middle', // Position of the dialog on the screen ('bottom', 'middle', 'left', 'right', 'top')
  disableOutsideDialog = true, // Prevent closing dialog when clicking outside
}: {
  isOpen: boolean // Boolean that determines if the dialog is open or closed
  setIsOpen: Dispatch<SetStateAction<boolean>> // Function to control the dialog's open/close state
  buttonContent?: ReactNode // Optional custom button content to be displayed at the bottom
  headerTitle?: ReactNode // Title for the dialog header
  textContent?: ReactNode // Main text content of the dialog
  isAuto?: boolean // Determines if the width is set to auto or a fixed value
  width?: string // Custom width for the dialog (overrides default settings)
  isMobile?: boolean // Boolean to adjust the dialog size for mobile devices
  classNameHeader?: string // Custom class for the dialog header section
  className?: string // Custom class for the dialog content section
  position?: 'bottom' | 'middle' | 'left' | 'right' | 'top' // Position of the dialog on the screen
  disableOutsideDialog?: boolean // Prevent closing dialog when clicking outside
}) {
  // Use the custom hook to get the current theme mode (light or dark)
  const { mode } = useMode()

  return (
    // Radix UI Dialog Root component, controls the dialog state
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {/* Dialog content section with dynamic styles based on props */}
      <DialogContent
        className={`scrollbar overflow-y-autotext-[2rem] flex flex-col border ${mode === 'DARK' ? 'bg-dark-100 text-white' : 'bg-white'} phones:text-[2.4rem] ${className}`}
        position={position} // Position prop passed to DialogContent
        style={{
          width: isAuto ? 'auto' : isMobile ? '90%' : width ? width : '30%', // Width adjustments based on props
          maxHeight: '80vh', // Limit the max height of the dialog to 80% of the viewport height
        }}
        onInteractOutside={(event) => {
          // Prevent closing the dialog when clicking outside if disableOutsideDialog is true
          if (disableOutsideDialog) {
            event?.preventDefault()
          }
        }}
      >
        <div className="scrollbar flex h-full flex-col gap-32 overflow-y-auto p-32">
          {/* --- Header Section --- */}
          <DialogHeader>
            <DialogTitle
              className={`text-[2.2rem] font-bold phones:text-[2.6rem] ${classNameHeader ?? 'text-center'}`}
            >
              {headerTitle} {/* Display header title */}
            </DialogTitle>
            {/* Close button with an icon */}
            <DialogPrimitive.Close className="focus:ring-ring data-[state=open]:text-muted-foreground absolute right-32 top-32 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent">
              <X size={16} /> {/* Close icon from lucide-react */}
              <span className="sr-only">Close</span>{' '}
              {/* Screen reader accessibility text */}
            </DialogPrimitive.Close>
          </DialogHeader>

          {/* --- Content Section --- */}
          <div className="scrollbar flex h-full w-full flex-1 overflow-y-auto text-[2rem] phones:text-[2.4rem]">
            {textContent} {/* Display main content */}
          </div>

          {/* Optional button content section */}
          {buttonContent}
        </div>
      </DialogContent>
    </Dialog>
  )
}
