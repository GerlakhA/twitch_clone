'use client'

import { cn } from '@/lib/utils'
import { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Skeleton } from '../ui/skeleton'
import ChatInfo from './ChatInfo'

interface IChatForm {
	isFollowing: boolean
	isChatFollowersOnly: boolean
	isChatDelayed: boolean
	isHidden: boolean
	value: string
	onChange: (value: string) => void
	onSubmit: () => void
}

const ChatForm = ({
	isChatDelayed,
	isFollowing,
	isChatFollowersOnly,
	isHidden,
	onChange,
	onSubmit,
	value,
}: IChatForm) => {
	const [isDelayedBlocked, setIsDelayedBlocked] = useState(false)
	const isFollowersOnly = isChatFollowersOnly && !isFollowing
	const isDisabled = isHidden || isDelayedBlocked || isFollowersOnly

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		e.stopPropagation()

		if (!value || isDisabled) return

		if (isChatDelayed && !isDelayedBlocked) {
			setIsDelayedBlocked(true)

			setTimeout(() => {
				setIsDelayedBlocked(false)
				onSubmit()
			}, 3000)
		} else {
			onSubmit()
		}
	}

	if (isHidden) return null

	return (
		<form
			onSubmit={handleSubmit}
			className='flex flex-col gap-y-4 items-center p-3'
		>
			<div className='w-full'>
				<ChatInfo
					isDelayed={isChatDelayed}
					isFollowersOnly={isChatFollowersOnly}
				/>
				<Input
					onChange={e => onChange(e.target.value)}
					value={value}
					disabled={isDisabled}
					placeholder='Send a message'
					className={cn(
						'border-white/10',
						isChatFollowersOnly && 'border-t-0 rounded-t-none'
					)}
				/>
			</div>
			<div>
				<Button
					type='submit'
					variant={'primary'}
					size={'sm'}
					disabled={isDisabled}
				>
					Chat
				</Button>
			</div>
		</form>
	)
}

export default ChatForm

export const ChatFormSkeleton = () => {
	return (
		<div className='flex flex-col items-center gap-y-4 p-3'>
			<Skeleton className='w-full h-10' />
			<div className='flex items-center gap-x-2 ml-auto'>
				<Skeleton className='h-7 w-7' />
				<Skeleton className='h-7 w-12' />
			</div>
		</div>
	)
}
