'use client'

import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useParticipants } from '@livekit/components-react'
import { LocalParticipant, RemoteParticipant } from 'livekit-client'
import { useMemo, useState } from 'react'
import { useDebounce } from 'usehooks-ts'
import CommunityItem from './CommunityItem'

interface IChatCommunity {
	viewerName: string
	hostName: string
	isHidden: boolean
}

const ChatCommunity = ({ viewerName, hostName, isHidden }: IChatCommunity) => {
	const [value, setValue] = useState('')

	const participants = useParticipants()

	const deboncedValue = useDebounce<string>(value, 500)

	const filteredParticipants = useMemo(() => {
		const deduped = participants.reduce((acc, participant) => {
			const hostViewer = `host-${participant.identity}`
			if (!acc.some(p => p.identity === hostViewer)) {
				acc.push(participant)
			}
			return acc
		}, [] as (RemoteParticipant | LocalParticipant)[])
		return deduped.filter(participant =>
			participant.name?.toLowerCase().includes(deboncedValue.toLowerCase())
		)
	}, [participants, deboncedValue])

	const onChange = (newValue: string) => {
		setValue(newValue)
	}

	if (isHidden) {
		return (
			<div className='flex flex-1 items-center justify-center'>
				<p className='text-sm text-muted-foreground'>Community is disabled</p>
			</div>
		)
	}

	return (
		<div className='p-4'>
			<Input
				onChange={e => onChange(e.target.value)}
				placeholder='Search community'
				className='border-white/10'
			/>
			<ScrollArea className='gap-y-2 mt-4'>
				<p className='text-sm text-muted-foreground text-enter hidden last:block'>
					No results
				</p>
				{filteredParticipants.map(participant => (
					<CommunityItem
						key={participant.identity}
						viewerName={viewerName}
						hostName={hostName}
						participantName={participant.name}
						participanIdentity={participant.identity}
					/>
				))}
			</ScrollArea>
		</div>
	)
}

export default ChatCommunity
