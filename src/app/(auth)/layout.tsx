import HeaderAuth from '@/app/(auth)/_components/HeaderAuth'

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className='flex h-full flex-col justify-center items-center gap-y-4'>
			<HeaderAuth />
			{children}
		</div>
	)
}
