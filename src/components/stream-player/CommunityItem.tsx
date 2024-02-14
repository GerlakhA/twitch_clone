'use client'

import { onBlock } from '@/actions/block'
import Hint from '@/components/Hint'
import { cn, stringToColor } from '@/lib/utils'
import { MinusCircle } from 'lucide-react'
import { useTransition } from 'react'
import { toast } from 'sonner'
import { Button } from '../ui/button'

interface ICommunityItem {
	viewerName: string
	hostName: string
	participantName?: string
	participanIdentity: string
}

const CommunityItem = ({
	viewerName,
	hostName,
	participantName,
	participanIdentity,
}: ICommunityItem) => {
	const [isPending, startTransition] = useTransition()
	const color = stringToColor(participantName || '')
	const isSelf = participantName === viewerName
	const isHost = viewerName === hostName

	const handleBlock = () => {
		if (!participantName || !isHost || isSelf) return

		startTransition(() => {
			onBlock(participanIdentity)
				.then(() => toast.success(`Blocked ${participantName}`))
				.catch(() => toast.error('Something went wrong!'))
		})
	}
	return (
		<div
			className={cn(
				'flex group items-center justify-between w-full p-2 rounded-md text-sm hover:bg-white/5',
				isPending && 'opacity-50 pointer-events-none'
			)}
		>
			<p style={{ color: color }}>{participantName}</p>
			{isHost && !isSelf && (
				<Hint label='Block'>
					<Button
						onClick={handleBlock}
						disabled={isPending}
						variant={'ghost'}
						className='w-auto h-auto p-1 opacity-0 group-hover:opacity-100 transition'
					>
						<MinusCircle className='h-4 w-4 text-muted-foreground' />
					</Button>
				</Hint>
			)}
		</div>
	)
}

export default CommunityItem
