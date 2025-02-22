'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { LogoutButton } from '@/components/auth/LogoutButton'
import { Button } from '@/components/ui/Button'

export function Navbar() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const isAuthPage = pathname.startsWith('/auth')
  const isDashboardPage = pathname.startsWith('/dashboard')
  const isInvitePage = pathname.startsWith('/invite')

  // Preserve search params for auth links
  const authSearchParams = new URLSearchParams({
    ...(searchParams.get('invite') && { invite: searchParams.get('invite')! }),
    ...(searchParams.get('org') && { org: searchParams.get('org')! }),
    ...(searchParams.get('email') && { email: searchParams.get('email')! })
  })

  const searchParamsString = authSearchParams.toString()
  const queryString = searchParamsString ? `?${searchParamsString}` : ''

  // Don't render navbar on dashboard or invite pages
  if (isDashboardPage || isInvitePage) return null

  return (
    <nav className="border-b border-border">
      <div className="flex h-16 items-center px-4 max-w-7xl mx-auto justify-between">
        <Link href="/" className="font-semibold text-foreground">
          SaaS Boilerplate
        </Link>

        <div className="flex items-center gap-4">
          {isAuthPage ? null : (
            <>
              {pathname === '/' ? (
                <>
                  <Link href={`/auth/login${queryString}`}>
                    <Button 
                      variant="glass" 
                      size="md"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link href={`/auth/signup${queryString}`}>
                    <Button
                      variant="glass"
                      size="md"
                    >
                      Sign Up
                    </Button>
                  </Link>
                </>
              ) : (
                <LogoutButton />
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  )
} 