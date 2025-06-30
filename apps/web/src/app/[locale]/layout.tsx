import ThemeProvider from '@/components/layout/ThemeToggle/theme-provider'
import Providers from '@/components/providers'
import { SETTINGS } from '@/constants/data'
import { fontVariables } from '@/lib/font'
import { cn } from '@/lib/utils'
import '@repo/design-system/styles/globals.css'
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

type RootLayoutProps = {
  readonly children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const cookieStore = await cookies()
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
            <Providers activeThemeValue={activeThemeValue as string}>
              {children}
              <Toaster position="bottom-right" />
            </Providers>
          </ThemeProvider>
        </NuqsAdapter>
      </body>
    </html>
  )
}
