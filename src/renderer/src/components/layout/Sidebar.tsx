import React, { createContext, useContext, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, ChevronLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NavLink } from 'react-router-dom'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface SidebarContextProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  animate: boolean
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined)

export const useSidebar = (): SidebarContextProps => {
  const ctx = useContext(SidebarContext)
  if (!ctx) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return ctx
}

export function SidebarProvider({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true
}: {
  children: React.ReactNode
  open?: boolean
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
  animate?: boolean
}) {
  const [openState, setOpenState] = useState(true)

  const open = openProp !== undefined ? openProp : openState
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate }}>
      {children}
    </SidebarContext.Provider>
  )
}

export function Sidebar({
  children,
  open,
  setOpen,
  animate
}: {
  children: React.ReactNode
  open?: boolean
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
  animate?: boolean
}) {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  )
}

export function SidebarBody({ className, children }: { className?: string; children?: React.ReactNode }) {
  return (
    <>
      <DesktopSidebar className={className}>{children as React.ReactNode}</DesktopSidebar>
      <MobileSidebar className={className}>{children as React.ReactNode}</MobileSidebar>
    </>
  )
}

interface DesktopSidebarProps {
  className?: string
  children?: React.ReactNode
}

export function DesktopSidebar({
  className,
  children
}: DesktopSidebarProps) {
  const { open, setOpen, animate } = useSidebar()
  return (
    <motion.div
      className={cn(
        'h-full px-4 pt-0 pb-4 hidden md:flex md:flex-col bg-transparent text-foreground/80 w-[240px] flex-shrink-0 overflow-visible relative group/sidebar',
        className
      )}
      animate={{ width: animate ? (open ? '240px' : '72px') : '240px' }}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={() => setOpen(!open)}
            className={cn(
              'absolute -right-5 top-1/2 -translate-y-1/2 z-50 h-10 w-10 rounded-full border bg-background shadow-md flex items-center justify-center text-foreground hover:bg-accent transition-transform duration-300',
              !open && 'rotate-180'
            )}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>{open ? '收起' : '展开'}</p>
        </TooltipContent>
      </Tooltip>
      {children}
    </motion.div>
  )
}

export function MobileSidebar({
  className,
  children,
  ...props
}: React.ComponentProps<'div'>) {
  const { open, setOpen } = useSidebar()
  return (
    <>
      <div
        className={cn(
          'h-10 px-4 py-4 flex flex-row md:hidden items-center justify-between bg-sidebar text-sidebar-foreground w-full'
        )}
        {...props}
      >
        <div className="flex justify-end z-20 w-full">
          <Menu
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ x: '-100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '-100%', opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className={cn(
                'fixed h-full w-full inset-0 bg-sidebar text-sidebar-foreground p-10 z-[100] flex flex-col justify-between',
                className
              )}
            >
              <div
                className="absolute right-10 top-10 z-50 cursor-pointer"
                onClick={() => setOpen(!open)}
              >
                <X />
              </div>
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}

export interface SidebarLinkItem {
  label: string
  href?: string
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
  icon: React.JSX.Element | React.ReactNode
}

export function SidebarLink({
  link,
  className,
  ...props
}: {
  link: SidebarLinkItem
  className?: string
  props?: React.AnchorHTMLAttributes<HTMLAnchorElement>
}) {
  const { open } = useSidebar()

  const LinkContent = (
    <NavLink
      to={link.href?.replace(/^#/, '') || '/'}
      className={() => cn('block w-full', className)}
      {...(props as any)}
    >
      {({ isActive }) => (
        <motion.div
          initial={false}
          animate={{
            backgroundColor: isActive ? 'rgba(99,102,241,0.20)' : 'rgba(99,102,241,0)',
          }}
          whileHover={isActive ? {} : { backgroundColor: 'rgba(99,102,241,0.12)' }}
          transition={{ type: 'spring', stiffness: 260, damping: 24 }}
          className={cn(
            'relative rounded-md w-full overflow-visible px-2 py-2',
            'text-foreground/80 hover:text-foreground'
          )}
        >
          <motion.div
            className="grid items-center gap-2"
            style={{ gridTemplateColumns: open ? '24px 1fr' as any : '24px 0px' as any }}
            whileHover={isActive ? {} : { scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <span className="text-inherit opacity-80 group-hover/sidebar:opacity-100 transition-opacity duration-200">
                {link.icon}
              </span>
            </div>
            <div className={cn('overflow-hidden', open ? 'w-auto flex-1' : 'w-0')}>
              <span
                className={cn(
                  'text-sm whitespace-nowrap inline-block !p-0 !m-0 transition-opacity duration-200',
                  open ? 'opacity-100' : 'opacity-0'
                )}
              >
                {link.label}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </NavLink>
  )

  return !open ? (
    <Tooltip>
      <TooltipTrigger asChild>{LinkContent}</TooltipTrigger>
      <TooltipContent side="right">
        <p>{link.label}</p>
      </TooltipContent>
    </Tooltip>
  ) : (
    LinkContent
  )
}


