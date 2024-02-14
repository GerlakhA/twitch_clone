'use client'

import { LiveBadge } from '@/components/LiveBage'
import UserAvatar from '@/components/UserAvatar'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { useSidebar } from '@/store/use-sidebar'
import { User } from '@prisma/client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface IUserItem {
	data: User
	isLive: boolean | undefined
}

const UserItem: React.FC<IUserItem> = ({ data, isLive }) => {
	const pathname = usePathname()
	const { collapsed } = useSidebar(state => state)

	const href = `/${data.username}`
	const isActive = pathname === href

	return (
		<Button
			asChild
			variant={'ghost'}
			className={cn(
				'w-full h-12',
				collapsed ? 'justify-center' : 'justify-start',
				isActive && 'bg-accent'
			)}
		>
			<Link href={href}>
				<div
					className={cn(
						'flex items-center gap-x-4 w-full',
						collapsed && 'justify-center'
					)}
				>
					<UserAvatar
						imgUrl={data.imgUrl}
						username={data.username}
						isLive={isLive}
					/>
					{!collapsed && <p className='truncate'>{data.username}</p>}
					{!collapsed && isLive && <LiveBadge className='ml-auto' />}
				</div>
			</Link>
		</Button>
	)
}

export default UserItem

export const UserItemSkeleton = () => {
	return (
		<li className='flex items-center gap-x-4 px-3 py-2'>
			<Skeleton className='min-h-[32px] min-w-[32px] rounded-full' />
			<div className='flex-1'>
				<Skeleton className='h-6' />
			</div>
		</li>
	)
}
