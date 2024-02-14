'use client'

import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import { FC } from 'react'
import { LiveBadge } from './LiveBage'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Skeleton } from './ui/skeleton'

interface IUserAvatar extends VariantProps<typeof avatarSizes> {
	imgUrl: string
	username: string
	isLive?: boolean
	showBadge?: boolean
}

const avatarSizes = cva('', {
	variants: {
		size: {
			default: 'h-8 w-8',
			lg: 'h-14 w-14',
		},
	},
	defaultVariants: {
		size: 'default',
	},
})

const UserAvatar: FC<IUserAvatar> = ({
	imgUrl,
	username,
	isLive,
	showBadge,
	size,
}) => {
	const canShowBadge = showBadge && isLive

	return (
		<div className='relative'>
			<Avatar
				className={cn(
					isLive && 'ring-2 ring-rose-500 border border-background',
					avatarSizes({ size })
				)}
			>
				<AvatarImage src={imgUrl} className='object-cover' />
				<AvatarFallback>
					{username[0]}
					{username[username.length - 1]}
				</AvatarFallback>
			</Avatar>
			{canShowBadge && (
				<div className='absolute -bottom-3 left-1/2 transform -translate-x-1/2'>
					<LiveBadge />
				</div>
			)}
		</div>
	)
}

export default UserAvatar

interface IUserAvatarSkeleton extends VariantProps<typeof avatarSizes> {}

export const UserAvatarSkeleton = ({ size }: IUserAvatarSkeleton) => {
	return <Skeleton className={cn('rounded-full', avatarSizes({ size }))} />
}
