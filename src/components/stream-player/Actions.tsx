'use client'

import { onFollow, onUnfollow } from '@/actions/follow'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { useAuth } from '@clerk/nextjs'
import { Heart } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { toast } from 'sonner'

interface IActions {
	isHost: boolean
	hostIdentity: string
	isFollowing: boolean
}

export const Actions = ({ hostIdentity, isHost, isFollowing }: IActions) => {
	const [isPending, startTransition] = useTransition()
	const { userId } = useAuth()
	const router = useRouter()

	const handleFollow = () => {
		startTransition(() => {
			onFollow(hostIdentity)
				.then(data =>
					toast.success(`You are now following ${data.following.username}`)
				)
				.catch(() => toast.error('Something went wrong'))
		})
	}

	const handleUnFollow = () => {
		startTransition(() => {
			onUnfollow(hostIdentity)
				.then(data =>
					toast.success(`You are now unfollowing ${data.following.username}`)
				)
				.catch(() => toast.error('Something went wrong'))
		})
	}

	const toggleFollow = () => {
		if (!userId) {
			return router.push('/sign-in')
		}

		if (isHost) return

		if (isFollowing) {
			handleUnFollow()
		} else {
			handleFollow()
		}
	}

	return (
		<Button
			onClick={toggleFollow}
			variant={'primary'}
			size={'sm'}
			disabled={isPending || isHost}
			className={cn(
				'w-full lg:w-auto',
				isFollowing && 'bg-slate-500 hover:bg-slate-500/60 transition-colors'
			)}
		>
			{isFollowing ? 'Unfollow' : 'Follow'}
			<Heart
				className={cn('h-4 w-4 ml-2', isFollowing ? 'fill-white' : 'fill-none')}
			/>
		</Button>
	)
}

export const ActionsSkeleton = () => {
	return <Skeleton className='h-10 w-full lg:w-24' />
}
