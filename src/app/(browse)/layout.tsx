import { Suspense } from 'react'
import Container from './_components/Container'
import Navbar from './_components/navbar'
import Sidebar from './_components/sidebar'
import { RecommendedSkeleton } from './_components/sidebar/Recommended'

export default function BrowseLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<>
			<Navbar />
			<div className='h-full flex pt-20'>
				<Suspense fallback={<RecommendedSkeleton />}>
					<Sidebar />
				</Suspense>
				<Container>{children}</Container>
			</div>
		</>
	)
}
