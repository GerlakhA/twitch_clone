'use client'

import { onBlock, onUnblock } from '@/actions/block'
import { onFollow, onUnfollow } from '@/actions/follow'
import { Button } from '@/components/ui/button'
import { FC, useTransition } from 'react'
import { toast } from 'sonner'

interface IActions {
	isFollowing: boolean
	isBlocked: boolean
	userId: string
}

const Actions: FC<IActions> = ({ isFollowing, userId, isBlocked }) => {
	const [isPending, startTransition] = useTransition()

	const handleOnFollow = () => {
		startTransition(() => {
			onFollow(userId)
				.then(data =>
					toast.success(`You are now following ${data.following.username}`)
				)
				.catch(() => toast.error('Something went wrong'))
		})
	}

	const handleOnUnFollow = () => {
		startTransition(() => {
			onUnfollow(userId)
				.then(data =>
					toast.success(`You are now unfollowing ${data.following.username}`)
				)
				.catch(() => toast.error('Something went wrong'))
		})
	}

	const onClick = () => {
		if (isFollowing) {
			handleOnUnFollow()
		} else {
			handleOnFollow()
		}
	}

	const handleOnBlock = () => {
		startTransition(() => {
			onBlock(userId)
				.then(data =>
					toast.success(`You are now blocking ${data.blocked.username}`)
				)
				.catch(() => toast.error('Something went wrong'))
		})
	}

	const handleOnUnblock = () => {
		startTransition(() => {
			onUnblock(userId)
				.then(data =>
					toast.success(`You are now unblocking ${data.blocked.username}`)
				)
				.catch(() => toast.error('Something went wrong'))
		})
	}

	const onClickBlock = () => {
		if (isBlocked) {
			handleOnUnblock()
		} else {
			handleOnBlock()
		}
	}

	return (
		<>
			<Button disabled={isPending} onClick={onClick} variant={'primary'}>
				{isFollowing ? 'unFollow' : 'Follow'}
			</Button>
			<Button disabled={isPending} onClick={onClickBlock} variant={'default'}>
				{isBlocked ? 'unBlock' : 'Block'}
			</Button>
		</>
	)
}

export default Actions
