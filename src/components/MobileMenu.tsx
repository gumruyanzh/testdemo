import { Link, useLocation } from 'react-router-dom'
import { useMobileMenuStore } from '../store/useMobileMenuStore'
import { useEffect } from 'react'

interface MobileMenuProps {
  links: Array<{ to: string; label: string }>
}

export default function MobileMenu({ links }: MobileMenuProps) {
  const { isOpen, close } = useMobileMenuStore()
  const location = useLocation()

  useEffect(() => {
    close()
  }, [location.pathname, close])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 md:hidden"
        onClick={close}
        aria-hidden="true"
      />

      {/* Menu Panel */}
      <div className="fixed top-16 left-0 right-0 bottom-0 bg-white z-40 md:hidden overflow-y-auto">
        <nav className="container-responsive py-4">
          <div className="flex flex-col space-y-2">
            {links.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                  location.pathname === to
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </>
  )
}
