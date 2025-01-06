import * as React from 'react'
import * as MenubarPrimitive from '@radix-ui/react-menubar'

import { VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/cn'
import { buttonVariants } from '@/components/buttonVariants'
import { Check, ChevronRight, Circle } from 'lucide-react'

// Initialize Menubar components from Radix UI
const MenubarMenu = MenubarPrimitive.Menu
const MenubarGroup = MenubarPrimitive.Group
const MenubarPortal = MenubarPrimitive.Portal
const MenubarSub = MenubarPrimitive.Sub
const MenubarRadioGroup = MenubarPrimitive.RadioGroup

// Menubar component wraps Radix Menubar with custom styling
const Menubar = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>
>(({ className, ...props }, ref) => {
  // Styling variants for different parts of the menubar
  const classFirst = `firstButtonGroup:rounded-tr-none firstButtonGroup:rounded-br-none`
  const classMiddle = `middleButtonGroup:rounded-none middleButtonGroup[:not(:hover)]:border-l-0`
  const classLast = `lastButtonGroup:rounded-tl-none lastButtonGroup:rounded-bl-none lastButtonGroup[:not(:hover)]:border-l-0`

  // More specific styling for inner divs of menubar items
  const classFirstInnerDiv = ` [&>:first-child:not(:only-child)>button]:rounded-tr-none [&>:first-child:not(:only-child)>button]:rounded-br-none`
  const classMiddleInnerDiv = ` [&>:not(:first-child):not(:last-child)>button]:rounded-none [&>:not(:first-child):not(:last-child)>button]:border-l-0`
  const classLastInnerDiv = ` [&>:last-child:not(:only-child)>button]:rounded-tl-none [&>:last-child:not(:only-child)>button]:rounded-bl-none [&>:last-child:not(:only-child)>button]:border-l-0`

  return (
    <MenubarPrimitive.Root
      ref={ref}
      className={cn(
        [
          'h-10 flex items-center bg-transparent', // base menubar styling
          classFirst,
          classMiddle,
          classLast,
          classFirstInnerDiv,
          classMiddleInnerDiv,
          classLastInnerDiv,
        ].join(' '),
        className, // accepts additional class names for customization
      )}
      {...props} // spread remaining props to Menubar
    />
  )
})
Menubar.displayName = MenubarPrimitive.Root.displayName

// Define the trigger props for MenubarTrigger with custom variants
export interface menubarTriggerProps
  extends React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

// MenubarTrigger component for triggering the menu
const MenubarTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Trigger>,
  menubarTriggerProps
>(({ variant, size, colorVariant, layout, className, ...props }, ref) => (
  <MenubarPrimitive.Trigger
    ref={ref}
    className={cn(
      buttonVariants({ variant, colorVariant, layout, size, className }), // applying button styling
    )}
    {...props}
  />
))
MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName

// MenubarSubTrigger allows to trigger submenus, with optional inset for positioning
const MenubarSubTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <MenubarPrimitive.SubTrigger
    ref={ref}
    className={cn(
      'py-1.5 text-sm focus:text-accent-foreground data-[state=open]:text-accent-foreground flex cursor-default select-none items-center rounded-sm px-2 outline-none focus:bg-accent data-[state=open]:bg-accent',
      inset && 'pl-8', // optional inset styling
      className,
    )}
    {...props}
  >
    {children} {/* Render submenu trigger content */}
    <ChevronRight size={16} /> {/* Right arrow icon */}
  </MenubarPrimitive.SubTrigger>
))
MenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName

// MenubarSubContent for displaying content of submenus with animations
const MenubarSubContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.SubContent
    ref={ref}
    className={cn(
      'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] overflow-hidden rounded-md border p-1',
      className,
    )}
    {...props}
  />
))
MenubarSubContent.displayName = MenubarPrimitive.SubContent.displayName

// MenubarContent displays main menu content with position and animation effects
const MenubarContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>
>(
  (
    { className, align = 'start', alignOffset = -4, sideOffset = 8, ...props },
    ref,
  ) => (
    <MenubarPrimitive.Portal>
      <MenubarPrimitive.Content
        ref={ref}
        align={align} // align content according to parent
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn(
          'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[12rem] overflow-hidden rounded-2xl border p-1 shadow-md',
          className,
        )}
        {...props}
      />
    </MenubarPrimitive.Portal>
  ),
)
MenubarContent.displayName = MenubarPrimitive.Content.displayName

// MenubarItem represents an individual item in the menubar
const MenubarItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Item
    ref={ref}
    className={cn(
      'py-1.5 text-sm focus:text-accent-foreground relative flex cursor-default select-none items-center rounded-3x px-2 outline-none focus:bg-accent data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      inset && 'pl-8', // optional inset styling
      className,
    )}
    {...props}
  />
))
MenubarItem.displayName = MenubarPrimitive.Item.displayName

// MenubarCheckboxItem is a checkbox item in the menubar
const MenubarCheckboxItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <MenubarPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      'py-1.5 text-sm focus:text-accent-foreground relative flex cursor-default select-none items-center rounded-sm pl-8 pr-2 outline-none focus:bg-accent data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className,
    )}
    checked={checked} // control checkbox checked state
    {...props}
  >
    <span className="h-3.5 w-3.5 absolute left-2 flex items-center justify-center">
      <MenubarPrimitive.ItemIndicator>
        <Check size={16} /> {/* Check icon for selected items */}
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children} {/* Render checkbox item content */}
  </MenubarPrimitive.CheckboxItem>
))
MenubarCheckboxItem.displayName = MenubarPrimitive.CheckboxItem.displayName

// MenubarRadioItem represents a radio item in the menubar
const MenubarRadioItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <MenubarPrimitive.RadioItem
    ref={ref}
    className={cn(
      'py-1.5 text-sm focus:text-accent-foreground relative flex cursor-default select-none items-center rounded-sm pl-8 pr-2 outline-none focus:bg-accent data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className,
    )}
    {...props}
  >
    <span className="h-3.5 w-3.5 absolute left-2 flex items-center justify-center">
      <MenubarPrimitive.ItemIndicator>
        <Circle size={16} /> {/* Circle icon for radio items */}
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children} {/* Render radio item content */}
  </MenubarPrimitive.RadioItem>
))
MenubarRadioItem.displayName = MenubarPrimitive.RadioItem.displayName

// MenubarLabel is used to label groups of menu items
const MenubarLabel = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Label
    ref={ref}
    className={cn('py-1.5 text-sm px-2', inset && 'pl-8', className)} // optional inset styling
    {...props}
  />
))
MenubarLabel.displayName = MenubarPrimitive.Label.displayName

// MenubarSeparator creates a divider between menu items
const MenubarSeparator = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Separator
    ref={ref}
    className={cn('h-px bg-muted -mx-1 my-1', className)} // separator style
    {...props}
  />
))
MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName

// MenubarShortcut provides a visual shortcut label for menu items
const MenubarShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => (
  <span
    className={cn(
      'text-xs tracking-widest text-muted-foreground ml-auto',
      className,
    )}
    {...props}
  />
)
MenubarShortcut.displayname = 'MenubarShortcut'

// Export all components for use
export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarPortal,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarGroup,
  MenubarSub,
  MenubarShortcut,
}
