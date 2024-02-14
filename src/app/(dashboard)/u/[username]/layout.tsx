import { getSelfByUsername } from '@/lib/auth-service'
import { redirect } from 'next/navigation'
import React, { FC } from 'react'
import { Container } from './_components/Container'
import Navbar from './_components/navbar'
import Sidebar from './_components/sidebar'

interface IDashboardLayout {
	children: React.ReactNode
	params: { username: string }
}

const DashboardLayout: FC<IDashboardLayout> = async ({ children, params }) => {
	const self = await getSelfByUsername(params.username)

	if (!self) {
		redirect('/')
	}

	return (
		<>
			<Navbar />
			<div className='flex h-full pt-20'>
				<Sidebar />
				<Container>{children}</Container>
			</div>
		</>
	)
}

export default DashboardLayout
