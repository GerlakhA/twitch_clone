'use client'

import { ChatVariant, useChatSidebar } from '@/store/use-chat-sidebar'
import {
	useChat,
	useConnectionState,
	useRemoteParticipant,
} from '@livekit/components-react'
import { ConnectionState } from 'livekit-client'
import { useEffect, useMemo, useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'
import ChatCommunity from './ChatCommunity'
import ChatForm, { ChatFormSkeleton } from './ChatForm'
import ChatHeader, { ChatHeaderSkeleton } from './ChatHeader'
import ChatList, { ChatListSkeleton } from './ChatList'

interface IChat {
	viewerName: string
	hostName: string
	hostIdentity: string
	isFollowing: boolean
	isChatEnabled: boolean
	isChatDelayed: boolean
	isChatFollowersOnly: boolean
}

const Chat = ({
	viewerName,
	hostIdentity,
	hostName,
	isFollowing,
	isChatDelayed,
	isChatEnabled,
	isChatFollowersOnly,
}: IChat) => {
	const [value, setValue] = useState('')
	const matches = useMediaQuery('(max-width: 1024px)')
	const { variant, onExpand } = useChatSidebar(state => state)
	const connectionState = useConnectionState()
	const participant = useRemoteParticipant(hostIdentity)

	const isOnline = participant && connectionState === ConnectionState.Connected

	const isHidden = !isChatEnabled || !isOnline

	const { chatMessages: messages, send } = useChat()

	useEffect(() => {
		if (matches) {
			onExpand()
		}
	}, [matches, onExpand])

	const reversedMessages = useMemo(() => {
		return messages.sort((a, b) => b.timestamp - a.timestamp)
	}, [messages])

	const onSubmit = () => {
		if (!send) return
		send(value)
		setValue('')
	}

	const onChange = (value: string) => {
		setValue(value)
	}

	return (
		<div className='flex flex-col bg-background border-l border-b pt-0 h-[calc(100vh-80px)]'>
			<ChatHeader />
			{variant === ChatVariant.CHAT && (
				<>
					<ChatList messages={reversedMessages} isHidden={isHidden} />
					<ChatForm
						isFollowing={isFollowing}
						onSubmit={onSubmit}
						value={value}
						isChatDelayed={isChatDelayed}
						isChatFollowersOnly={isChatFollowersOnly}
						onChange={onChange}
						isHidden={isHidden}
					/>
				</>
			)}
			{variant === ChatVariant.COMMUNITY && (
				<>
					<ChatCommunity
						viewerName={viewerName}
						hostName={hostName}
						isHidden={isHidden}
					/>
				</>
			)}
		</div>
	)
}

export default Chat

export const ChatSkeleton = () => {
	return (
		<div className='flex flex-col border-l border-b pt-0 h-[calc(100vh-80px)] border-2'>
			<ChatHeaderSkeleton />
			<ChatListSkeleton />
			<ChatFormSkeleton />
		</div>
	)
}
