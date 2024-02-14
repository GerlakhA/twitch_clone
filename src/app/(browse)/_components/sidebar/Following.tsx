'use client'

import { useSidebar } from '@/store/use-sidebar'
import { Follow, User } from '@prisma/client'
import { FC } from 'react'
import UserItem, { UserItemSkeleton } from './UserItem'

interface IFollowing {
	data: (Follow & {
		following: User & {
			stream: { isLive: boolean } | null
		}
	})[]
}

const Following: FC<IFollowing> = ({ data }) => {
	const { collapsed } = useSidebar(state => state)
	if (!data.length) {
		return null
		// (
		// 	<p className='text-neutral-400 flex justify-center items-center'>
		// 		you don't follow anyone
		// 	</p>
		// )
	}
	return (
		<div>
			{!collapsed && (
				<div className='pl-6 mb-4'>
					<p className='text-neutral-400'>Following</p>
				</div>
			)}
			<ul className='space-y-2 px-2'>
				{data.map(item => (
					<UserItem
						key={item.following.id}
						data={item.following}
						isLive={item.following.stream?.isLive}
					/>
				))}
			</ul>
		</div>
	)
}

export default Following

export const FollowingSkeleton = () => {
	return (
		<ul className='px-2 pt-2 lg:pt-0'>
			{[...Array(3)].map((_, i) => (
				<UserItemSkeleton key={i} />
			))}
		</ul>
	)
}
