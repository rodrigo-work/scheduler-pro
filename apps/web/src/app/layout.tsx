import ThemeProvider from '@/components/layout/ThemeToggle/theme-provider'
import Providers from '@/components/providers'
import { SETTINGS } from '@/constants/data'
import { fontVariables } from '@/lib/font'
import { cn } from '@/lib/utils'
// import { Toaster } from '@repo/ui/components/sonner'
import '@repo/ui/styles/globals.css'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata, Viewport } from 'next'
import { cookies } from 'next/headers'
import NextTopLoader from 'nextjs-toploader'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { Toaster } from 'sonner'

const META_THEME_COLORS = {
  light: '#ffffff',
  dark: '#09090b'
}

export const metadata: Metadata = {
  title: {
    default: SETTINGS.TITLE,
    template: `%s | ${SETTINGS.TITLE}`
  },
  description: SETTINGS.DESCRIPTION
}

export const viewport: Viewport = {
  themeColor: META_THEME_COLORS.light
}

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  // await new Promise((resolve) => setTimeout(resolve, 3000))

  const cookieStore = await cookies()
  // const cookieIDP = cookieStore.get('id_token')?.value ?? ''
  const activeThemeValue = cookieStore.get('active_theme')?.value
  const isScaled = activeThemeValue?.endsWith('-scaled')

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.querySelector('meta[name="theme-color"]').setAttribute('content', '${META_THEME_COLORS.dark}')
                }
              } catch (_) {}
            `
          }}
        />
      </head>
      <body
        className={cn(
          'bg-background overflow-hidden overscroll-none font-sans antialiased',
          activeThemeValue ? `theme-${activeThemeValue}` : '',
          isScaled ? 'theme-scaled' : '',
          fontVariables
        )}
      >
        <NextTopLoader showSpinner={false} />
        <NuqsAdapter>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            enableColorScheme
          >
            <Providers
              // cookieIDP={cookieIDP}
              activeThemeValue={activeThemeValue as string}
            >
              {children}
              <Toaster position="bottom-right" />
              <SpeedInsights />
              <Analytics />
            </Providers>
          </ThemeProvider>
        </NuqsAdapter>
      </body>
    </html>
  )
}
