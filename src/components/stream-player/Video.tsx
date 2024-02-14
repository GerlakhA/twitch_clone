'use client'

import {
	useConnectionState,
	useRemoteParticipant,
	useTracks,
} from '@livekit/components-react'
import { ConnectionState, Track } from 'livekit-client'
import LiveVideo from './LiveVideo'
import LoaderVideo from './LoaderVideo'
import OfflineVideo from './OfflineVideo'
import { Skeleton } from '../ui/skeleton'

interface IVideo {
	hostName: string
	hostIdentity: string
}

const Video = ({ hostName, hostIdentity }: IVideo) => {
	const connectionState = useConnectionState()
	const participant = useRemoteParticipant(hostIdentity)
	const tracks = useTracks([
		Track.Source.Camera,
		Track.Source.Microphone,
	]).filter(track => track.participant.identity === hostIdentity)

	let content

	if (!participant && connectionState === ConnectionState.Connected) {
		content = <OfflineVideo username={hostName} />
	} else if (!participant || tracks.length === 0) {
		content = <LoaderVideo label={connectionState} />
	} else {
		content = <LiveVideo participant={participant} />
	}

	return <div className='aspect-video border-b group relative'>{content}</div>
}

export default Video

export const VideoSkeleton = () => {
	return (
		<div className='aspect-video border-x border-background'>
			<Skeleton className='h-full w-full rounded-none' />
		</div>
	)
}
