import { ThemeProvider } from '@/components/theme-provider'
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'sonner'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'GameHub',
	description: 'The best streaming services',
	icons: '/spooky.svg',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<ClerkProvider
			appearance={{
				baseTheme: dark,
			}}
		>
			<html lang='en'>
				<body className={inter.className}>
					<ThemeProvider
						attribute='class'
						forcedTheme='dark'
						storageKey='twitch-clone-theme'
					>
						<Toaster theme='dark' position='bottom-center' />
						{children}
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	)
}
