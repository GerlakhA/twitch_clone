'use client'

import { useSidebar } from '@/store/use-sidebar'
import { User } from '@prisma/client'
import { FC } from 'react'
import UserItem, { UserItemSkeleton } from './UserItem'

interface IRecommended {
	data: (User & {
		stream: { isLive: boolean } | null
	})[]
}

const Recommended: FC<IRecommended> = ({ data }) => {
	const { collapsed } = useSidebar(state => state)
	const showlabel = !collapsed && data.length > 0
	return (
		<div>
			{showlabel && (
				<div className='pl-6 mb-4'>
					<p className='text-neutral-400'>Recommended</p>
				</div>
			)}
			<ul className='space-y-2 px-2'>
				{data.map(item => (
					<UserItem key={item.id} data={item} isLive={item.stream?.isLive} />
				))}
			</ul>
		</div>
	)
}

export default Recommended

export const RecommendedSkeleton = () => {
	return (
		<ul className='px-2'>
			{[...Array(3)].map((_, i) => (
				<UserItemSkeleton key={i} />
			))}
		</ul>
	)
}
